// Importar modulos externos
const mongoose = require('mongoose');

// Construir "objeto" e definir seus campos no db
const IngredientSchema = new mongoose.Schema({
    name: String,
    classification :{
      type: mongoose.Schema.Types.ObjectId,
        ref: "Type"
    }
});

module.exports = mongoose.model('Ingredient', IngredientSchema);
