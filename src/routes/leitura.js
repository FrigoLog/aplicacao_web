var express = require("express");
var router = express.Router();

var leituraController = require("../controllers/leituraController");

router.get("/ultimas", function (req, res) {
    leituraController.buscarUltimasLeituras(req, res);
});

router.get("/conformidade/:idEmpresa", function (req, res) {
    leituraController.buscarConformidade(req, res);
});

module.exports = router;