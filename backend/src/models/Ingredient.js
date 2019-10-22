// Importar modulos externos
const mongoose = require('mongoose');

// Construir "objeto" e definir seus campos no db
const IngredientSchema = new mongoose.Schema({
    name: String,
});

module.exports = mongoose.model('Ingredient', IngredientSchema);