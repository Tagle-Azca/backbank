const express = require("express");
const { verifyToken, isAdmin } = require("../middleware/auth");

const router = express.Router();

// Ruta accesible solo para administradores
router.get("/admin-data", verifyToken, isAdmin, (req, res) => {
  res.json({ message: "Datos confidenciales para administradores" });
});

// Ruta accesible para todos los usuarios autenticados
router.get("/user-data", verifyToken, (req, res) => {
  res.json({
    message: "Datos disponibles para todos los usuarios autenticados",
  });
});

module.exports = router;
