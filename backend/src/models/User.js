// Importar modulos externos
const mongoose = require('mongoose');


// Construir "objeto" e definir seus campos no db
const UserSchema = new mongoose.Schema({
    thumbnail: String,
    name: String,
    email: String,
    password: String,
    document: String,
    classification: String,
});

module.exports = mongoose.model('User', UserSchema);