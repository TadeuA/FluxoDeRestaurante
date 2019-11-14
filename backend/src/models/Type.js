// Importar modulos externos
const mongoose = require("mongoose");

// Construir "objeto" e definir seus campos no db
const TypeSchema = new mongoose.Schema({
  classification: String,
  section:String
});

module.exports = mongoose.model("Type", TypeSchema);
