// Importar dependencias externas
const express = require('express');

//Importar regras de nogócios
  //Ingredients
const IngredientController = require('./controller/ingredient/controller');
  //Dish
const DishController = require('./controller/dish/controller');

// definindo responsavel pelas rotas
const routes = express.Router();

//definir rotas
  // ingredients
routes.post('/ingredients', IngredientController.store);//criar          c  
routes.get('/ingredients', IngredientController.index);//listar          r
routes.get('/ingredients/:id', IngredientController.show);//mostrar      r
routes.put('/ingredients/:id', IngredientController.update);//atualizar  u
routes.delete('/ingredients/:id', IngredientController.destroy);//deletar   d  
  //Dish
routes.post('/dish', DishController.store);


// exportar esse arquivo
module.exports = routes;
