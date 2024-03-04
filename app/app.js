const express = require("express");
const app = express();
const morgan = require("morgan");
const volunteerTaskRouter = require("../routers/volunteer.task.router");
const volunteerPersonRouter = require("../routers/volunteer.person.router");
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

app.use("/api/v1/volunteer-tasks", volunteerTaskRouter);
app.use("/api/v1/volunteer-persons", volunteerPersonRouter);

app.listen(port, () => {
  console.log(`Example app listening at port: ${port}`);
});