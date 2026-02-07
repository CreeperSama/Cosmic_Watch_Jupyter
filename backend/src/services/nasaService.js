// const axios = require("axios");
// const { calculateRisk } = require("./riskService"); 

// // Accept optional parameters for start/end date
// exports.fetchAsteroids = async (startDate, endDate) => {
//   try {
//     const apiKey = process.env.NASA_API_KEY || "DEMO_KEY";
    
//     // Default to today if no date provided
//     const today = new Date().toISOString().split('T')[0];
//     const start = startDate || today;
//     const end = endDate || start;

//     console.log(`📡 Fetching NASA data from ${start} to ${end}`);

//     const res = await axios.get('https://api.nasa.gov/neo/rest/v1/feed', {
//       params: {
//         start_date: start,
//         end_date: end,
//         api_key: apiKey
//       }
//     });

//     const data = res.data.near_earth_objects || {};
//     const cleaned = [];

//     Object.values(data).forEach((day) => {
//       day.forEach((ast) => {
//         const diameterMeters = ast.estimated_diameter?.meters?.estimated_diameter_max || 0;
//         const velocityKph = parseFloat(ast.close_approach_data?.[0]?.relative_velocity?.kilometers_per_hour) || 0;
//         const distanceKm = parseFloat(ast.close_approach_data?.[0]?.miss_distance?.kilometers) || 0;

//         cleaned.push({
//           id: ast.id,
//           name: ast.name,
//           hazardous: ast.is_potentially_hazardous_asteroid,
//           diameter: diameterMeters, 
//           velocity: velocityKph,    
//           distance: distanceKm,
//           riskLevel: calculateRisk(diameterMeters, velocityKph, distanceKm)
//         });
//       });
//     });

//     return cleaned;
//   } catch (err) {
//     console.error("❌ NASA API Error:", err.message);
//     throw new Error("Failed to retrieve asteroid data");
//   }
// };

const axios = require("axios");
const Asteroid = require("../models/Asteroid"); // Import our new model
const { calculateRisk } = require("./riskService"); 

exports.fetchAsteroids = async (startDate, endDate) => {
  try {
    const apiKey = process.env.NASA_API_KEY || "DEMO_KEY";
    const today = new Date().toISOString().split('T')[0];
    const start = startDate || today;
    const end = endDate || start;

    console.log(`🔎 Checking Local Cache for ${start} to ${end}...`);

    // 1. CACHE CHECK: Try to find data in MongoDB first
    const cachedData = await Asteroid.find({
      date: { $gte: start, $lte: end }
    });

    if (cachedData.length > 0) {
      console.log(`⚡ Cache Hit! Serving ${cachedData.length} asteroids from Database.`);
      return cachedData;
    }

    // 2. CACHE MISS: Fetch from NASA
    console.log(`📡 Cache Miss. Fetching live from NASA...`);
    const res = await axios.get('https://api.nasa.gov/neo/rest/v1/feed', {
      params: {
        start_date: start,
        end_date: end,
        api_key: apiKey
      }
    });

    const rawData = res.data.near_earth_objects || {};
    const asteroidsToSave = [];

    // 3. Process Data
    Object.entries(rawData).forEach(([dateKey, asteroids]) => {
      asteroids.forEach((ast) => {
        const diameterMeters = ast.estimated_diameter?.meters?.estimated_diameter_max || 0;
        const velocityKph = parseFloat(ast.close_approach_data?.[0]?.relative_velocity?.kilometers_per_hour) || 0;
        const distanceKm = parseFloat(ast.close_approach_data?.[0]?.miss_distance?.kilometers) || 0;

        asteroidsToSave.push({
          id: ast.id,
          name: ast.name,
          date: dateKey, // Important: Save the specific date
          hazardous: ast.is_potentially_hazardous_asteroid,
          diameter: diameterMeters,
          velocity: velocityKph,
          distance: distanceKm,
          riskLevel: calculateRisk(diameterMeters, velocityKph, distanceKm)
        });
      });
    });

    // 4. Save to Database (Bulk Insert)
    if (asteroidsToSave.length > 0) {
      try {
        // ordered: false prevents the batch from stopping if one duplicate ID exists
        await Asteroid.insertMany(asteroidsToSave, { ordered: false });
        console.log(`💾 Cached ${asteroidsToSave.length} new asteroids to Database.`);
      } catch (insertError) {
        // Ignore duplicate key errors (code 11000), log others
        if (insertError.code !== 11000) {
          console.error("Cache save warning:", insertError.message);
        }
      }
    }

    return asteroidsToSave;

  } catch (err) {
    console.error("❌ Data Service Error:", err.message);
    // Fallback: If DB has *some* data, return that instead of crashing
    // (Optional advanced logic, for now we just throw)
    throw new Error("Failed to retrieve asteroid data");
  }
};