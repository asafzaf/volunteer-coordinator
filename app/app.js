const express = require("express");
const app = express();
const morgan = require("morgan");
const globalErrorHandler = require("../controllers/error.controller");
const userRouter = require("../routers/user.router");
const volunteerTaskRouter = require("../routers/volunteer.task.router");
const volunteerPersonRouter = require("../routers/volunteer.person.router");
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

app.use("/api/v1/users", userRouter);
app.use("/api/v1/volunteer-tasks", volunteerTaskRouter);
app.use("/api/v1/volunteer-persons", volunteerPersonRouter);

app.all("*", (req, res, next) => {
  next(new NotFoundError(req.originalUrl));
});

app.use(globalErrorHandler);

const serv = app.listen(port, () => {
  process.env.NODE_ENV === "test"
    ? null
    : console.log(`Server is running on port ${port}`);
});

process.on("unhandledRejection", (err) => {
  console.log(err.name, err.message);
  console.log("Unhandled Rejection! Shutting down...");
  serv.close(() => {
    process.exit(1);
  });
});

process.on("uncaughtException", (err) => {
  console.log(err.name, err.message);
  console.log("Uncaught Exception! Shutting down...");
  serv.close(() => {
    process.exit(1);
  });
});

module.exports = app;
