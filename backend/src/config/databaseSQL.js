//definir as configurações do db SQL
module.exports = {
    dialect: 'mysql',
    host: 'sql10.freesqldatabase.com',
    username: "sql10309775",
    password: "PytqJ9Pt6z",
    database: 'sql10309775',
    define: {
        //automatiza a criação e a manipulação dos campos created_ad e updated_at nas tabelas
            //creadet_ad armazena a data da criação do dado
            //updated_at armazena a ultima alteração do dado
        timestamps: true,
        //define o formato dos nomes das tabelas e colunas como snake_case
        underscored: true,
    },
   
};