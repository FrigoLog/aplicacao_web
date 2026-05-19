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

module.exports = {
    listar,
    cadastrar,
    verificarCodigoCadastro
};