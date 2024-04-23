const request = require("supertest");
const express = require("express");
const volunteerController = require("../controllers/volunteer.person.controller"); // Adjust path as necessary
const userRepository = require("../repositories/user.repository");
const app = express();

app.use(express.json());
app.get(
  "/api/v1/volunteer-persons",
  volunteerController.getAllVolunteerPersons
);
app.get(
  "/api/v1/volunteer-persons/:id",
  volunteerController.getVolunteerPersonById
);
app.post(
  "/api/v1/volunteer-persons",
  volunteerController.createVolunteerPerson
);
app.put(
  "/api/v1/volunteer-persons/:id",
  volunteerController.updateVolunteerPerson
);
app.delete(
  "/api/v1/volunteer-persons/:id",
  volunteerController.deleteVolunteerPerson
);

describe("Volunteer Controller Tests", () => {
  test("GET /api/v1/volunteer-persons - should retrieve all volunteer persons", async () => {
    await request(app)
      .get("/api/v1/volunteer-persons")
      .expect(200)
      .then((response) => {
        expect(Array.isArray(response.body)).toBe(true);
      });
  });

  test("GET /api/v1/volunteer-persons/:id - should retrieve a volunteer person by ID", async () => {
    const id = "66155a07daf00484ac04422e";
    await request(app)
      .get(`/api/v1/volunteer-persons/${id}`)
      .expect(200)
      .then((response) => {
        expect(response.body).toHaveProperty("id", id);
      });
  });

  test("POST /api/v1/volunteer-persons - should create a volunteer person", async () => {
    const newVolunteer = { name: "John Doe", age: 30 };
    await request(app)
      .post("/api/v1/volunteer-persons")
      .send(newVolunteer)
      .expect(200)
      .then((response) => {
        expect(response.body).toEqual(expect.objectContaining(newVolunteer));
      });
  });

  test("PUT /api/v1/volunteer-persons/:id - should update a volunteer person", async () => {
    const id = "662150f598f5d5ad5f17dc7d";
    const updates = { name: "Jane Doe" };
    await request(app)
      .put(`/api/v1/volunteer-persons/${id}`)
      .send(updates)
      .expect(200)
      .then((response) => {
        expect(response.body).toEqual(expect.objectContaining(updates));
      });
  });

  test("DELETE /api/v1/volunteer-persons/:id - should delete a volunteer person", async () => {
    const id = "662828fdb549d908b6154417";
    await request(app)
      .delete(`/api/v1/volunteer-persons/${id}`)
      .expect(200)
      .then((response) => {
        expect(response.body).toEqual(expect.objectContaining({}));
      });
  });
});

describe("Additional Volunteer Controller Tests", () => {
  test("GET /api/v1/volunteer-persons - should handle errors properly", async () => {
    
    userRepository.find = jest
      .fn()
      .mockRejectedValue(new Error("Failed to fetch data"));
    await request(app)
      .get("/api/v1/volunteer-persons")
      .expect(500)
      .then((response) => {
        expect(response.body).toEqual(
          expect.objectContaining({
            message: "Failed to fetch data",
          })
        );
      });
  });

  test("GET /api/v1/volunteer-persons/:id - should return 404 if volunteer person not found", async () => {
    const id = "non-existent-id";
    userRepository.retrieve = jest.fn().mockResolvedValue(null);
    await request(app)
      .get(`/api/v1/volunteer-persons/${id}`)
      .expect(404)
      .then((response) => {
        expect(response.body).toEqual(
          expect.objectContaining({
            error: "Volunteer person not found",
          })
        );
      });
  });

  test("POST /api/v1/volunteer-persons - should validate request body", async () => {
    const invalidVolunteer = { name: "", age: "invalid" };
    await request(app)
      .post("/api/v1/volunteer-persons")
      .send(invalidVolunteer)
      .expect(400)
      .then((response) => {
        expect(response.body).toEqual(
          expect.objectContaining({
            error: "Invalid data provided",
          })
        );
      });
  });

  test("PUT /api/v1/volunteer-persons/:id - should handle absence of volunteer person", async () => {
    const id = "non-existent-id";
    const updates = { name: "Updated Name" };
    userRepository.put = jest.fn().mockResolvedValue(null);
    await request(app)
      .put(`/api/v1/volunteer-persons/${id}`)
      .send(updates)
      .expect(404)
      .then((response) => {
        expect(response.body).toEqual(
          expect.objectContaining({
            error: "Volunteer person not found to update",
          })
        );
      });
  });

  test("DELETE /api/v1/volunteer-persons/:id - should handle non-existing volunteer person", async () => {
    const id = "non-existent-id";
    userRepository.delete = jest.fn().mockResolvedValue(false);
    await request(app)
      .delete(`/api/v1/volunteer-persons/${id}`)
      .expect(404)
      .then((response) => {
        expect(response.body).toEqual(
          expect.objectContaining({
            error: "Volunteer person not found to delete",
          })
        );
      });
  });
});
