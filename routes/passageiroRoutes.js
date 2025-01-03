const express = require("express");
const routes = express.Router();

const passageiroController = require("../controllers/passageiroController");

routes.get("/passageiros", passageiroController.listar);
routes.post("/passageiros", passageiroController.cadastrarPost);
routes.get("/passageiros/cadastrar/:cpf?", passageiroController.cadastrarGet);
routes.get("/passageiros/:cpf", passageiroController.detalhar);
routes.get("/passageiros/remover/:cpf", passageiroController.remover);
// routes.get("/passageiros/atualizar/:cpf", passageiroController.atualizar);


module.exports = routes;
