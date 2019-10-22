// Importar dependencias externas
const express = require('express');

//Importar regras de nogócios
const IngredientController = require('./controller/Ingredient/index');

// definindo responsavel pelas rotas
const routes = express.Router();

//definir rotas
routes.post('/ingredients', IngredientController.store);

// exportar esse arquivo
module.exports = routes;
