// Importar modulo externo
const path = require("path");
//Importar model
const Type = require(path.resolve(
  __dirname,
  "..",
  "..",
  "models",
  "Type.js"
));

//exportar controller
module.exports = {
  //Criar types
  async store(req, res) {
    //Busca o nome de dentro da requisição de forma abstrada
    const { classification, section} = req.body;

    //vereficação para ver se o type ja existe e se não existir cria-o
    let type = await Type.findOne({ classification });
    if (!type) {
      type = await Type.create({
        classification,
        section
      });
    }

    return res.json(type);
  },

  // listar types
  async index(req, res) {
    const types = await Type.find();

    return res.json(types);
  },

  // Buscar um type
  async show(req, res) {
    const type = await Type.findById(req.params.id);

    return res.json(type);
  },

  //Atualizar type
  async update(req, res) {
    const type = await Type.findByIdAndUpdate(req.params.id, req.body, {
      new: true
    });

    return res.json(type);
  },

  //Deletar Type
  async destroy(req, res) {
    await Type.findByIdAndRemove(req.params.id);

    return res.send();
  }
};
