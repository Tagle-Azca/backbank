const express = require("express");
const { login, register } = require("../controllers/authController");

const router = express.Router();

// Rutas de autenticación
router.post("/login", login);
router.post("/register", register); // Si necesitas registrar usuarios

module.exports = router;
