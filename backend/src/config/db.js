const mongoose = require("mongoose");

const delay = (ms) => new Promise((res) => setTimeout(res, ms));

const connectDB = async (retries = 10, waitMs = 3000) => {
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      await mongoose.connect(process.env.MONGO_URI);
      console.log("Mongo Connected");
      return;
    } catch (err) {
      console.error(`Mongo connect attempt ${attempt} failed: ${err.message}`);
      if (attempt === retries) {
        console.error("Exceeded max Mongo connect attempts. Exiting.");
        process.exit(1);
      }
      console.log(`Retrying in ${waitMs}ms...`);
      await delay(waitMs);
    }
  }
};

module.exports = connectDB;
