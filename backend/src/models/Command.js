// Importar modulos externos
const mongoose = require('mongoose');


// Construir "objeto" e definir seus campos no db
const CommandSchema = new mongoose.Schema({
    number: Number,
    costumer: String,
    salesman: String,
    destiny: String,
    date: {
      type: Date,
      default: Date.now
    },
    table: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Table'
    },
    adrress:{
      zipCode: Number,
      number: Number,
      complement: String
    },
    orders:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Orders'
    }],
    totalPrice:Number

});

module.exports = mongoose.model('Command', CommandSchema);
