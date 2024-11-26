const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: { type: String },
  email: { type: String, required: true, unique: true }, // El email debe ser único
  password: { type: String, required: true }, // Cifrado si usas bcrypt
  role: { type: String, default: "cliente" }, // Rol por defecto
  rfc: { type: String },
  status: { type: String, default: "Activo" }, // Estado del usuario
});

module.exports = mongoose.model("User", UserSchema);
