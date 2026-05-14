var database = require("../database/config")

function autenticar(email, senha){

    console.log("ACESSEI O USUARIO MODEL");
    
    var instrucaoSql = `
    SELECT id_usuario, nome, email, fk_tipo_usuario, fk_empresa from usuario where email = '${email}' and senha = '${senha}'
    `;
    console.log("Executando a instruçãoSQL");
    return database.executar(instrucaoSql);
    
}

function cadastrar(nome, email, fk_empresa, senha){
    console.log("Acessei o usuario Model");

    var instrucaoSql = `insert into usuario(nome, email, fk_empresa, senha) values ('${nome}', '${email}', '${fk_empresa}', '${senha}')
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);

    return database.executar(instrucaoSql);
    
}

module.exports = {
    autenticar,
    cadastrar
}