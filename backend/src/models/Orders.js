// Importar modulos externos
const mongoose = require('mongoose');


// Construir "objeto" e definir seus campos no db
const OrdersSchema = new mongoose.Schema({
    number: Number,
    salesman: String,
    customer: String,
    destiny: String,
    table: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Table'
    },
    adrress:{
      zipCode: String,
      number: Number,
      complement: String
    },
    orders:[{
      Dishs:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Dish'
      },
      amount: Number,
    }]

});

module.exports = mongoose.model('Orders', OrdersSchema);