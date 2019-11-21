// Importar modulo externo
const path = require('path');
//Importar model
const Command = require(path.resolve(__dirname,"..","..","models","Command.js"));

//exportar controller
module.exports = {
   //Criar Command
    async store( req, res ){

        const number = await Command.find().estimatedDocumentCount();
        const { salesman, destiny, table, orders, totalPrice} = req.body
        const obj = {
          number,
          salesman,
          destiny,
          table,
          orders,
          totalPrice
        }
        let commands = await Command.create( obj );
        commands = await Command.findById( commands._id )
        .populate({
          path: "orders",
          model: "Orders",
          populate : {
            path:"dish"
          }}) .populate({
            path: "orders",
            model: "Orders",
            populate:{
              path: "withdraw",
              select: "name"
          }}).populate({
            path: "orders",
            model: "Orders",
            populate:{
              path: "extra"
          }}).exec()

        return res.json( commands );
    },

     // listar Command
    async index( req, res ){

        const command = await Command.find()
        .populate({
          path: "orders",
          model: "Orders",
          populate : {
            path:"dish"
          }}) .populate({
            path: "orders",
            model: "Orders",
            populate:{
              path: "withdraw",
              select: "name"
          }}).populate({
            path: "orders",
            model: "Orders",
            populate:{
              path: "extra"
          }}).exec()

        return res.json( command );
    },

    // Buscar um Command
    async show( req, res ){
        const command = await Command.findById( req.params.id )
        .populate({
          path: "orders",
          model: "Orders",
          populate : {
            path:"dish"
          }}) .populate({
            path: "orders",
            model: "Orders",
            populate:{
              path: "withdraw",
              select: "name"
          }}).populate({
            path: "orders",
            model: "Orders",
            populate:{
              path: "extra"
          }}).exec()
        return res.json( command );
    },

    //Atualizar Command
    async update( req, res ){
        const command = await Command.findByIdAndUpdate( req.params.id, req.body, { new: true } );

        return res.json( command );
    },

    //Deletar Command
    async destroy( req, res ){
        await Command.findByIdAndRemove( req.params.id );

        return res.send();
    },
}
