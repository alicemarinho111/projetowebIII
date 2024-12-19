const bcryptjs = require("bcryptjs");
const UsuarioModel = require("../models/UsuarioModel");

class UsuarioController {

    
    static async listar(req, res) {
        const status = req.query.s;
        const usuarios = await UsuarioModel.find();
        res.render("usuario/listagem", { usuarios, status });
    }

    static async cadastrarPost(req, res) {
        if (req.body._id) {
            await UsuarioModel.findOneAndUpdate({ _id: req.body._id }, {
                nome: req.body.nome,
                email: req.body.email,
                senha: req.body.senha
            });
            res.redirect("/usuarios?s=3");
        } else {

            const salt = bcryptjs.genSaltSync();  
            const hash = bcryptjs.hashSync(req.body.senha, salt);  

            const novoUsuario = new UsuarioModel({
                nome: req.body.nome,
                email: req.body.email,
                senha: req.body.senha
            });
            await novoUsuario.save();
            res.redirect("/usuarios?s=1");
        }
    }
    
    static async cadastrarGet(req, res) {
        const id = req.params.id;
        let usuario = {};
        if (id != undefined) {
            usuario = await UsuarioModel.findOne({ _id: id });
        } 
        console.log(usuario);
        res.render("usuario/cadastrar", { usuario });
    }

    
    static async detalhar(req, res) {
        const id = req.params.id;
        const usuario = await UsuarioModel.findOne({ _id: id });  
        res.render("usuario/detalhar", { usuario });
    }

    
    static async remover(req, res) {
        const id = req.params.id;
        await UsuarioModel.deleteOne({ _id: id });
        res.redirect("/usuarios?s=2");
    }

  
    static loginGet(req, res) {
        res.render("usuarios/login");
    }


    static async loginPost(req, res) {
        const usuario = await UsuarioModel.findOne({
            email: req.body.email  
        });  
        if (usuario == null) {
            res.redirect("/usuarios/login");  
        } else {
            if (bcryptjs.compareSync(req.body.senha, usuario.senha)) {
                res.redirect("/");  
            } else {
                res.redirect("/usuarios/login");  
            }
        }
    }

    static logout(req, res){
        req.session.usuario = null;
        req.redirect("/usuarios/login");
    }
}

module.exports = UsuarioController;