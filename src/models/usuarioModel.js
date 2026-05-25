var database = require("../database/config")

function autenticar(email, senha){

    console.log("ACESSEI O USUARIO MODEL");
    
    var instrucaoSql = `
        SELECT u.id_usuario, u.nome, u.email, u.fk_empresa, tu.tipo from usuario u JOIN tipo_usuario tu ON u.fk_tipo_usuario = tu.id_tipo_usuario where email = '${email}' and senha =  SHA2('${senha}',224)
    `;
    console.log("Executando a instruçãoSQL");
    return database.executar(instrucaoSql);
    
}

function cadastrar(nome, email, fk_empresa, senha){
    console.log("Acessei o usuario Model");

    var instrucaoSql = `insert into usuario(nome, email, fk_empresa, fk_tipo_usuario, senha) values ('${nome}', '${email}', '${fk_empresa}', 6, SHA2('${senha}',224))
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);

    return database.executar(instrucaoSql);
    
}

module.exports = {
    autenticar,
    cadastrar
}