// Importar modulo externo
const path = require('path');
//Importar model
const Table = require(path.resolve(__dirname,"..","..","models","Table.js"));

//exportar controller
module.exports = {
   //Criar tables
    async store( req, res ){
        //Busca o number de dentro da requisição de forma abstrada
        const { number } = req.body;
        const { classification } = req.body;
        //vereficação para ver se o table ja existe e se não existir cria-o
        let table = await Table.findOne({ number, classification });
        if( !table){
           
            table = await Table.create( req.body );
        }

        return res.json( table );
    },

     // listar tables
    async index( req, res ){
       
        const tables = await Table.find();

        return res.json( tables );
    },
    
    // Buscar um table
    async show( req, res ){
        const table = await Table.findById( req.params.id );

        return res.json( table );
    }, 

    //Atualizar table
    async update( req, res ){
        const table = await Table.findByIdAndUpdate( req.params.id, req.body, { new: true } );
        
        return res.json( table );
    },

    //Deletar Table
    async destroy( req, res ){
        await Table.findByIdAndRemove( req.params.id );

        return res.send();
    },
}