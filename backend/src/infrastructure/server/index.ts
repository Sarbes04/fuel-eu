import express from "express";
import dotenv from "dotenv";
import { routesController } from "../container";
import { testDbConnection } from "../db/db";
import {setupDatabase} from "../db/setupDatabase"
import { seedData } from "../db/seedData";
dotenv.config();

const app = express();

// Middleware
app.use(express.json());

// Health check route
app.get("/", (req,res) => {
  res.send("FuelEU Maritime backend running 🚢");
});

app.use("/routes", routesController);

// Use PORT from .env or fallback
const PORT = process.env.PORT || 4000;


app.listen(PORT, () => {
  console.log(`✅ Server is running on port ${PORT}`);
  testDbConnection();
  setupDatabase();
  seedData();
});
