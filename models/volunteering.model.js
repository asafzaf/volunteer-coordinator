const { Schema, model } = require("mongoose");
const volunteeringSchema = new Schema({
  title: {
    type: String,
    required: [true, "Please enter the title of the volunteering opportunity"],
  },
  describtion: {
    type: String,
    required: [true, "Please enter a describtion"],
  },
  skills: {
    type: Array,
    required: [true, "Please enter the skills"],
  },
  requirements: {
    type: String,
    required: [true, "Please enter the requirements"],
  },
  location: {
    type: String,
    required: [true, "Please enter the location"],
  },
  time: {
    type: String,
    required: [true, "Please enter the time"],
  },
  status: {
    type: String,
    required: [true, "Please enter the status"],
  },
  volunteers: {
    type: Array,
  },
});
module.exports = model("volunteering", volunteeringSchema);
