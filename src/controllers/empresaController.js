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


    if (razaoSocial == undefined) {
        res.status(400).send("A Razão social está undefined!")
    } else if (cnpj == undefined) {
        res.status(400).send("A cnpj está undefined!")
    } else {

        let codigoValido = false
        let codigo = ""

        while (!codigoValido) {

            const caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
            let codigo = 'FRG';

            for (let i = 3; i < 8; i++) {
                codigo += caracteres.charAt(Math.floor(Math.random() * caracteres.length));
            }

            empresaModel.verificarCodigoCadastro(codigo)
            .then((resultado) => {
                if(resultado[0].qtdEmpresa == 0){
                    codigoValido = true
                    break
                }
            })
        }

        empresaModel.cadastrar(razaoSocial, cnpj, codigo)
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