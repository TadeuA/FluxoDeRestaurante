//Importar modulos externos
const Sequelize = require('sequelize');
const path = require('path');//para prevenir que encontre o caminho

//importar a configuração do db SQL
const dbConfig = require(path.resolve(__dirname,'..','..','config','databaseSQL.js'));

//criar o db
const connectionSQL = new Sequelize(dbConfig);

//exportar a conexão do db
module.exports = connectionSQL;