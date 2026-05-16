var empresaModel = require("../models/empresaModel");

function listar(req, res) {
    console.log("Acessei o empresaController - listar");

    empresaModel.listar()
        .then(function (resultado) {
            res.json(resultado);
        })
        .catch(function (erro) {
            console.log("\nHouve um erro ao listar empresas! ERRO:", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            
        });
    
}

function cadastrar(req, res) {
    console.log("Acessei o empresaController - cadastrar");

    var razaoSocial = req.body.razaoSocialServer;
    var cnpj = req.body.cnpjServer;
    var codigoCadastro = req.body.codigoCadastroServer;

    if(razaoSocial == undefined) {
        res.status(400).send("A Razão social está undefined!")
    } else if(cnpj == undefined) {
         res.status(400).send("A cnpj está undefined!")
    } else if(codigoCadastro == undefined) {
         res.status(400).send("A codigoCadastro está undefined!")
    } else {
        empresaModel.cadastrar(razaoSocial, cnpj, codigoCadastro)
            .then(function (resultado) {
                res.json(resultado);
            })
            .catch(function (erro) {
                console.log("\nHouve erro ao cadastrar empresa! ERRO: ", erro.sqlMessage);
                    res.status(500).json(erro.sqlMessage);
            })
    }
    
}

module.exports = {
    listar,
    cadastrar
}