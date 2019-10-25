//definir usuario e senha Mongodb
const user = "user";
const password = "pass";
const host = `mongodb+srv://${user}:${password}@pi-jtump.mongodb.net/test?retryWrites=true&w=majority`;

//configuração de conexão
module.exports = host;
