const User = require("../models/User"); // Importa el modelo del usuario
const bcrypt = require("bcrypt"); // Usar bcrypt para cifrar contraseñas
const jwt = require("jsonwebtoken"); // Usar JWT para generar tokens de autenticación

// Controlador para iniciar sesión
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validar datos obligatorios
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email y contraseña son obligatorios" });
    }

    // Buscar usuario por email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    // Validar contraseña (sin cifrado, comparación directa)
    if (user.password !== password) {
      return res.status(401).json({ message: "Contraseña incorrecta" });
    }

    // Generar token JWT
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    // Respuesta exitosa
    res.status(200).json({
      message: "Login exitoso",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      token,
    });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ message: "Error en el servidor", error: err.message });
  }
};
// Controlador para registrar un usuario
const register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    // Validar datos obligatorios
    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ message: "Nombre, email y contraseña son obligatorios" });
    }

    // Verificar si el usuario ya existe
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "El usuario ya existe" });
    }

    // Cifrar contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    // Crear nuevo usuario
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      role: role || "cliente", // Asignar rol por defecto
    });

    await newUser.save();

    res.status(201).json({ message: "Usuario registrado exitosamente" });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ message: "Error en el servidor", error: err.message });
  }
};

// Exportar los controladores
module.exports = { login, register };
