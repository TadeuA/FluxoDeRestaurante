// Importar modulo externo
const path = require('path');
//Importar model
const Orders = require(path.resolve(__dirname,"..","..","models","Orders.js"));

//exportar controller
module.exports = {
   //Criar orders
    async store( req, res ){

        //Busca o number de dentro da requisição de forma abstrada
        const { number } = req.body;
        
        //vereficação para ver se o table ja existe e se não existir cria-o
        let orders = await Orders.findOne({ number });
        if( !table)
         orders = await Orders.create( req.body );

        return res.json( orders );
    },

     // listar orders
    async index( req, res ){
       
        const orders = await Orders.find();

        return res.json( orders );
    },
    
    // Buscar um orders
    async show( req, res ){
        const orders = await Orders.findById( req.params.id );

        return res.json( orders );
    }, 

    //Atualizar orders
    async update( req, res ){
        const orders = await Orders.findByIdAndUpdate( req.params.id, req.body, { new: true } );
        
        return res.json( orders );
    },

    //Deletar Orders
    async destroy( req, res ){
        await Orders.findByIdAndRemove( req.params.id );

        return res.send();
    },
}