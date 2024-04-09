const express = require("express");
const locationController = require("../controllers/location.controller");

const router = express.Router();

router.route("/").get(locationController.getAllLocations);

module.exports = router;
