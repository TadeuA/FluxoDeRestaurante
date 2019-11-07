//Importar modulo externo
const path = require("path");
//Importar model
const User = require(path.resolve(__dirname, "..", "..", "models", "User.js"));

//exportar controller
module.exports = {
  async update(req, res) {
    const { currentPassword, newPassword, confirm } = req.body;
    const user = await User.findById(req.params.id);
    const { password } = user;

    if (currentPassword === password) {
      if (newPassword === confirm) {
        if (!user) {
          return res.status(400).json({ error: "Usuário não existe!" });
        }

        const { thumbnail, nome, document, classification, email } = user;

        const upUser = {
          thumbnail,
          email,
          password: newPassword,
          nome,
          document,
          classification
        };

        user = await User.findByIdAndUpdate(req.params.id, upUser, {
          new: true
        });

        return res.json(user);
      } else {
        return res.json({ erro: "Nova senha Não confere!" });
      }
    } else {
      return res.json({ erro: "Senha atual não confere!" });
    }
  },

  async show(req, res) {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (user) {
      if (password === user.password) {
        return res.json(user);
      } else {
        return res.json({ badPassword: true });
      }
    } else {
      return res.json({ badEmail: true });
    }
  }
};
