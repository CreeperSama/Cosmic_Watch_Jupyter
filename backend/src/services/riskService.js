exports.calculateRisk = (size, velocity, distance) => {
  const score = size * 0.4 + velocity * 0.3 + (1 / distance) * 0.3;

  if (score < 2) return "Low";
  if (score < 4) return "Medium";
  if (score < 6) return "High";
  return "Critical";
};
