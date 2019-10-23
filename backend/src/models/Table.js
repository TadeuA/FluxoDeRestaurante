// Importar modulos externos
const mongoose = require('mongoose');


// Construir "objeto" e definir seus campos no db
const TableSchema = new mongoose.Schema({
    number: Number,
    classification: String,
});

module.exports = mongoose.model('Table', TableSchema);