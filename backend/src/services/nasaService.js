const axios = require("axios");
const Asteroid = require("../models/Asteroid");
const { calculateRisk } = require("./riskService"); 

// --- FALLBACK MOCK DATA (For when NASA API limits are hit) ---
const MOCK_DATA = [
  { id: "3542519", name: "(2010 PK9)", diameter: 260, velocity: 45000, distance: 7000000, hazardous: true, date: new Date().toISOString().split('T')[0] },
  { id: "2000433", name: "433 Eros", diameter: 16840, velocity: 22000, distance: 26000000, hazardous: false, date: new Date().toISOString().split('T')[0] },
  { id: "3729835", name: "(2015 KJ19)", diameter: 200, velocity: 89000, distance: 500000, hazardous: true, date: new Date().toISOString().split('T')[0] },
  { id: "54017201", name: "(2021 GT3)", diameter: 45, velocity: 33000, distance: 120000, hazardous: false, date: new Date().toISOString().split('T')[0] },
  { id: "2441987", name: "441987 (2010 NY65)", diameter: 220, velocity: 46000, distance: 3000000, hazardous: true, date: new Date().toISOString().split('T')[0] },
];

exports.fetchAsteroids = async (startDate, endDate) => {
  try {
    const apiKey = process.env.NASA_API_KEY || "DEMO_KEY";
    const today = new Date().toISOString().split('T')[0];
    const start = startDate || today;
    const end = endDate || start;

    console.log(`🔎 Checking Local Cache for ${start} to ${end}...`);

    // 1. CACHE CHECK
    const cachedData = await Asteroid.find({
      date: { $gte: start, $lte: end }
    });

    if (cachedData.length > 0) {
      console.log(`⚡ Cache Hit! Serving ${cachedData.length} asteroids.`);
      return cachedData;
    }

    // 2. FETCH FROM NASA
    console.log(`📡 Cache Miss. Fetching live from NASA...`);
    const res = await axios.get('https://api.nasa.gov/neo/rest/v1/feed', {
      params: { start_date: start, end_date: end, api_key: apiKey }
    });

    const rawData = res.data.near_earth_objects || {};
    const asteroidsToSave = [];

    Object.entries(rawData).forEach(([dateKey, asteroids]) => {
      asteroids.forEach((ast) => {
        const diameterMeters = ast.estimated_diameter?.meters?.estimated_diameter_max || 0;
        const velocityKph = parseFloat(ast.close_approach_data?.[0]?.relative_velocity?.kilometers_per_hour) || 0;
        const distanceKm = parseFloat(ast.close_approach_data?.[0]?.miss_distance?.kilometers) || 0;

        asteroidsToSave.push({
          id: ast.id,
          name: ast.name,
          date: dateKey,
          hazardous: ast.is_potentially_hazardous_asteroid,
          diameter: diameterMeters,
          velocity: velocityKph,
          distance: distanceKm,
          riskLevel: calculateRisk(diameterMeters, velocityKph, distanceKm)
        });
      });
    });

    if (asteroidsToSave.length > 0) {
      await Asteroid.insertMany(asteroidsToSave, { ordered: false }).catch(() => {}); // Ignore dupes
      console.log(`💾 Cached ${asteroidsToSave.length} items.`);
    }

    return asteroidsToSave;

  } catch (err) {
    // --- 3. FAILSAFE MODE ---
    if (err.response && err.response.status === 429) {
      console.warn("⚠️ NASA RATE LIMIT REACHED. SWITCHING TO SIMULATION MODE.");
      
      // Enhance mock data with Risk Calculation
      return MOCK_DATA.map(m => ({
        ...m,
        riskLevel: calculateRisk(m.diameter, m.velocity, m.distance)
      }));
    }
    
    console.error("❌ NASA Service Error:", err.message);
    throw err;
  }
};