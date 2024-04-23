const e = require("express");
const catchAsync = require("../utils/catch.async");
const userRepository = require("../repositories/user.repository");

exports.getAllVolunteerPersons = catchAsync(async (req, res, next) => {
  const volunteerPersons = await userRepository.find();
  res.status(200).send(volunteerPersons);
});

exports.getVolunteerPersonById = catchAsync(async (req, res, next) => {
  const volunteerPerson = await userRepository.retrieve(req.params.id);
  if (!volunteerPerson) {
    return res.status(404).send("Volunteer Person not found");
  }
  res.status(200).send(volunteerPerson);
});

exports.createVolunteerPerson = catchAsync(async (req, res, next) => {
  const createVolunteerPerson = await userRepository.create(req.body);
  res.status(200).send(createVolunteerPerson);
});

exports.updateVolunteerPerson = catchAsync(async (req, res, next) => {
  const updateVolunteerPerson = await userRepository.put(
    req.params.id,
    req.body
  );
  res.status(200).send(updateVolunteerPerson);
});

exports.deleteVolunteerPerson = catchAsync(async (req, res, next) => {
  const volunteerPerson = await userRepository.retrieve(req.params.id);
  if (!volunteerPerson) {
    return res.status(404).send("Volunteer Person not found");
  } else {
    const deleteVolunteerPerson = await userRepository.delete(req.params.id);
    res.status(204).send(deleteVolunteerPerson);
  }
});
