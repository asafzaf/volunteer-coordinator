const e = require("express");
const catchAsync = require("../utils/catch.async");
const locationRepository = require("../repositories/location.repository");

exports.getAllLocations = catchAsync(async (req, res, next) => {
  const locations = await locationRepository.find();
  res.status(200).send(locations);
});
