//Importar modulos externos
const path = require('path');
const mongoose = require('mongoose');

//Importar modulo interno
const config = require(path.resolve(__dirname,'..','..','config','databaseNoSQL.js'));

//conectar bd e exportar a conexão do db
module.exports = mongoose.connect(config);