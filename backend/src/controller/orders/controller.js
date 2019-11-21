// Importar modulo externo
const path = require('path');
//Importar model
const Orders = require(path.resolve(__dirname,"..","..","models","Orders.js"));
const Dish = require(path.resolve(__dirname,"..","..","models","Dish.js"));

//exportar controller
module.exports = {
   //Criar orders
    async store( req, res ){
        const { extra, dish, amount , withdraw} = req.body;

        const D = await Dish.findById(dish);

        let totalPrice = D.price;

        if(extra){
          let extraPrice = 0
         await extra.reduce(async (acc, item) => {
            const result = await Dish.findById(item)

             extraPrice += result.price;
          }, 0);
          totalPrice += extraPrice
        }

        totalPrice *= amount
        const obj = {
          dish: D,
          withdraw,
          extra,
          amount,
          totalPrice

        }

        let orders = await Orders.create( obj );
        orders = await Orders.findById( orders._id).populate({
          path: "withdraw",
          model: "Ingredient"
        }).populate({
          path: "extra",
          model: "Dish"
        }).populate({
          path: "dish",
          model: "Dish"
        }).populate({
          path: "dish",
          populate : {
            path:"ingredients"
          }
        }).exec()

        return res.json( orders );
    },

     // listar orders
    async index( req, res ){

        const orders = await Orders.find().populate({
          path: "withdraw",
          model: "Ingredient"
        }).populate({
          path: "extra",
          model: "Dish"
        }).populate({
          path: "dish",
          model: "Dish"
        }).populate({
          path: "dish",
          populate : {
            path:"ingredients"
          }
        }).exec()
s

        return res.json( orders );
    },

    // Buscar um orders
    async show( req, res ){
        const orders = await Orders.findById( req.params.id )
        .populate({
          path: "withdraw",
          model: "Ingredient"
        }).populate({
          path: "extra",
          model: "Dish"
        }).populate({
          path: "dish",
          model: "Dish"
        }).populate({
          path: "dish",
          populate : {
            path:"ingredients"
          }
        }).exec()

        return res.json( orders );
    },

    //Atualizar orders
    async update( req, res ){
        const orders = await Orders.findByIdAndUpdate( req.params.id, req.body, { new: true } )
        .populate({
          path: "withdraw",
          model: "Ingredient"
        }).populate({
          path: "extra",
          model: "Dish"
        }).populate({
          path: "dish",
          model: "Dish"
        }).populate({
          path: "dish",
          populate : {
            path:"ingredients"
          }
        }).exec()


        return res.json( orders );
    },

    //Deletar Orders
    async destroy( req, res ){
        await Orders.findByIdAndRemove( req.params.id );

        return res.send();
    },
}
