const { Schema, model } = require("mongoose");
const locationSchema = new Schema({
  location: {
    type: String,
  },
});
module.exports = model("locations", locationSchema);
