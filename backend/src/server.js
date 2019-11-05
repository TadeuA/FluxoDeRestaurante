// Importar modulos externos
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

// Importar modulos internos
const mongoConfig = require("./config/databases/databaseNoSQL");

//Conectar ao Servidor db
mongoose.connect(mongoConfig, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

//Importar rotas
const routes = require("./routes");

// criando aplicação
const app = express();
//Dessabilitar X-Powered-By pois é um risco conhecido de segurança
app.disable("X-Powered-By");

//definir o usos da aplicação
//definir permições de acesso a api
app.use(cors());
//uso de json
app.use(express.json());
//uso de rotas
app.use(routes);

// definir porta da aplicação
app.listen(3333);
