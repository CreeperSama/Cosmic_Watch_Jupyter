exports.calculateRisk = ({ diameter, velocity, distance }) => {
  if (diameter > 1000 || distance < 500000) return "Critical";
  if (diameter > 500 || distance < 1000000) return "High";
  if (diameter > 200) return "Medium";
  return "Low";
};
