var database = require("../database/config")

function contato(nome_empresa, email, telefone, data_mensagem){
    console.log("Acessei o usuario Model");

    var instrucaoSql = `insert into contato(nome_empresa, email, telefone, data_mensagem) values ('${nome_empresa}', '${email}', '${telefone}', NOW());
    `
    console.log("Executando a instrução SQL: \n" + instrucaoSql);

    return database.executar(instrucaoSql);
    
}

function carregarMensagens() {

    var instrucao = `
    SELECT
    nome_empresa,
    email,
    telefone,
    DATE_FORMAT(data_mensagem, '%d/%m/%Y') AS data_mensagem
    FROM contato;
    `;

    console.log("executando a instrução sql: \n" + instrucao);

    return database.executar(instrucao);
}

module.exports = {
    contato,
    carregarMensagens
}