const { Schema, model } = require("mongoose");
const skillSchema = new Schema({
  name: {
    type: String,
  },
});
module.exports = model("skills", skillSchema);
