const catchAsync = require("../utils/catch.async");
const volunteerTaskRepository = require("../repositories/volunteering.repository");
const userRepository = require("../repositories/user.repository");

exports.getAllVolunteerTasks = catchAsync(async (req, res, next) => {
  let volunteerTasks = await volunteerTaskRepository.find();
  if (req.query.volunteers) {
    volunteerTasks = volunteerTasks.filter((volunteerTask) => {
      return volunteerTask.volunteers.includes(req.query.volunteers);
    });
    res.status(200).send(volunteerTasks);
  } else {
    res.status(200).send(volunteerTasks);
  }
});

exports.getVolunteerTaskById = catchAsync(async (req, res, next) => {
  const volunteerTask = await volunteerTaskRepository.retrieve(req.params.id);
  res.status(200).send(volunteerTask);
});

exports.createVolunteerTask = catchAsync(async (req, res, next) => {
  const createVolunteerTask = await volunteerTaskRepository.create(req.body);
  res.status(200).send(createVolunteerTask);
});

exports.updateVolunteerTask = catchAsync(async (req, res, next) => {
  const updateVolunteerTask = await volunteerTaskRepository.put(
    req.params.id,
    req.body
  );
  res.status(200).send(updateVolunteerTask);
});

exports.deleteVolunteerTask = catchAsync(async (req, res, next) => {
  const deleteVolunteerTask = await volunteerTaskRepository.delete(
    req.params.id
  );
  res.status(200).send(deleteVolunteerTask);
});

exports.recommendTasks = catchAsync(async (req, res, next) => {
  const userData = await userRepository.retrieve(req.params.id);
  if (!userData) {
    return res.status(404).send("User not found");
  }
  const volunteerTasks = await volunteerTaskRepository.find();
  const recommendedTasks = [];

  volunteerTasks.forEach((volunteerTask) => {
    if (
      volunteerTask.skills.some((skill) => userData.skills.includes(skill)) ||
      volunteerTask.location === userData.location
    ) {
      recommendedTasks.push(volunteerTask);
    }
  });
  if (recommendedTasks.length === 0) {
    return res.status(404).send("No tasks found");
  }
  res.status(200).send(recommendedTasks);
});
