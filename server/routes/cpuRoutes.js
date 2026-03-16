const express = require("express");
const router = express.Router();
const { getCpuStats } = require("../controllers/cpuController");

router.get("/cpu", getCpuStats);

module.exports = router;