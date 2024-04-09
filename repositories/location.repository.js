const MongoDB = require("../db/mongo.db");
const db = new MongoDB("location");

module.exports = {
  find() {
    return db.find();
  },
};
