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

async function cadastrar(req, res) {
    console.log("Acessei o empresaController - cadastrar");

    var razaoSocial = req.body.razaoSocialServer;
    var cnpj = req.body.cnpjServer;
    var cep = req.body.cepServer;
    var numero = req.body.numeroServer;


    if (razaoSocial == undefined) {
        res.status(400).send("A Razão social está undefined!")
    } else if (cnpj == undefined) {
        res.status(400).send("O cnpj está undefined!")
    } else if (cep == undefined) {
        res.status(400).send("O cep está undefined!")
    }else if (numero == undefined) {
        res.status(400).send("O numero está undefined!")
    }else {

        let resultadoCnpj = await empresaModel.verificarCnpj(cnpj);
        
        if (resultadoCnpj[0].qtdCnpj > 0) {
            res.status(400).send("CNPJ já cadastrado!");
            return;
        }

        let codigoValido = false
        let codigo = ""

        while (!codigoValido) {

            const caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
            codigo = 'FRG';

            for (let i = 3; i < 8; i++) {
                codigo += caracteres.charAt(Math.floor(Math.random() * caracteres.length));
            }

            console.log('Código gerado: ', codigo)

            let resultado = await empresaModel.verificarCodigoCadastro(codigo)
            if (resultado[0].qtdEmpresa == 0) {
                codigoValido = true
                console.log('Código válido')
                break;
            } else {
                console.log("Código inválido, tentando novamente")
            }

        }

        empresaModel.cadastrar(razaoSocial, cnpj, codigo, cep, numero)
            .then(function (resultado) {
                res.json({
                    empresa_id: resultado.insertId,
                    codigo_empresa: codigo
                });

            })
            .catch(function (erro) {
                console.log("\nHouve erro ao cadastrar empresa! ERRO: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            })
    }

}

function listarAmbientes(req, res) {
    console.log("Acessei o empresaController - listar unidades");

    let idEmpresa = req.params.idEmpresa;

    empresaModel.listarAmbientes(idEmpresa)
        .then(function (resultado) {
            res.json(resultado);
        })
        .catch(function (erro) {
            console.log("\nHouve um erro ao listar unidades! ERRO:", erro.sqlMessage);
            res.status(500).json(erro.sqlMessage);

        });

}

function listarPOs(req, res) {
    console.log("Acessei o empresaController - listar POs");

    let idAmbiente = req.params.idAmbiente;

    empresaModel.listarPOs(idAmbiente)
        .then(function (resultado) {
            res.json(resultado);
        })
        .catch(function (erro) {
            console.log("\nHouve um erro ao listar unidades! ERRO:", erro.sqlMessage);
            res.status(500).json(erro.sqlMessage);

        });

}

module.exports = {
    listar,
    cadastrar,
    listarAmbientes,
    listarPOs
}