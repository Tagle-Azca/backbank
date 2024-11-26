const express = require("express");
const router = express.Router();
const { login, register } = require("../controllers/authController");

// Ruta de login
router.post("/login", login);

// Ruta de registro
router.post("/register", register);

module.exports = router;
