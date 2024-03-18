const express = require("express");

const {
  getAllVolunteerPersons,
  getVolunteerPersonById,
  createVolunteerPerson,
  updateVolunteerPerson,
  deleteVolunteerPerson,
} = require("../controllers/volunteer.person.controller");

const router = express.Router();

router.route("/").get(getAllVolunteerPersons).post(createVolunteerPerson);

router
  .route("/:id")
  .get(getVolunteerPersonById)
  .patch(updateVolunteerPerson)
  .delete(deleteVolunteerPerson);

module.exports = router;
