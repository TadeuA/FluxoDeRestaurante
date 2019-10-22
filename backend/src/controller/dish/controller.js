// Importar modulo externo
const path = require('path');
//Importar model
const Dish = require(path.resolve(__dirname,"..","..","models","Dish.js"));

//exportar controller
module.exports = {
    async store(req,res){
        //Busca o name de dentro da requisição de forma abstrada
        
        

        return res.json({ok:true});
    }
}