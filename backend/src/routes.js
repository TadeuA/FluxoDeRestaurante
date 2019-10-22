// Importar dependencias externas
const express = require('express');

//Importar regras de nogócios
const IngredientController = require('./controller/ingredient/controller');
const DishController = require('./controller/dish/controller');

// definindo responsavel pelas rotas
const routes = express.Router();

//definir rotas
routes.post('/ingredients', IngredientController.store);
routes.get('/ingredients', IngredientController.index);

routes.post('/dish', DishController.store);


// exportar esse arquivo
module.exports = routes;
