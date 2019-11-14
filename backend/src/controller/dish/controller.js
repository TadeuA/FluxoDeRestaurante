// Importar modulo externo
const path = require("path");
//Importar model
const Dish = require(path.resolve(__dirname, "..", "..", "models", "Dish.js"));

//exportar controller
module.exports = {
  //Criar dishs
  async store(req, res) {
    //Busca o name de dentro da requisição de forma abstrada
    const { name } = req.body;

    //vereficação para ver se o dishe ja existe e se não existir cria-o
    let dish = await Dish.findOne({ name });
    if (!dish) {
      dish = await Dish.create(req.body)
      await dish.populate({
        path: "ingredients",
        select: "name"
      }).populate("classification").execPopulate()
      return res.json(dish);
    }

    return res.json({ error: true });
  },

  // listar dishs
  async index(req, res) {
    const dishs = await Dish.find().populate({
      path: "ingredients",
      select: "name"
    }).populate("classification").exec();
    //mostrar informações sobre os ingredient

    return res.json(dishs);
  },

  // Buscar um dish
  async show(req, res) {
    const dish = await Dish.findById(req.params.id).populate({
      path: "ingredients",
      select: "name"
    }).populate("classification").exec();

    return res.json(dish);
  },

  //Atualizar dish
  async update(req, res) {
    const dish = await Dish.findByIdAndUpdate(req.params.id, req.body, {
      new: true
    }).populate({
      path: "ingredients",
      select: "name"
    }).populate("classification").exec();

    return res.json(dish);
  },

  //Deletar Dish
  async destroy(req, res) {
    await Dish.findByIdAndRemove(req.params.id);

    return res.send();
  }
};
