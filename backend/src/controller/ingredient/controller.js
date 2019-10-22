// Importar modulo externo
const path = require('path');
//Importar model
const Ingredient = require(path.resolve(__dirname,"..","..","models","Ingredient.js"));

//exportar controller
module.exports = {
    async store(req,res){
        //Busca o name de dentro da requisição de forma abstrada
        const { name } = req.body;
        
        //vereficação para ver se o ingrediente ja existe e se não existir cria-o
        let ingredient = await Ingredient.findOne({ name });
        if(!ingredient){
            ingredient = await Ingredient.create({ name });
        }

        return res.json(ingredient);
    },

    async index(req,res){
        const ingredients = await Ingredient.find();

        return res.json(ingredients);
    }
}