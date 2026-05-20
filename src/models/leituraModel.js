var database = require("../database/config");

function buscarUltimasLeituras() {

    var instrucaoSql = `SELECT * FROM vw_leituras_ponto_operacional;`;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarConformidade(id_empresa) {

    var instrucaoSql= `SELECT * FROM vw_conformidade_do_sistema WHERE id_empresa = ${id_empresa}`

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    buscarUltimasLeituras,
    buscarConformidade
}
