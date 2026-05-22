var database = require("../database/config")

function contato(nome_empresa, email, telefone){
    console.log("Acessei o usuario Model");

    var instrucaoSql = `insert into contato(nome_empresa, email, telefone) values ('${nome_empresa}', '${email}', '${telefone}')
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);

    return database.executar(instrucaoSql);
    
}

module.exports = {
    contato
}