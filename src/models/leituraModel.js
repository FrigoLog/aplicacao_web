var database = require("../database/config");

function buscarUltimasLeituras() {

    var instrucaoSql = `SELECT * FROM vw_leituras_ponto_operacional;`;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarConformidade() {

    var instrucaoSql2= `SELECT (SUM(status_temperatura) / COUNT()) 100 as porcentagem FROM (SELECT * FROM vw_leituras_ponto_operacional);`

    console.log("Executando a instrução SQL: \n" + instrucaoSql2);
    return database.executar(instrucaoSql2);
}

module.exports = {
    buscarUltimasLeituras,
    buscarConformidade
}
