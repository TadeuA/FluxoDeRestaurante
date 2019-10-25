// Importar modulos externos
const mongoose = require('mongoose');


// Construir "objeto" e definir seus campos no db
const DishSchema = new mongoose.Schema({
    name: String,
    price: Number,
    ingredients: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Ingredient'
    }]
});

module.exports = mongoose.model('Dish', DishSchema);