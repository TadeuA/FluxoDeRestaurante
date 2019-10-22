// Importar modulos externos
const express = require('express');
const mongoose = require('mongoose');

// Importar modulos internos

  //Importar rotas
const routes = require('./routes');


// criando aplicação
const app = express();

// conectar bancos de dados
mongoose.connect('mongodb+srv://aluno:alunotadeu@pi-jtump.mongodb.net/test?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

//definir o usos da aplicação
  //uso de json
app.use(express.json());
  //uso de rotas
app.use(routes);

// definir porta da aplicação
app.listen(3333);