const express = require("express");
const {
  getAllVolunteerTasks,
  getVolunteerTaskById,
  createVolunteerTask,
  updateVolunteerTask,
  deleteVolunteerTask,
  updateVolunteers,
} = require("../controllers/volunteer.task.controller");

const router = express.Router();

router.route("/").get(getAllVolunteerTasks).post(createVolunteerTask);

router
  .route("/:id")
  .get(getVolunteerTaskById)
  .patch(updateVolunteerTask)
  .delete(deleteVolunteerTask);

// router.route("/:userid/:taskid").patch(updateVolunteers);

module.exports = router;
