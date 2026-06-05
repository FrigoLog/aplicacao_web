var express = require("express");
var router = express.Router();
 
var empresaController = require("../controllers/empresaController");
 
router.get("/listar", function (req, res) {
    empresaController.listar(req, res);
});
 
router.post("/cadastrar", function (req, res) {
    empresaController.cadastrar(req, res);
});

router.get("/listarAmbientes/:idEmpresa", function (req, res) {
    empresaController.listarAmbientes(req, res);
});

router.get("/listarPOs/:idAmbiente", function (req, res) {
    empresaController.listarPOs(req, res);
});

router.get("/empresasCadastradas", function (req, res) {
    empresaController.carregarEmpresas(req, res);
});

router.get("/listarUsuarios/:idEmpresa" , function(req, res) {
    empresaController.listarUsuarios(req,res);
});

router.get("/buscarCodigoEmpresa/:idEmpresa" , function(req, res) {
    empresaController.listarUsuarios(req,res);
});

 
module.exports = router;
 