var database = require("../database/config");

function listar() {
    console.log("Acessei o empresaModel - listar");

    var instrucaoSql = `SELECT id_empresa, razao_social, cnpj, codigo_cadastro FROM empresa`;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    
    return database.executar(instrucaoSql);
}

function cadastrar(razaoSocial, cnpj, codigoCadastro) {
    console.log("Acessei o empresaModel - cadastrar");

    var instrucaoSql = `INSERT INTO empresa (razao_social, cnpj, codigo_cadastro)
        VALUES ('${razaoSocial}', '${cnpj}', '${codigoCadastro}')`;

        console.log("Executando a instrução SQL: \n" + instrucaoSql);
        
        return database.executar(instrucaoSql);
    
}

function verificarCodigoCadastro(codigoCadastro){
    
    var instrucaoSql = `SELECT COUNT(*) AS qtdEmpresa FROM empresa WHERE codigo_cadastro = '${codigoCadastro}'`

    return database.executar(instrucaoSql) 
}

function listarAmbientes(idEmpresa) {

    var instrucaoSql = `SELECT ae.id_ambiente, ae.nome, e.cep, e.numero FROM ambiente_externo ae 
    JOIN endereco e ON ae.fk_endereco = e.id_endereco
    JOIN empresa em ON ae.fk_empresa = em.id_empresa
    WHERE ae.fk_empresa = ${idEmpresa};`;

        console.log("Executando a instrução SQL: \n" + instrucaoSql);
        
        return database.executar(instrucaoSql);
    
}

function listarPOs(idAmbiente) {

    var instrucaoSql = `SELECT po.id_ponto_operacional, po.nome, cpo.temp_min, cpo.temp_max, tpo.tipo FROM ponto_operacional po
    JOIN ambiente_externo ae ON po.fk_ambiente = ae.id_ambiente
    JOIN configuracao_ponto_operacional cpo ON po.fk_configuracao_po = cpo.id_configuracao
    JOIN tipo_ponto_operacional tpo ON po.fk_tipo_po = tpo.id_tipo_po
    WHERE po.fk_ambiente = ${idAmbiente};`;

        console.log("Executando a instrução SQL: \n" + instrucaoSql);
        
        return database.executar(instrucaoSql);
    
}

module.exports = {
    listar,
    cadastrar,
    verificarCodigoCadastro,
    listarAmbientes,
    listarPOs
};