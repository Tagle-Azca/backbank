const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors"); // Asegúrate de tener esta línea una sola vez

dotenv.config();

const app = express(); // Define `app` aquí
app.use(express.json());

// Configura CORS
const corsOptions = {
  origin: ["https://proyectodssfront.vercel.app/", "http://localhost:3000"], // Ajusta estas URLs
  methods: "GET,POST,PUT,DELETE",
  allowedHeaders: "Content-Type,Authorization",
};
app.use(cors(corsOptions));

// Conexión a MongoDB
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("Conexión a MongoDB exitosa"))
  .catch((err) => console.error("Error al conectar a MongoDB:", err));

// Rutas
const authRoutes = require("../routes/authRoutes");
app.use("/api/auth", authRoutes);

app.listen(5001, () => {
  console.log("Servidor corriendo en el puerto 5001");
});
