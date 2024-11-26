const express = require("express");
const router = express.Router();
const { login } = require("../controllers/authController");
const { verifyToken, isAdmin } = require("../middlewares/auth");

// Ruta para login
router.post("/login", login);

// Ejemplo de una ruta protegida por token
router.get("/protected", verifyToken, (req, res) => {
  res.json({ message: "Acceso concedido", user: req.user });
});

// Ejemplo de una ruta protegida solo para administradores
router.get("/admin", verifyToken, isAdmin, (req, res) => {
  res.json({ message: "Acceso solo para administradores" });
});

module.exports = router;
