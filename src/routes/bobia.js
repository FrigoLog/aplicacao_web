var express = require("express");
var router = express.Router();

var bobiaController = require("../controllers/bobiaController");

// rota para receber perguntas e gerar respostas
router.post("/perguntar", async (req, res) => {
    const pergunta = req.body.pergunta;

    try {
        const resultado = await bobiaController.gerarResposta(pergunta);
        res.json({ resultado });
    } catch (error) {
        res.status(500).json({ error: 'Erro interno do servidor' });
    }

});

module.exports = router;