// Importar modulos externos
const express = require('express');
const mongoose = require('mongoose');

// Importar modulos internos
const configMongo = require('./config/databaseNoSQL');

//Conectar ao Servidor db
mongoose.connect(configMongo,{
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
  
  //Importar rotas
const routes = require('./routes');


// criando aplicação
const app = express();


//definir o usos da aplicação
  //uso de json
app.use(express.json());
  //uso de rotas
app.use(routes);

// definir porta da aplicação
app.listen(3333);