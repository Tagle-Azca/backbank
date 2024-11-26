const express = require("express");
const router = express.Router();
const User = require("../models/User");

// Endpoint para listar usuarios con rol 'cliente'
router.get("/", async (req, res) => {
  try {
    const users = await User.find({ role: "cliente" }, "name rfc"); // Filtra por rol
    res.status(200).json({ users }); // Devuelve un array de usuarios
  } catch (error) {
    console.error("Error al obtener los usuarios:", error);
    res.status(500).json({ message: "Error al obtener los usuarios" });
  }
});

module.exports = router;
