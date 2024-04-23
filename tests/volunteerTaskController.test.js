const request = require("supertest");
const express = require("express");
const volunteerTaskController = require("../controllers/volunteer.task.controller"); // Adjust path as necessary
const volunteerTaskRepository = require("../repositories/volunteering.repository");
const userRepository = require("../repositories/user.repository");
const app = express();

app.use(express.json());
app.get(
  "/api/v1/volunteer-tasks",
  volunteerTaskController.getAllVolunteerTasks
);
app.get(
  "/api/v1/volunteer-tasks/:id",
  volunteerTaskController.getVolunteerTaskById
);
app.post(
  "/api/v1/volunteer-tasks",
  volunteerTaskController.createVolunteerTask
);
app.put(
  "/api/v1/volunteer-tasks/:id",
  volunteerTaskController.updateVolunteerTask
);
app.delete(
  "/api/v1/volunteer-tasks/:id",
  volunteerTaskController.deleteVolunteerTask
);
app.get(
  "/api/v1/volunteer-tasks/recommendations/:id",
  volunteerTaskController.recommendTasks
);

describe("Volunteer Task Controller Tests", () => {
  // Tests for retrieving all tasks
  test("GET /api/v1/volunteer-tasks - should retrieve all volunteer tasks", async () => {
    await request(app)
      .get("/api/v1/volunteer-tasks")
      .expect(200)
      .then((response) => {
        expect(Array.isArray(response.body)).toBe(true);
      });
  });

  test("GET /api/v1/volunteer-tasks - should filter tasks by volunteer ID", async () => {
    const volunteerID = "volunteer-id";
    await request(app)
      .get(`/api/v1/volunteer-tasks?volunteers=${volunteerID}`)
      .expect(200)
      .then((response) => {
        expect(
          response.body.every((task) => task.volunteers.includes(volunteerID))
        ).toBe(true);
      });
  });

  // Test for retrieving a task by ID
  test("GET /api/v1/volunteer-tasks/:id - should retrieve a volunteer task by ID", async () => {
    const id = "6615348537226e5a707c6ac8";
    await request(app)
      .get(`/api/v1/volunteer-tasks/${id}`)
      .expect(200)
      .then((response) => {
        expect(response.body).toHaveProperty("id", id);
      });
  });

  // Test for creating a task
  test("POST /api/v1/volunteer-tasks - should create a volunteer task", async () => {
    const newTask = { name: "New Task", description: "Help needed" };
    await request(app)
      .post("/api/v1/volunteer-tasks")
      .send(newTask)
      .expect(200)
      .then((response) => {
        expect(response.body).toEqual(expect.objectContaining(newTask));
      });
  });

  // Test for updating a task
  test("PUT /api/v1/volunteer-tasks/:id - should update a volunteer task", async () => {
    const id = "6615348537226e5a707c6ac8";
    const updates = { name: "Updated Task" };
    await request(app)
      .put(`/api/v1/volunteer-tasks/${id}`)
      .send(updates)
      .expect(200)
      .then((response) => {
        expect(response.body).toEqual(expect.objectContaining(updates));
      });
  });

  // Test for deleting a task
  test("DELETE /api/v1/volunteer-tasks/:id - should delete a volunteer task", async () => {
    const id = "6615348537226e5a707c6ac8";
    await request(app)
      .delete(`/api/v1/volunteer-tasks/${id}`)
      .expect(200)
      .then((response) => {
        expect(response.body).toEqual({});
      });
  });

  // Test for recommending tasks
  test("GET /api/v1/volunteer-tasks/recommendations/:id - should recommend tasks based on user skills and location", async () => {
    const id = "66155a07daf00484ac04422e";
    await request(app)
      .get(`/api/v1/volunteer-tasks/recommend/${id}`)
      .expect(200)
      .then((response) => {
        expect(Array.isArray(response.body)).toBe(true);
        expect(response.body.length).toBeGreaterThan(0);
      });
  });

  test("GET /api/v1/volunteer-tasks/recommendations/:id - should handle no tasks found", async () => {
    const id = "non-existing-user-id";
    userRepository.retrieve = jest.fn().mockResolvedValue(null);
    await request(app)
      .get(`/api/v1/volunteer-tasks/recommend/${id}`)
      .expect(404)
      .then((response) => {
        expect(response.text).toBe("User not found");
      });
  });
});
