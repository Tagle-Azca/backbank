const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors({ origin: "https://proyectodssfront.vercel.app" }));

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

// Ruta base
app.get("/", (req, res) => {
  res.send("Bienvenido a la API de Backbank");
});

// Escuchar en el puerto asignado
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
