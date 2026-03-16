const express = require("express");
const router = express.Router();
const { getRamStats } = require("../controllers/ramController");

router.get("/ram", getRamStats);

module.exports = router;
