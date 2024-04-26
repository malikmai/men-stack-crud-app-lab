const mongoose = require('mongoose');

const videoGameSchema = new mongoose.Schema({
  studio: { type: String, required: true },
  title: { type: String, required: true },
  genre: String,
  year: Number
});

const VideoGame = mongoose.model('VideoGame', videoGameSchema);
module.exports = VideoGame;
