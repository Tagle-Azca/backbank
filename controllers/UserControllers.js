const User = require("../models/User");

const getUsers = async (req, res) => {
  res.json({ message: "Usuarios obtenidos correctamente" });
};

const addUser = async (req, res) => {
  res.json({ message: "Usuario agregado correctamente" });
};

module.exports = { getUsers, addUser };
