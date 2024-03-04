const e = require("express");
const catchAsync = require("../utils/catch.async");

exports.getAllVolunteerPersons = catchAsync(async (req, res, next) => {
  res.status(200).json({
    status: "success",
    message: "This route is not yet defined!",
  });
});

exports.getVolunteerPersonById = catchAsync(async (req, res, next) => {
  res.status(200).json({
    status: "success",
    message: "This route is not yet defined!",
  });
});

exports.createVolunteerPerson = catchAsync(async (req, res, next) => {
  res.status(200).json({
    status: "success",
    message: "This route is not yet defined!",
  });
});

exports.updateVolunteerPerson = catchAsync(async (req, res, next) => {
  res.status(200).json({
    status: "success",
    message: "This route is not yet defined!",
  });
});

exports.deleteVolunteerPerson = catchAsync(async (req, res, next) => {
  res.status(200).json({
    status: "success",
    message: "This route is not yet defined!",
  });
});
