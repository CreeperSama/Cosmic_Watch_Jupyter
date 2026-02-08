// const mongoose = require("mongoose");

// const WatchlistSchema = new mongoose.Schema({
//   userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
//   asteroidId: String,
//   name: String,
//   risk: String,
// });

// module.exports = mongoose.model("Watchlist", WatchlistSchema);

const mongoose = require('mongoose');

const WatchlistSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  asteroidId: {
    type: String,
    required: true
  },
  name: String,
  hazardous: Boolean,
  date: Date,
  diameter: Number,       // Cached data for quick access
  velocity: Number,
  distance: Number,
  savedAt: {
    type: Date,
    default: Date.now
  }
});

// Prevent duplicate saves: A user can't save the same asteroid twice
WatchlistSchema.index({ user: 1, asteroidId: 1 }, { unique: true });

module.exports = mongoose.model('Watchlist', WatchlistSchema);