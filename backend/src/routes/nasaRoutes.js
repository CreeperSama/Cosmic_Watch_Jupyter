const router = require("express").Router();
const { getAsteroids } = require("../controllers/nasaController");

router.get("/asteroids", getAsteroids);

module.exports = router;
