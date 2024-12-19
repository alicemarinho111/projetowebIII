const express = require("express");
const routes = express.Router();
const usuarioController = require("../controllers/usuarioController");
const auth = require("../middlewares/usuarioAuth");


routes.get("/usuarios", auth, usuarioController.listar);
routes.post("/usuarios", auth, usuarioController.cadastrarPost);
routes.get("/usuarios/cadastrar/:id?", auth, usuarioController.cadastrarGet);
routes.get("/usuarios/remover/:id",auth, usuarioController.remover);
routes.get("/usuarios/login", usuarioController.loginGet);
routes.get("/usuarios/logout", usuarioController.logout);
//routes.post("/usuarios/login", usuarioController.loginPost);
routes.get("/usuarios/:id", usuarioController.detalhar);

module.exports = routes;

