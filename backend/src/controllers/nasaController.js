const { fetchAsteroids } = require("../services/nasaService");

exports.getAsteroids = async (req, res) => {
  try {
    // Extract start_date and end_date from the frontend request
    const { start_date, end_date } = req.query;
    
    // Pass them to the service
    const data = await fetchAsteroids(start_date, end_date);
    res.json(data);
  } catch (err) {
    res.status(502).json({ msg: "Failed to fetch asteroids", error: err.message });
  }
};