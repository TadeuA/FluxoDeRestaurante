// Importar modulo externo
const path = require('path');
//Importar model
const User = require(path.resolve(__dirname,"..","..","models","User.js"));

//exportar controller
module.exports = {
   //Criar users
    async show( req, res ){
        //Busca o email de dentro da requisição de forma abstrada
        const { email } = req.body;
        
        //vereficação para ver se o user ja existe e
        let user = await User.findOne({ email });
        if( !user ){
           
          return res.send();
        }

        return res.json( {menssage : "Este mail já está cadastrado!"} );
    },
    
    //Atualizar user com nova foto
    async update( req, res ){
      const { filename } = req.file;
      const { nome, document, classification } = req.body;
      const user = await User.findById( req.params.id );
      
      if(!user){
        return res.status(400).json({ error: "Usuário não existe!" })
      }
      const { email, password } = user;
      
      const upUser = {
        thumbnail: filename,
        email,
        password,
        nome,
        document,
        classification
      }


      user = await User.findByIdAndUpdate( req.params.id, upUser, { new: true } );
      
      return res.json( user );
  },
  
}