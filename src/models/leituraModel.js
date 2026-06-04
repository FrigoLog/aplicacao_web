var database = require("../database/config");

function buscarUltimasLeituras() {

    var instrucaoSql = `SELECT * FROM vw_leituras_ponto_operacional`;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarConformidade(id_empresa) {

    var instrucaoSql = `
        SELECT *
        FROM vw_dash_conformidade_do_sistema
        WHERE id_empresa = ${id_empresa}
        
        ORDER BY hora;
    `

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarKpiConformidade(id_empresa) {

    var instrucaoSql = `
        SELECT porcentagem
        FROM vw_conformidade_do_sistema
        WHERE id_empresa = ${id_empresa};
    `;

    return database.executar(instrucaoSql);
}

function buscarNaoConformidade(id_empresa) {

    var instrucaoSql = `SELECT * FROM vw_nao_conformidade WHERE id_empresa = ${id_empresa}`

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarPontosCriticos(id_empresa) {

    var instrucaoSql = `
        SELECT quantidade
        FROM vw_pontos_operacionais_criticos
        WHERE id_empresa = ${id_empresa};
    `;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarStatusPontosOperacionais(id_empresa) {

    var instrucaoSql = `
        SELECT *
        FROM vw_status_pontos_operacionais
        WHERE id_empresa = ${id_empresa};
    `;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

async function buscarAlertas24h(id_empresa) {

    var instrucaoSql = `SELECT COUNT(*) AS qtd_total_alertas FROM vw_alertas WHERE id_empresa = ${id_empresa};`
    var instrucaoSql2 = `SELECT ponto_operacional, COUNT(*) AS qtd_alertas, ambiente FROM vw_alertas WHERE id_empresa = ${id_empresa}
                        GROUP BY ponto_operacional, ambiente
                        ORDER BY qtd_alertas DESC LIMIT 1;
    `

    let resultado1 = await database.executar(instrucaoSql);
    let resultado2 = await database.executar(instrucaoSql2);
    let resultadoGeral = {
        qtd_total_alertas: resultado1[0].qtd_total_alertas,
        po_mais_alertas: resultado2[0].ponto_operacional,
        qtd_alertas_po: resultado2[0].qtd_alertas,
        ambiente: resultado2[0].ambiente
    }

    return resultadoGeral;
}

function buscarPontoMaisCritico(id_empresa) {

    const instrucaoSql = `
        SELECT *
        FROM vw_ponto_operacional_mais_critico
        WHERE id_empresa = ${id_empresa}
        LIMIT 1;
    `;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

/*
async function gerarAlerta(id_empresa) {

    var instrucaoSql = `SELECT COUNT(*) AS qtd_total_alertas FROM vw_alertas WHERE id_empresa = ${id_empresa};`
    var instrucaoSql2 = `SELECT ponto_operacional, COUNT(*) AS qtd_alertas, ambiente FROM vw_alertas WHERE id_empresa = ${id_empresa}
                        GROUP BY ponto_operacional, ambiente
                        ORDER BY qtd_alertas DESC LIMIT 1;
    `

    // console.log("Executando a instrução SQL: \n" + instrucaoSql);

    let resultado1 = await database.executar(instrucaoSql);
    let resultado2 = await database.executar(instrucaoSql2);
    let resultadoGeral = {
        qtd_total_alertas: resultado1[0].qtd_total_alertas,
        po_mais_alertas: resultado2[0].ponto_operacional,
        qtd_alertas_po: resultado2[0].qtd_alertas,
        ambiente: resultado2[0].ambiente
    }



    return resultadoGeral;

}
*/

module.exports = {
    buscarUltimasLeituras,
    buscarConformidade,
    buscarNaoConformidade,
    buscarKpiConformidade,
    buscarPontosCriticos,
    buscarStatusPontosOperacionais,
    buscarAlertas24h,
    buscarPontoMaisCritico
}
