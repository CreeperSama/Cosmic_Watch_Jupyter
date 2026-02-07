const mongoose = require("mongoose");

const WatchlistSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  asteroidId: String,
  name: String,
  risk: String,
});

module.exports = mongoose.model("Watchlist", WatchlistSchema);
