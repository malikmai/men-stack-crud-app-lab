const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const mongoose = require("mongoose");
const app = express();
const VideoGame = require("./models/VideoGame.js");

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
  const allGames = await VideoGame.find();
  console.log(allGames);
  res.render("index.ejs", {games: allGames });
});

app.get("/games/new", (req, res) => {
  res.render("./games/new.ejs");
});

app.get("/games/:gameId", async (req, res) => {
  try {
    const foundGame = await VideoGame.findById(req.params.gameId);
    if (!foundGame) {
      console.log("Game not found");
      return res.status(404).send("Game not found");
    }
    console.log("Found game:", foundGame);
    res.render("games/show.ejs", { game: foundGame });
  } catch (error) {
    console.error("Error fetching game:", error);
    res.status(500).send("Error fetching game");
  }
});

app.post("/games", async (req, res) => {
  const { studio, title, genre, year } = req.body;
  const newGame = new VideoGame({ studio, title, genre, year });
  await newGame.save();
  res.redirect("/games");
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
