const express = require("express");
const routes = express.Router();

const vooController = require("../controllers/vooController");

routes.get("/voos/", vooController.listar);
routes.post("/voos/", vooController.cadastrarPost);
routes.get("/voos/cadastrar/:numerovoo?", vooController.cadastrarGet);
routes.get("/voos/:numerovoo", vooController.detalhar);
routes.get("/voos/remover/:numerovoo", vooController.remover);

module.exports = routes;
