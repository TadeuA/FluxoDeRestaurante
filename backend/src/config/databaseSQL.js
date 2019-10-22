//definir as configurações do db SQL
module.exports = {
    dialect: 'postgres',
    host: 'localhost',
    username: "user",
    password: "pass",
    database: 'pi',
    define: {
        //automatiza a criação e a manipulação dos campos created_ad e updated_at nas tabelas
            //creadet_ad armazena a data da criação do dado
            //updated_at armazena a ultima alteração do dado
        timestamps: true,
        //define o formato dos nomes das tabelas e colunas como snake_case
        underscored: true,
    },
   
};
