require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const app = express();
connectDB();

app.use(cors());
app.use(express.json());

app.use("/auth", require("./routes/authRoutes"));
app.use("/nasa", require("./routes/nasaRoutes"));
app.use("/risk", require("./routes/riskRoutes"));
app.use("/watchlist", require("./routes/watchlistRoutes"));

app.get("/", (req, res) => res.send("Cosmic Watch Backend Running"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on ${PORT}`));
