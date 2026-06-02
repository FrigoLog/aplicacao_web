var express = require("express");
var router = express.Router();

var leituraController = require("../controllers/leituraController");

router.get("/ultimas", function (req, res) {
    leituraController.buscarUltimasLeituras(req, res);
});

router.get("/conformidade/:idEmpresa", function (req, res) {
    leituraController.buscarConformidade(req, res);
});

router.get("/nao_conformidade/:idEmpresa", function (req, res) {
    leituraController.buscarNaoConformidade(req, res);
});

router.get("/kpi_conformidade/:idEmpresa", function (req, res) {
    leituraController.buscarKpiConformidade(req, res);
});

router.get("/pontos_criticos/:idEmpresa", function (req, res) {
    leituraController.buscarPontosCriticos(req, res);
});

router.get("/status_pos/:idEmpresa", function (req, res) {
    leituraController.buscarStatusPontosOperacionais(req, res);
});

router.get("/alertas24h/:idEmpresa", function (req, res) {
    leituraController.buscarAlertas24h(req, res);
});

router.get("/ponto_mais_critico/:idEmpresa", function (req, res) {
    leituraController.buscarPontoMaisCritico(req, res);
});

/*
router.get("/alertas/:idEmpresa", function (req, res) {
    leituraController.gerarAlerta(req, res);
});
*/

module.exports = router;