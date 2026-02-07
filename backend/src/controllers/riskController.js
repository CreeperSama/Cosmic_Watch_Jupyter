const { calculateRisk } = require("../services/riskService");

exports.getRisk = (req, res) => {
  const { size, velocity, distance } = req.query;
  const risk = calculateRisk(size, velocity, distance);
  res.json({ risk });
};
