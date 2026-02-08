// const router = require("express").Router();
// const auth = require("../middleware/authMIddleware");
// const {
//   getWatchlist,
//   addToWatchlist,
// } = require("../controllers/watchlistController");

// router.get("/", auth, getWatchlist);
// router.post("/add", auth, addToWatchlist);

// module.exports = router;

const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMIddleware');
const Watchlist = require('../models/Watchlist');

// @route   POST /watchlist/add
// @desc    Add asteroid to user's favorites
// @access  Private
router.post('/add', auth, async (req, res) => {
  const { asteroidId, name, hazardous, date, diameter, velocity, distance } = req.body;

  try {
    // Check if already saved
    let item = await Watchlist.findOne({ user: req.user.id, asteroidId });
    if (item) {
      return res.status(400).json({ msg: 'Asteroid already in watchlist' });
    }

    item = new Watchlist({
      user: req.user.id,
      asteroidId,
      name,
      hazardous,
      date,
      diameter,
      velocity,
      distance
    });

    await item.save();
    res.json(item);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   DELETE /watchlist/:id
// @desc    Remove asteroid from favorites
// @access  Private
router.delete('/:id', auth, async (req, res) => {
  try {
    const item = await Watchlist.findOne({ asteroidId: req.params.id, user: req.user.id });

    if (!item) {
      return res.status(404).json({ msg: 'Asteroid not found in watchlist' });
    }

    await Watchlist.deleteOne({ _id: item._id });
    res.json({ msg: 'Asteroid removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET /watchlist
// @desc    Get all saved asteroids for the logged-in user
// @access  Private
router.get('/', auth, async (req, res) => {
  try {
    const items = await Watchlist.find({ user: req.user.id }).sort({ savedAt: -1 });
    res.json(items);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;