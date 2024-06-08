import mongoose  from "mongoose";

//here we could have the movie link inside that we get from TMDB
const MovieSchema = new mongoose.Schema({
  title: { type: String, required: true },
  genre: { type: String, required: true },
  releaseDate: { type: Date, required: true }
});

module.exports = mongoose.model('Movie', MovieSchema);