const axios = require("axios");
const { calculateRisk } = require("./riskService"); 

// Accept optional parameters for start/end date
exports.fetchAsteroids = async (startDate, endDate) => {
  try {
    const apiKey = process.env.NASA_API_KEY || "DEMO_KEY";
    
    // Default to today if no date provided
    const today = new Date().toISOString().split('T')[0];
    const start = startDate || today;
    const end = endDate || start;

    console.log(`📡 Fetching NASA data from ${start} to ${end}`);

    const res = await axios.get('https://api.nasa.gov/neo/rest/v1/feed', {
      params: {
        start_date: start,
        end_date: end,
        api_key: apiKey
      }
    });

    const data = res.data.near_earth_objects || {};
    const cleaned = [];

    Object.values(data).forEach((day) => {
      day.forEach((ast) => {
        const diameterMeters = ast.estimated_diameter?.meters?.estimated_diameter_max || 0;
        const velocityKph = parseFloat(ast.close_approach_data?.[0]?.relative_velocity?.kilometers_per_hour) || 0;
        const distanceKm = parseFloat(ast.close_approach_data?.[0]?.miss_distance?.kilometers) || 0;

        cleaned.push({
          id: ast.id,
          name: ast.name,
          hazardous: ast.is_potentially_hazardous_asteroid,
          diameter: diameterMeters, 
          velocity: velocityKph,    
          distance: distanceKm,
          riskLevel: calculateRisk(diameterMeters, velocityKph, distanceKm)
        });
      });
    });

    return cleaned;
  } catch (err) {
    console.error("❌ NASA API Error:", err.message);
    throw new Error("Failed to retrieve asteroid data");
  }
};