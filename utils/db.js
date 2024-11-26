const mongoose = require("mongoose");

let isConnected;

const connectToDatabase = async () => {
  if (isConnected) {
    console.log("Usando conexión existente a MongoDB");
    return;
  }

  const db = await mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  isConnected = db.connections[0].readyState;
  console.log("Conexión nueva a MongoDB establecida");
};

module.exports = connectToDatabase;
