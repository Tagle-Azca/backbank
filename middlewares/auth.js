const jwt = require("jsonwebtoken");
const express = require("express");
const router = express.Router();

const { getAllUsers } = require("../controllers/authController");

router.get("/users", getAllUsers);

module.exports = router;
const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(403).json({ message: "Token no proporcionado" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: "Token inválido" });
  }
};

const isAdmin = (req, res, next) => {
  if (req.user.role !== "administrador") {
    return res
      .status(403)
      .json({ message: "Acceso denegado: solo para administradores" });
  }
  next();
};

module.exports = { verifyToken, isAdmin };
