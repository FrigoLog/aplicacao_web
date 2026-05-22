var express = require("express");
var router = express.Router();

var contatoController = require("../controllers/contatoController");

router.post("/contato", function (req, res) {
    contatoController.contato(req, res);
});

module.exports = router;