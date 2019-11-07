// Importar modulo externo
const path = require("path");
//Importar model
const Ingredient = require(path.resolve(
  __dirname,
  "..",
  "..",
  "models",
  "Ingredient.js"
));

//exportar controller
module.exports = {
  //Criar ingredients
  async store(req, res) {
    //Busca o name de dentro da requisição de forma abstrada
    const { name } = req.body;

    //vereficação para ver se o ingrediente ja existe e se não existir cria-o
    let ingredient = await Ingredient.findOne({ name });
    if (!ingredient) {
      ingredient = await Ingredient.create({ name });
    }

    return res.json(ingredient);
  },

  // listar ingredients
  async index(req, res) {
    const ingredients = await Ingredient.find();

    return res.json(ingredients);
  },

  // Buscar um ingredient
  async show(req, res) {
    const ingredient = await Ingredient.findById(req.params.id);

    return res.json(ingredient);
  },

  //Atualizar ingredient
  async update(req, res) {
    const ingredient = await Ingredient.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    return res.json(ingredient);
  },

  //Deletar Ingredient
  async destroy(req, res) {
    await Ingredient.findByIdAndRemove(req.params.id);

    return res.send();
  }
};
