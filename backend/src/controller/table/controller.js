// Importar modulo externo
const path = require("path");
//Importar model
const Table = require(path.resolve(
  __dirname,
  "..",
  "..",
  "models",
  "Table.js"
));

//exportar controller
module.exports = {
  //Criar tables
  async store(req, res) {
    //Busca o number de dentro da requisição de forma abstrada
    const { number, classification, vacancies } = req.body;

    //vereficação para ver se o table ja existe e se não existir cria-o
    let table = await Table.findOne({ number, classification });
    if (!table) {
      table = await Table.create({
        number,
        vacancies,
        availability: true,
        classification
      });
    }
    await table.populate("classification").execPopulate()
    return res.json(table);
  },

  // listar tables
  async index(req, res) {
    const tables = await Table.find().populate("classification").exec();

    return res.json(tables);
  },

  // Buscar um table
  async show(req, res) {
    const table = await Table.findById(req.params.id).populate("classification").exec();

    return res.json(table);
  },

  //Atualizar table
  async update(req, res) {
    const table = await Table.findByIdAndUpdate(req.params.id, req.body, {
      new: true
    }).populate("classification").exec();

    return res.json(table);
  },

  //Deletar Table
  async destroy(req, res) {
    await Table.findByIdAndRemove(req.params.id);

    return res.send();
  }
};
