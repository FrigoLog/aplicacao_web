var usuarioModel = require("../Models/UsuarioModels")

function autenticar(req,res){
    var email = req.body.emailServer;
    var senha = req.body.senhaServer;

    if(email == undefined) {
        res.status(400).send("Seu email está undefined arrume!!");
    } else if (senha == undefined){
        res.status(400).send("Sua Senha está undefined arumme!!");
    } else {
        usuarioModel.autenticar(email, senha)
        .then(
            function (Autenticacao) {
                console.log(`\nResultados encontrados: ${Autenticacao.length}`);
                console.log(`Resultados: ${JSON.stringify(Autenticacao)}`);
                
            if(Autenticacao.length == 1){
                console.log(Autenticacao);
                
                res.json({
                    id_usuario: Autenticacao[0].id_usuario,
                    nome: Autenticacao[0].nome,
                    senha: Autenticacao[0].senha,
                    email: Autenticacao[0].senha
                    
                    });
                } else if(Autenticacao.length == 0){
                    res.status(403).send("Email e/ou senha Incorreto(s)");
                }else{
                    res.status(403).send("Usuario em duplicidade");
                }
            }).catch(
                function (erro) {
                    console.log(erro);
                    console.log("\nHouve um erro ao realizar o login! Erro: ", erro.sqlMessage);
                    res.status(500).json(erro.sqlMessage);
                }
            )
            
    }
}

function cadastrar(req, res) {

    var nome = req.body.nomeServer;
    var email = req.body.emailServer;
    var senha = req.body.senhaServer;
    var fk_empresa = req.body.fk_empresaServer;

    if (nome == undefined) {
        res.status(400).send("Seu nome está undefined!");
    } else if (email == undefined) {
        res.status(400).send("Seu email está undefined!");
    } else if (senha == undefined) {
        res.status(400).send("Sua senha está undefined!");
    } else if (fkEmpresa == undefined) {
        res.status(400).send("Sua empresa a vincular está undefined!");
    } else {
                // Passe os valores como parâmetro e vá para o arquivo usuarioModel.js
                usuarioModel.cadastrar(nome, email, senha, fkEmpresa)
                    .then(
                        function (resultado) {
                            res.json(resultado);
                        }
                    ).catch(
                        function (erro) {
                            console.log(erro);
                            console.log(
                                "\nHouve um erro ao realizar o cadastro! Erro: ",
                                erro.sqlMessage
                            );
                            res.status(500).json(erro.sqlMessage);
                        }
                    );
    }
}

module.exports = {
    autenticar,
    cadastrar
}