const axios = require("axios");

exports.fetchAsteroids = async () => {
  const res = await axios.get(
    `https://api.nasa.gov/neo/rest/v1/feed?api_key=${process.env.NASA_KEY}`
  );

  const data = res.data.near_earth_objects;
  const cleaned = [];

  Object.values(data).forEach(day => {
    day.forEach(ast => {
      cleaned.push({
        id: ast.id,
        name: ast.name,
        hazardous: ast.is_potentially_hazardous_asteroid,
        diameter: ast.estimated_diameter.meters.estimated_diameter_max,
        velocity: ast.close_approach_data[0]?.relative_velocity.kilometers_per_hour,
        distance: ast.close_approach_data[0]?.miss_distance.kilometers
      });
    });
  });

  return cleaned;
};
