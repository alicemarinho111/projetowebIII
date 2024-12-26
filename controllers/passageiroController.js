const PassageiroModel = require("../models/PassageiroModel");

class PassageiroController {

    static async listar(req, res) {
        const status = req.query.s;
        const passageiros = await PassageiroModel.find();
        res.render("passageiro/listagem", { passageiros, status });
    }

    static async cadastrarPost(req, res) {
        if (req.body._id) {
            await PassageiroModel.findOneAndUpdate({ _id: req.body._id }, {
                cpf: req.body.cpf,
                nome: req.body.nome,
                assento: req.body.assento
            });
            res.redirect("/passageiros?s=3");
        } else {
            const novoPassageiro = new PassageiroModel({
                cpf: req.body.cpf,
                nome: req.body.nome,
                assento: req.body.assento
            });
            await novoPassageiro.save();
            res.redirect("/passageiros?s=1");
        }
    }

    static async cadastrarGet(req, res) {
        const cpf = req.params.cpf;
        let passageiro = {};
        if (cpf !== undefined) {
            passageiro = await PassageiroModel.findOne({ cpf });
        }
        res.render("passageiro/cadastrar", { passageiro });
    }

    static async detalhar(req, res) {
        const cpf = req.params.cpf;
        const passageiro = await PassageiroModel.findOne({ cpf });
        res.render("passageiro/detalhar", { passageiro });
    }

    static async remover(req, res) {
        const cpf = req.params.cpf;
        await PassageiroModel.deleteOne({ cpf });
        res.redirect("/passageiros?s=2");
    }

}

module.exports = PassageiroController;
