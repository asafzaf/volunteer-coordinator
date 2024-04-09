const express = require("express");
const skillController = require("../controllers/skill.controller");

const router = express.Router();

router.route("/").get(skillController.getAllSkills);

module.exports = router;
