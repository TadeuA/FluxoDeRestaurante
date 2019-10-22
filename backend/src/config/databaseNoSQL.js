//definir usuario e senha Mongodb
const user = "aluno";
const password = "alunotadeu";
const host = `mongodb+srv://${user}:${password}@pi-jtump.mongodb.net/test?retryWrites=true&w=majority`,
const param = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}
//configuração de conexão
module.exports = connect = {
        host, 
        param,
    }
