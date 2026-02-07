const mongoose = require('mongoose');

const AsteroidSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true }, // NASA ID
  name: { type: String, required: true },
  date: { type: String, required: true, index: true }, // YYYY-MM-DD
  hazardous: { type: Boolean, default: false },
  diameter: Number,       // Meters
  velocity: Number,       // KPH
  distance: Number,       // Kilometers from Earth
  riskLevel: { type: String, enum: ['Low', 'Medium', 'High', 'Critical'], default: 'Low' }
}, { timestamps: true });

module.exports = mongoose.model('Asteroid', AsteroidSchema);