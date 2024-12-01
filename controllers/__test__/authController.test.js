const request = require("supertest");
const express = require("express");
const mongoose = require("mongoose");
const authRoutes = require("../../routes/authRoutes");

const app = express();
app.use(express.json());
app.use("/api/auth", authRoutes);

beforeAll(async () => {
  const mongoUri = process.env.MONGO_URI || "mongodb://localhost:27017/testdb";
  try {
    await mongoose.connect(mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  } catch (error) {
    console.error("Error al conectar a MongoDB:", error);
  }
});

afterAll(async () => {
  try {
    await mongoose.connection.close();
  } catch (error) {
    console.error("Error al cerrar la conexión a MongoDB:", error);
  }
});

describe("Auth Controller Tests", () => {
  it("should return 401 for invalid login", async () => {
    const response = await request(app)
      .post("/api/auth/login")
      .send({ email: "invalid@example.com", password: "wrongpassword" });

    expect(response.status).toBe(401);
    expect(response.body).toEqual(
      expect.objectContaining({
        error: "Invalid email or password",
      })
    );
  }, 10000);

  it("should return 200 for valid login", async () => {
    const response = await request(app)
      .post("/api/auth/login")
      .send({ email: "user@example.com", password: "correctpassword" });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("token");
  }, 10000);
});
