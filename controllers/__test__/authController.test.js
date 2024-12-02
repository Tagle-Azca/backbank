const request = require("supertest");
const express = require("express");

const app = express();
app.use(express.json());

app.post("/api/auth/login", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required." });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: "Invalid email format." });
  }

  if (email === "rendon.a.la@gmail.com" && password === "12345") {
    return res.status(200).json({ message: "Login successful." });
  }

  return res.status(401).json({ error: "Invalid email or password." });
});

describe("Auth Controller Tests with Simulated Logic", () => {
  it("should return 400 if email or password is missing", async () => {
    const response = await request(app)
      .post("/api/auth/login")
      .send({ password: "12345" });
    expect(response.status).toBe(400);
    expect(response.body).toEqual(
      expect.objectContaining({
        error: "Email and password are required.",
      })
    );
  });

  it("should return 400 if email is not valid", async () => {
    const response = await request(app)
      .post("/api/auth/login")
      .send({ email: "invalid-email", password: "12345" });
    expect(response.status).toBe(400);
    expect(response.body).toEqual(
      expect.objectContaining({
        error: "Invalid email format.",
      })
    );
  });

  it("should return 200 for valid email and password", async () => {
    const response = await request(app)
      .post("/api/auth/login")
      .send({ email: "rendon.a.la@gmail.com", password: "12345" });

    expect(response.status).toBe(200);
    expect(response.body).toEqual(
      expect.objectContaining({
        message: "Login successful.",
      })
    );
  });

  it("should return 401 for invalid email or password", async () => {
    const response = await request(app)
      .post("/api/auth/login")
      .send({ email: "wrong@example.com", password: "wrongpassword" });

    expect(response.status).toBe(401);
    expect(response.body).toEqual(
      expect.objectContaining({
        error: "Invalid email or password.",
      })
    );
  });
});
