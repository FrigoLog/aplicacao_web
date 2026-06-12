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
        AND hora >= CURDATE()
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

    var instrucaoSql = `SELECT COUNT(*) AS qtd_total_alertas FROM vw_alertas WHERE id_empresa = ${id_empresa} AND data_hora >= CURDATE();`;
    var instrucaoSql2 = `SELECT ponto_operacional, COUNT(*) AS qtd_alertas, ambiente FROM vw_alertas WHERE id_empresa = ${id_empresa} AND data_hora >= CURDATE()
                        GROUP BY ponto_operacional, ambiente
                        ORDER BY qtd_alertas DESC LIMIT 1;
    `

    let resultado1 = await database.executar(instrucaoSql);
    let resultadoGeral = {
        qtd_total_alertas: resultado1[0].qtd_total_alertas,
        po_mais_alertas: null,
        qtd_alertas_po: null,
        ambiente: null
    }

    if (resultadoGeral.qtd_total_alertas > 0) {
        let resultado2 = await database.executar(instrucaoSql2);

        resultadoGeral.po_mais_alertas = resultado2[0].ponto_operacional;
        resultadoGeral.qtd_alertas_po = resultado2[0].qtd_alertas;
        resultadoGeral.ambiente = resultado2[0].ambiente;
    }


    return resultadoGeral;
}

function buscarPontoMaisCritico(id_empresa) {

    const instrucaoSql = `
        SELECT *
        FROM vw_ponto_operacional_mais_critico
        WHERE id_empresa = ${id_empresa};
    `;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function temperaturaDoPo(id_po) {
    const instrucaoSql = `
        SELECT * FROM 
        (
            SELECT
                l.id_leitura,
                l.temperatura,
                DATE_FORMAT(l.data_hora, '%H:%i') AS data_hora,
                s.identificador AS sensor,
                po.nome AS ponto_operacional,
                cpo.temp_min,
                cpo.temp_max,
                l.data_hora AS data_real
            FROM leitura l
            JOIN sensor s
                ON l.fk_sensor = s.id_sensor
            JOIN ponto_operacional po
                ON s.fk_po = po.id_ponto_operacional
            JOIN configuracao_ponto_operacional cpo
                ON po.fk_configuracao_po = cpo.id_configuracao
            WHERE po.id_ponto_operacional = ${id_po}
            AND data_hora >= CURDATE()
            ORDER BY l.data_hora DESC
            LIMIT 15
        ) AS pos
        ORDER BY data_real ASC;
    `;

    return database.executar(instrucaoSql);
}

function alertasDoPo(id_po) {
    const instrucaoSql = `
        SELECT COUNT(*) AS total_alertas
            FROM vw_alertas
            WHERE id_ponto_operacional = ${id_po}
            AND data_hora >= CURDATE();
    `;

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
    buscarPontoMaisCritico,
    temperaturaDoPo,
    alertasDoPo
}
