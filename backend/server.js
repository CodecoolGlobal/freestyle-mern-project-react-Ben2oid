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
const secretKey = crypto.randomBytes(32).toString('hex');
console.log('Secret Key:', secretKey);

// jwt token for authentication
const generateToken = (user) => {
  return jwt.sign({ userId: user._id, username: user.username }, secretKey, { expiresIn: '1h' });
};

const app = express();
const PORT = 6969;
app.use(express.json());

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
