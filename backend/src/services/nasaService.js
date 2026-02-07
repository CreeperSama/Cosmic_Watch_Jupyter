const axios = require("axios");

exports.fetchAsteroids = async () => {
  try {
    const apiKey = process.env.NASA_API_KEY || process.env.NASA_KEY || "DEMO_KEY";
    const res = await axios.get(
      `https://api.nasa.gov/neo/rest/v1/feed?api_key=${apiKey}`
    );

    const data = res.data.near_earth_objects || {};
    const cleaned = [];

    Object.values(data).forEach((day) => {
      day.forEach((ast) => {
        cleaned.push({
          id: ast.id,
          name: ast.name,
          hazardous: ast.is_potentially_hazardous_asteroid,
          diameter: ast.estimated_diameter?.meters?.estimated_diameter_max || null,
          velocity: Number(ast.close_approach_data?.[0]?.relative_velocity?.kilometers_per_hour) || null,
          distance: Number(ast.close_approach_data?.[0]?.miss_distance?.kilometers) || null,
        });
      });
    });

    return cleaned;
  } catch (err) {
    console.error("Error fetching asteroids:", err.message || err);
    throw err;
  }
};
