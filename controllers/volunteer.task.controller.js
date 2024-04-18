const catchAsync = require("../utils/catch.async");
const volunteerTaskRepository = require("../repositories/volunteering.repository");

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

// exports.updateVolunteers = catchAsync(async (req, res, next) => {
//   // update the volunteers array

//   const taskId = req.params.taskid;
//   const userId = req.params.userid;

//   try {
//     const volunteering = await volunteerTaskRepository.retrieve(taskId);
//     if (!volunteering) {
//       return res.status(404).json({ message: "Volunteering task not found" });
//     }

//     const updatedTask = {
//       ...volunteering,
//       volunteers: [...volunteering.volunteers, userId],
//     };

//     const updatedVolunteering = await volunteerTaskRepository.put(
//       taskId,
//       updatedTask
//     );

//     res.status(200).json(updatedVolunteering);
//   } catch (error) {
//     res.status(200).send(updatedVolunteering);
//   }
// });

exports.deleteVolunteerTask = catchAsync(async (req, res, next) => {
  const deleteVolunteerTask = await volunteerTaskRepository.delete(
    req.params.id
  );
  res.status(200).send(deleteVolunteerTask);
});
