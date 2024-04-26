const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const VideoGame = require("./models/VideoGame.js");
const app = express();
dotenv.config();

mongoose.connect(process.env.MONGODB_URI);
app.use(express.urlencoded({ extended: false }));

mongoose.connection.on("connected", () => {
  console.log(`Connected to MongoDB ${mongoose.connection.name}.`);
});

app.get("/", async (req, res) => {
  const games = await VideoGame.find({});
  res.render("index.ejs", {games});
});
app.get("/games", async (req, res) => {
  const games = await VideoGame.find();
  res.render("index.ejs", { game });
});
app.get("/games/new", (req, res) => {
  res.render("./games/new.ejs");
});
app.get("/games/show", (req, res) => {
  res.render("./games/show.ejs");
});

app.post("/games", async (req, res) => {
  const { studio, title, genre, year } = req.body;
  const newGame = new VideoGame({ studio, title, genre, year });
  await newGame.save();
  res.redirect("/games");
});

app.get("/games/:id", async (req, res) => {
  const game = await VideoGame.findById(req.params.id);
  res.render("games/show.ejs", { games });
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
