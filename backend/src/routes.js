// Importar dependencias externas
const express = require('express');
//lembrar de adicionar o multer
const multer = require('multer');

// Importar modulos internos
const uploadConfig = require('./config/upload');

//Importar regras de nogócios
  //Ingredients
const IngredientController = require('./controller/ingredient/controller');
  //Dish
const DishController = require('./controller/dish/controller');
  //Table
const TableController = require('./controller/table/controller');
  //Orders
const OrdersController = require('./controller/orders/controller');
 //Users
const UsersController = require('./controller/user/controller');
const UsersCheck = require('./controller/user/check');
const NewPass = require('./controller/user/newPass');


// definindo responsavel pelas rotas
const routes = express.Router();
//defenir metodo de file upload (segundo a  documentação do multer)
const upload = multer(uploadConfig);

//definir rotas
  // ingredients
routes.post('/ingredients', IngredientController.store);//criar                 c  
routes.get('/ingredients/:id', IngredientController.show);//mostrar             r
routes.put('/ingredients/:id', IngredientController.update);//atualizar         u
routes.delete('/ingredients/:id', IngredientController.destroy);//deletar       d  
routes.get('/ingredients', IngredientController.index);//listar                

  //Dish
routes.post('/dish', DishController.store);//criar                 c  
routes.get('/dish/:id', DishController.show);//mostrar             r
routes.put('/dish/:id', DishController.update);//atualizar         u
routes.delete('/dish/:id', DishController.destroy);//deletar       d 
routes.get('/dish', DishController.index);//listar                 


  //Table
routes.post('/table', TableController.store);//criar                 c  
routes.get('/table/:id', TableController.show);//mostrar             r
routes.put('/table/:id', TableController.update);//atualizar         u
routes.delete('/table/:id', TableController.destroy);//deletar       d 
routes.get('/table', TableController.index);//listar                 


//Orders
routes.post('/orders', OrdersController.store);//criar                 c  
routes.get('/orders/:id', OrdersController.show);//mostrar             r
routes.put('/orders/:id', OrdersController.update);//atualizar         u
routes.delete('/orders/:id', OrdersController.destroy);//deletar       d 
routes.get('/orders', OrdersController.index);//listar   

//Users
routes.post('/users', UsersController.store);//criar                 c  
routes.get('/users/:id', UsersController.show);//mostrar             r
routes.put('/users/:id', UsersController.update);//atualizar         u
routes.delete('/users/:id', UsersController.destroy);//deletar       d 
routes.get('/users', UsersController.index);//listar
routes.get('/userscheck/', UsersCheck.show);//vereficar
routes.put('/userscheck/:id', uplaod.single('thumbnail'), UsersCheck.update);//atualizar foto     
routes.put('/usersnp/:id', NewPass.update);//atualizar senha

           


// exportar esse arquivo
module.exports = routes;
