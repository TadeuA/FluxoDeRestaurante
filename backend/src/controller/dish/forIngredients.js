// Importar modulo externo
const path = require("path");
//Importar model
const Dish = require(path.resolve(__dirname, "..", "..", "models", "Dish.js"));

//exportar controller
module.exports = {
  // Buscar lista dish pelo seu ingrediente
  async index(req, res) {
    const dishs = await Dish.find({ ingredients: req.params.ingredient });

    return res.json(dishs);
  },
  // Buscar um dish
  async show(req, res) {
    const { name } = req.body;
    const dish = await Dish.findOne(name);

    return res.json(dish);
  }
};
