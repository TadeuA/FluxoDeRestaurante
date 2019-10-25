// Importar modulo externo
const path = require('path');
//Importar model
const User = require(path.resolve(__dirname,"..","..","models","User.js"));

//exportar controller
module.exports = {
   //Criar users
    async store( req, res ){
        // verefircar igualdade de senha    
        if(req.body.password === req.body.confirm){
            
            const { password } = req.body; 
            //Busca o email de dentro da requisição de forma abstrada
            const { email } = req.body;
        
            //vereficação para ver se o email não foi criado neste instante e se não existir cria-o
            let user = await User.findOne({ email });
            if( !user ){  

                user = await User.create({ email, password } );
                return res.json( user );
            }else{

                return res.json({ menssage: "Este email já está cadastrado " });
            }
        }else{

            return res.json({ message: "Senhas não conferem" })
        }

        
    },

     // listar users
    async index( req, res ){
       
        const users = await User.find();

        return res.json( users );
    },
    
    // Buscar um user
    async show( req, res ){
        const user = await User.findById( req.params.id );

        return res.json( user );
    }, 

    //Atualizar user
    async update( req, res ){
        const { nome, document, classification, email } = req.body;
        const user = await User.findById( req.params.id );
        
        if(!user){
          return res.status(400).json({ error: "Usuário não existe!" })
        }
        const { thumbnail, password } = user;
        
        const upUser = {
          thumbnail,
          email,
          password,
          nome,
          document,
          classification
        }
  
  
        user = await User.findByIdAndUpdate( req.params.id, upUser, { new: true } );
        
        return res.json( user );
    },

    //Deletar User
    async destroy( req, res ){
        await User.findByIdAndRemove( req.params.id );

        return res.send();
    },
}