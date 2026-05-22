var contatoModel = require("../models/contatoModel");

function contato(req, res) {

    var nomeEmpresa = req.body.nomeEmpresaServer;
    var email = req.body.emailServer;
    var telefone = req.body.telefoneServer;


    if (nomeEmpresa == undefined) {
        res.status(400).send("Seu nome da empresa está undefined!");
    } else if (email == undefined) {
        res.status(400).send("Seu email está undefined!");
    } else if (telefone == undefined) {
        res.status(400).send("Seu telefone está undefined!");
    } else {
                contatoModel.contato(nomeEmpresa, email, telefone)
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
    contato
}