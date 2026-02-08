const cron = require('node-cron');
const Asteroid = require('../models/Asteroid');
const Notification = require('../models/Notification');

const initAlertSystem = () => {
  console.log("🛡️  Orbital Guard System: ONLINE");

  // Run every 30 seconds for the demo
  cron.schedule('*/30 * * * * *', async () => {
    try {
      // Find hazardous asteroids stored in DB
      const dangers = await Asteroid.find({ hazardous: true });

      for (const ast of dangers) {
        // Check if we already alerted for this asteroid today
        const exists = await Notification.findOne({ 
          title: `CRITICAL: ${ast.name}`,
          timestamp: { $gte: new Date(new Date().setHours(0,0,0,0)) }
        });

        if (!exists) {
          await Notification.create({
            title: `CRITICAL: ${ast.name}`,
            message: `Hazardous Approach! Dist: ${(ast.distance/1000).toFixed(0)}k km`,
            type: 'critical'
          });
          console.log(`🚨 Generated Alert for ${ast.name}`);
        }
      }
    } catch (err) {
      console.error("Alert Error:", err.message);
    }
  });
};

module.exports = initAlertSystem;