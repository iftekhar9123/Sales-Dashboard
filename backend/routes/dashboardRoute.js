const express = require("express");
const router = express.Router();
const dashboardController = require("../Controllers/dashboardController.js");


// Route to get all states
router.get("/states", dashboardController.getAllStates);

// Route to get min & max dates for selected state
router.get("/date-range", dashboardController.getMinMaxDates);

// Route to get dashboard statistics
router.get("/statistics", dashboardController.getDashboardStatistics);

// Route to get chart data (city, product, category, sub-category, segment)
router.get("/chart-data", dashboardController.getChartData);

module.exports = router;