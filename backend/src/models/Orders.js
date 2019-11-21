// Importar modulos externos
const mongoose = require('mongoose');


// Construir "objeto" e definir seus campos no db
const OrdersSchema = new mongoose.Schema({
    dish:{type: mongoose.Schema.Types.ObjectId,
      ref: 'Dish'
    },
    withdraw:[{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Ingredient'
    }],
    extra:[{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Dish'
    }],
    amount: Number,
    totalPrice: Number
});

module.exports = mongoose.model('Orders', OrdersSchema);
