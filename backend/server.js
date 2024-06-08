import express from "express";
import mongoose from "mongoose";
import crypto from 'crypto';
import jwt from 'jsonwebtoken';
import { PASSWORD, USERNAME, CLUSTER, ACCESS_TOKEN } from "./sensitiveData.js";
import User from "./model/User.js";
mongoose.connect(
  `mongodb+srv://${USERNAME}:${PASSWORD}@${CLUSTER}.mongodb.net/freestyleMERN`
);
const baseUrl = "https://api.themoviedb.org/3/movie";
const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${ACCESS_TOKEN}`,
  },
};

//secret key for jwt
/* const secretKey = crypto.randomBytes(32).toString('hex'); */
const secretKey = "mysecretkey";
console.log('Secret Key:', secretKey);

// jwt token for authentication
const generateToken = ({ _id, username }) => {

  return jwt.sign({ userId: _id, username }, secretKey, { expiresIn: '1h' });
};

//verification middleware
const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: 'No token provided' });
  }

  const token = authHeader.split(' ')[1];

  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Invalid token' });
    }

    req.user = decoded;
    next();
  });
};

//middleware for validating the user
const validateUser = async (req, res, next) => {
  const { userId } = req.params;
  const user = req.user;

  if (user.userId === userId) {
    try {
      const userData = await User.findById(userId);
      if (!userData) {
        return res.status(404).json({ message: 'User not found' });
      }
      req.userData = userData;
      next();
    } catch (error) {
      return res.status(500).json({ message: 'Server error', error });
    }
  } else {
    return res.status(401).json({ message: 'Unauthorized' });
  }
};


const app = express();
const PORT = 6969;
app.use(express.json());

// query parameters
app.get("/api/movies/popular", (req, res) => {
  const url = `${baseUrl}/popular?language=en-US&page=1`;

  fetch(url, options)
    .then((res) => res.json())
    .then((json) => res.json(json))
    .catch((err) => {
      console.log(err),
        res.status(506).json({ message: "Something went wrong" });
    });
});

app.get("/api/movies/nowplaying", (req, res) => {
  const url = `${baseUrl}/now_playing?language=en-US&page=1`;

  fetch(url, options)
    .then((res) => res.json())
    .then((json) => res.json(json))
    .catch((err) => {
      console.log(err),
        res.status(506).json({ message: "Something went wrong" });
    });
});

//todo /api/movies/:movieId/trailer/
app.get("/api/trailer/:id", (req, res) => {
  const ID = req.params.id;
  const url = `${baseUrl}/${ID}/videos?language=en-US';`;

  fetch(url, options)
    .then((res) => res.json())
    .then((json) => res.json(json))
    .catch((err) => {
      console.log(err),
        res.status(506).json({ message: "Something went wrong" });
    });
});

app.get("/api/movie/:id", (req, res, next) => {
  const ID = req.params.id;
  const url = `${baseUrl}/${ID}`;

  fetch(url, options)
    .then((res) => res.json())
    .then((json) => res.json(json))
    .catch((err) => {
      console.log(err),
        res.status(506).json({ message: "Something went wrong" });
    });
});

//Todo 1 endpoint for these!
app.get("/api/searchmovie/:search", async (req, res) => {
  try {
    const search = encodeURIComponent(req.params.search);
    console.log(search);
    const url = `https://api.themoviedb.org/3/search/movie?query=${search}&include_adult=true&language=en-US&page=1`;

    fetch(url, options)
      .then((res) => res.json())
      .then((json) => {
        res.json(json), console.log(json);
      })
      .catch((err) => console.log(err));
  } catch (err) {
    res.status(506).json({ message: "Something went wrong" });
  }
});

app.listen(PORT, () => {
  console.log(`The server is running on port: ${PORT}`);
});


//--------------------------------AUTHORISATION -------------------------------
app.post("/api/login", async (req, res) => {

  //if the user doesn't have email we should ask him to register!
  try {
    const { email, password } = req.body;
    console.log("credentials", email, password)

    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ message: "Invalid Credentials", errors: { message: "Either the password or the email is incorrect!!!" } });
    }

    //generating that fancy JWT token
    const token = generateToken(user);
    console.log(token);
    const { _id: userId, username } = user;

    res.json({ token: token, user: { userId, username } });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Oopsie daisy, tiny server problemo" });
  }
})

app.post("/api/register", async (req, res) => {
  const { username, email, password, displayName } = req.body;

  console.log(username, email, password)

  try {
    let user = await User.findOne({
      $or: [
        { email: email },
        { username: username }
      ]
    });
    if (user) {
      const errors = user.email === email ? { email: "Email is already registered" } : { username: "Username is taken :/" };
      //maybe we can send back usernames that are available!!
      return res.status(400).json({ message: `Hol' up buddy ${Object.values(errors)[0]}`, errors: errors });
    }

    user = new User({
      username, email, password, displayName
    });

    await user.save();
    const { _id: userId } = user;
    const token = generateToken(user);

    res.status(201).json({ token: token, user: { userId, username } });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Oopsie daisy, tiny server problemo" });
  }
});



//sending the profile data
app.get('/api/user/:userId', verifyToken, validateUser, async (req, res) => {
  const userData = req.userData;
  const { _id, username, email, displayName } = userData;
  res.json({ user: { userId: _id, username, email, displayName } })
});

app.post('/api/user/:userId/change-password', verifyToken, validateUser, async (req, res) => {

  const userData = req.userData;

  const { currentPassword, newPassword } = req.body;
  const correctPassword = await userData.comparePassword(currentPassword);

  if (!correctPassword) {
    return res.status(401).json({ message: "Invalid Credentials", errors: { message: "The given password is incorrect" } });
  }

  userData.password = newPassword;
  await userData.save();
  res.json({ message: "Password changed successfully" });
})


app.get("/api/protected/userData", verifyToken, (req, res) => {
  console.log(req.user)
  res.json({ message: "Hello there user!" });
})