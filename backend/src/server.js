// require("dotenv").config();
// const express = require("express");
// const cors = require("cors");
// const connectDB = require("./config/db");

// const app = express();
// app.use(cors());
// app.use(express.json());

// connectDB();

// app.get("/", (req, res) => res.send("Cosmic Watch Backend Running"));

// app.use("/auth", require("./routes/authRoutes"));
// app.use("/nasa", require("./routes/nasaRoutes"));
// app.use("/risk", require("./routes/riskRoutes"));
// app.use("/watchlist", require("./routes/watchlistRoutes"));

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`Server running on ${PORT}`));

require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const app = express();

// 1. Allow connections from Frontend Container & Localhost
app.use(cors({
  origin: ["http://localhost:5173", "http://127.0.0.1:5173"],
  credentials: true
}));

app.use(express.json());

// 2. Connect Database
connectDB();

app.get("/", (req, res) => res.send("Cosmic Watch Backend Operational"));

// 3. Routes
app.use("/auth", require("./routes/authRoutes"));
app.use("/nasa", require("./routes/nasaRoutes"));
app.use("/risk", require("./routes/riskRoutes"));
app.use("/watchlist", require("./routes/watchlistRoutes")); // Fixed typo here

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on ${PORT}`));