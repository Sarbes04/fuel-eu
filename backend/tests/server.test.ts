import request from "supertest";
import express from "express";

// Minimal server for test
const app = express();
app.get("/", (_req, res) => {
  res.status(200).send("FuelEU Maritime backend running 🚢");
});

describe("Server Health Check", () => {
  it("should return 200 OK on GET /", async () => {
    const response = await request(app).get("/");
    expect(response.status).toBe(200);
    expect(response.text).toBe("FuelEU Maritime backend running 🚢");
  });
});
