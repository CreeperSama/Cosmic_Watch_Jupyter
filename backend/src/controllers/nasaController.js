const { fetchAsteroids } = require("../services/nasaService");

exports.getAsteroids = async (req, res) => {
  try {
    const data = await fetchAsteroids();
    res.json(data);
  } catch (err) {
    res.status(502).json({ msg: "Failed to fetch asteroids", error: err.message });
  }
};
