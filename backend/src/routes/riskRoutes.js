const router = require("express").Router();
const { getRisk } = require("../controllers/riskController");

router.get("/", getRisk);

module.exports = router;
