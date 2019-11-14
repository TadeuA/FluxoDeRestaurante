// Importar modulos externos
const mongoose = require("mongoose");

// Construir "objeto" e definir seus campos no db
const TableSchema = new mongoose.Schema({
  number: Number,
  vacancies: Number,
  availability: Boolean,
  classification :{
    type: mongoose.Schema.Types.ObjectId,
      ref: "Type"
  }
});

module.exports = mongoose.model("Table", TableSchema);
