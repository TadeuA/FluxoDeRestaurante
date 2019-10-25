// Importar modulos externos
const express = require('express');


// Importar modulos internos
  
  //Importar rotas
const routes = require('./routes');


// criando aplicação
const app = express();
//Dessabilitar X-Powered-By pois é um risco conhecido de segurança
app.disable("X-Powered-By");

//definir o usos da aplicação
  //uso de json
app.use(express.json());
  //uso de rotas
app.use(routes);

// definir porta da aplicação
app.listen(3333);