var leituraModel = require("../models/leituraModel");

function buscarUltimasLeituras(req, res) {

    leituraModel.buscarUltimasLeituras().then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar as ultimas leituras.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

function buscarConformidade(req, res) {

    leituraModel.buscarConformidade().then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar as ultimas leituras.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

module.exports = {
    buscarUltimasLeituras,
    buscarConformidade

}