const connectToDatabase = require("../utils/db");
const User = require("../models/User");

module.exports = async (req, res) => {
  await connectToDatabase();

  if (req.method === "GET") {
    const users = await User.find();
    return res.status(200).json(users);
  }

  if (req.method === "POST") {
    const { name, email, password } = req.body;
    const newUser = new User({ name, email, password });
    await newUser.save();
    return res.status(201).json(newUser);
  }

  return res.status(405).json({ message: "Método no permitido" });
};
