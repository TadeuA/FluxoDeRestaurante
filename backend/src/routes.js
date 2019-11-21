// Importar dependencias externas
const express = require("express");
const multer = require("multer");

// Importar modulos internos
const uploadConfig = require("./config/upload");

//Importar regras de nogócios
//Ingredients
const IngredientController = require("./controller/ingredient/controller");
//Dish
const DishController = require("./controller/dish/controller");
const DishForIngredient = require("./controller/dish/forIngredients");
//Table
const TableController = require("./controller/table/controller");
//Orders
const OrdersController = require("./controller/orders/controller");
//Users
const UsersController = require("./controller/user/controller");
const UsersEdit = require("./controller/user/edit");
const NewPass = require("./controller/user/newPass");
//Types
const TypeController = require("./controller/type/controller");
//Command
const CommandController = require("./controller/command/controller");

// definindo responsavel pelas rotas
const routes = express.Router();
//defenir metodo de file upload (segundo a  documentação do multer)
const upload = multer(uploadConfig);

//definir rotas
// ingredients
routes.post("/ingredients", IngredientController.store); //criar                 c
routes.get("/ingredients/:id", IngredientController.show); //mostrar             r
routes.put("/ingredients/:id", IngredientController.update); //atualizar         u
routes.delete("/ingredients/:id", IngredientController.destroy); //deletar       d
routes.get("/ingredients", IngredientController.index); //listar

//Dish
routes.post("/dish", DishController.store); //criar                 c
routes.get("/dish/:id", DishController.show); //mostrar             r
routes.put("/dish/:id", DishController.update); //atualizar         u
routes.delete("/dish/:id", DishController.destroy); //deletar       d
routes.get("/dish", DishController.index); //listar
routes.get("/foringredient/:ingredient", DishForIngredient.index); //listar por ingrediente
routes.get("/foringredient", DishForIngredient.show); //buscar por nome

//Table
routes.post("/table", TableController.store); //criar                 c
routes.get("/table/:id", TableController.show); //mostrar             r
routes.put("/table/:id", TableController.update); //atualizar         u
routes.delete("/table/:id", TableController.destroy); //deletar       d
routes.get("/table", TableController.index); //listar

//Orders
routes.post("/orders", OrdersController.store); //criar                 c
routes.get("/orders/:id", OrdersController.show); //mostrar             r
routes.put("/orders/:id", OrdersController.update); //atualizar         u
routes.delete("/orders/:id", OrdersController.destroy); //deletar       d
routes.get("/orders", OrdersController.index); //listar

//Users
routes.post("/users", UsersController.store); //criar                 c
routes.get("/users/:id", UsersController.show); //mostrar             r
routes.put("/users/:id", UsersController.update); //atualizar         u
routes.delete("/users/:id", UsersController.destroy); //deletar       d
routes.get("/users", UsersController.index); //listar
routes.put("/userscheck/:id", upload.single("thumbnail"), UsersEdit.update); //atualizar foto
routes.put("/usersnp/:id", NewPass.update); //atualizar senha
routes.post("/usersnp", NewPass.show); //logar

//Type
routes.post("/types", TypeController.store); //criar                 c
routes.get("/types/:id", TypeController.show); //mostrar             r
routes.put("/types/:id", TypeController.update); //atualizar         u
routes.delete("/types/:id", TypeController.destroy); //deletar       d
routes.get("/types", TypeController.index); //listar

//Command
routes.post("/command", CommandController.store); //criar                 c
routes.get("/command/:id", CommandController.show); //mostrar             r
routes.put("/command/:id", CommandController.update); //atualizar         u
routes.delete("/command/:id", CommandController.destroy); //deletar       d
routes.get("/command", CommandController.index); //listar

// exportar esse arquivo
module.exports = routes;
