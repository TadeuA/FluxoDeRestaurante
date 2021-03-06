// Importar modulo externo
const path = require("path");
//Importar model
const User = require(path.resolve(__dirname, "..", "..", "models", "User.js"));

//exportar controller
module.exports = {
  //Atualizar user com nova foto
  async update(req, res) {
    const { filename } = req.file;
    const { nome, document, classification } = req.body;
    let user = await User.findById(req.params.id);

    if (!user) {
      return res.json({ error: true });
    }
    const { email, password } = user;

    const upUser = {
      thumbnail: filename,
      email,
      password,
      nome,
      document,
      classification
    };

    user = await User.findByIdAndUpdate(req.params.id, upUser, { new: true });

    return res.json(user);
  }
};
