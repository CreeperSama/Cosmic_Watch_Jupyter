const Watchlist = require("../models/Watchlist");

exports.getWatchlist = async (req, res) => {
  const list = await Watchlist.find({ userId: req.user.id });
  res.json(list);
};

exports.addToWatchlist = async (req, res) => {
  const { asteroidId, name, risk } = req.body;

  const item = await Watchlist.create({
    userId: req.user.id,
    asteroidId,
    name,
    risk,
  });

  res.json(item);
};
