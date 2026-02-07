const router = require("express").Router();
const auth = require("../middleware/authMIddleware");
const {
  getWatchlist,
  addToWatchlist,
} = require("../controllers/watchlistController");

router.get("/", auth, getWatchlist);
router.post("/add", auth, addToWatchlist);

module.exports = router;
