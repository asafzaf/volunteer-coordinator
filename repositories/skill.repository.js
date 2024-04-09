const MongoDB = require("../db/mongo.db");
const db = new MongoDB("skill");

module.exports = {
  find() {
    return db.find();
  },
};
