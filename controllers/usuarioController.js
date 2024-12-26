const bcryptjs = require("bcryptjs");
const UsuarioModel = require("../models/UsuarioModel");

class UsuarioController{

    static async listar(req, res){
        const status = req.query.s;
        const usuarios = await UsuarioModel.find();
        res.render("usuarios/listagem", {usuarios, status});

    }

    static async cadastrarPost(req, res) {
        const salt = bcryptjs.genSaltSync();
        const hash = bcryptjs.hashSync(req.body.senha, salt);
    
        if (req.body._id) {
            // Atualização de usuário
            const usuarioExistente = await UsuarioModel.findOne({
                email: req.body.email,
                _id: { $ne: req.body._id }, // Garante que não é o mesmo usuário sendo atualizado
            });
    
            if (usuarioExistente) {
                // E-mail já cadastrado
                return res.redirect(`/usuarios/cadastrar/${req.body._id}?s=1`);
            }
    
            await UsuarioModel.findOneAndUpdate(
                { _id: req.body._id },
                {
                    nome: req.body.nome,
                    email: req.body.email,
                    senha: hash,
                }
            );
            res.redirect("/usuarios?s=3"); // Atualizado com sucesso
        } else {
            // Cadastro de novo usuário
            const usuarioExistente = await UsuarioModel.findOne({ email: req.body.email });
    
            if (usuarioExistente) {
                // E-mail já cadastrado
                return res.redirect("/usuarios/cadastrar?s=1");
            }
    
            const novoUsuario = new UsuarioModel({
                nome: req.body.nome,
                email: req.body.email,
                senha: hash,
            });
            await novoUsuario.save();
            res.redirect("/usuarios?s=1"); // Cadastrado com sucesso
        }
    }
    
    
    static async cadastrarGet(req, res){
        const status = req.query.s;
        const id = req.params.id;
        let usuario = {};
        if (id != undefined){
            usuario = await UsuarioModel.findOne({_id: id});
        }

        res.render("usuarios/cadastrar", {usuario, status});
    }
    

    static async detalhar(req, res){
        const id = req.params.id;
        const usuario = await UsuarioModel.findOne({_id: id});
        res.render("usuarios/detalhar", {usuario});
    }

    static async remover(req, res){
        const id = req.params.id;
        await UsuarioModel.deleteOne({_id: id});
        res.redirect("/usuarios?s=2");
    }

    static loginGet(req, res){
        const status = req.query.s;
        res.render("usuarios/login", {status});
    }

    static async loginPost(req, res){
        console.log(req.body);
        const usuario = await UsuarioModel.findOne({
            email: req.body.email
        });
        console.log(usuario);
        if(usuario == null){
            res.redirect("/usuarios/login?s=1");
        }else{
            if (bcryptjs.compareSync(req.body.senha, usuario.senha) == true){
                req.session.usuario = req.body.email;
                res.redirect("/")
            }else{
                res.redirect("/usuarios/login?s=1");
            }
        }
        
    }
    static logout(req,res){
        req.session.usuario = null;
        res.redirect("/usuarios/login");
    }
}
    
module.exports = UsuarioController;