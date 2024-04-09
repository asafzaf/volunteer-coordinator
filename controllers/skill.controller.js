const e = require("express");
const catchAsync = require("../utils/catch.async");
const skillRepository = require("../repositories/skill.repository");

exports.getAllSkills = catchAsync(async (req, res, next) => {
  const skills = await skillRepository.find();
  res.status(200).send(skills);
});
