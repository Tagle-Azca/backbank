const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors({ origin: "https://proyectodssfront.vercel.app/" }));

// Conexión a MongoDB
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("Conexión a MongoDB exitosa"))
  .catch((err) => console.error("Error al conectar a MongoDB:", err));

// Rutas
const authRoutes = require("../routes/authRoutes");
const userRoutes = require("../routes/UserRoutes");

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);

module.exports = app; // Exporta la app para Vercel
