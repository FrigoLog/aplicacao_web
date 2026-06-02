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
    const id_empresa = req.params.idEmpresa;

    leituraModel.buscarConformidade(id_empresa).then(function (resultado) {
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

function buscarNaoConformidade(req, res) {
    const id_empresa = req.params.idEmpresa;

    leituraModel.buscarNaoConformidade(id_empresa).then(function (resultado) {
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

function buscarKpiConformidade(req, res) {
    const id_empresa = req.params.idEmpresa;

    leituraModel.buscarKpiConformidade(id_empresa)
        .then(function (resultado) {
            res.status(200).json(resultado);
        }).catch(function (erro) {
            console.log(erro);
            res.status(500).json(erro.sqlMessage);
        });
}

function buscarPontosCriticos(req, res) {

    const id_empresa = req.params.idEmpresa;

    leituraModel.buscarPontosCriticos(id_empresa)
        .then(function(resultado) {
            res.status(200).json(resultado);
        })
        .catch(function(erro) {
            console.log(erro);
            res.status(500).json(erro.sqlMessage);
        });
}

function buscarStatusPontosOperacionais(req, res) {

    const id_empresa = req.params.idEmpresa;

    leituraModel.buscarStatusPontosOperacionais(id_empresa)
        .then(function(resultado) {
            res.status(200).json(resultado);
        })
        .catch(function(erro) {
            console.log(erro);
            res.status(500).json(erro.sqlMessage);
        });
}

function buscarAlertas24h(req, res) {

    const id_empresa = req.params.idEmpresa;

    leituraModel.buscarAlertas24h(id_empresa)
        .then(function(resultado) {
            res.status(200).json(resultado);
        })
        .catch(function(erro) {
            console.log(erro);
            res.status(500).json(erro.sqlMessage);
        });
}

function buscarPontoMaisCritico(req, res) {

    const id_empresa = req.params.idEmpresa;

    leituraModel.buscarPontoMaisCritico(id_empresa)
        .then(function(resultado) {
            res.status(200).json(resultado);
        })
        .catch(function(erro) {
            console.log(erro);
            res.status(500).json(erro.sqlMessage);
        });
}

/*
function gerarAlerta(req, res) {
    const id_empresa = req.params.idEmpresa;

    leituraModel.gerarAlerta(id_empresa).then(function (resultado) {
        res.status(200).json(resultado);
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar as ultimas leituras.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}
*/

module.exports = {
    buscarUltimasLeituras,
    buscarConformidade,
    buscarNaoConformidade,
    buscarKpiConformidade,
    buscarPontosCriticos,
    buscarStatusPontosOperacionais,
    buscarAlertas24h,
    buscarPontoMaisCritico
}