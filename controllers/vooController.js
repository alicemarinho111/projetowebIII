const VooModel = require("../models/VooModel");

class VooController {

    static async listar(req, res) {
        const status = req.query.s;
        const voos = await VooModel.find();
        res.render("voo/listagem", { voos, status });
    }

    static async cadastrarPost(req, res) {
        if (req.body._id) {
            await VooModel.findOneAndUpdate({ _id: req.body._id }, {
                numerovoo: req.body.numerovoo,
                trajeto: req.body.trajeto,
                partida: req.body.partida
            });
            res.redirect("/voos?s=3");
        } else {
            const novoVoo = new VooModel({
                numerovoo: req.body.numerovoo,
                trajeto: req.body.trajeto,
                partida: req.body.partida
            });
            await novoVoo.save();
            res.redirect("/voos?s=1");
        }
    }

    static async cadastrarGet(req, res) {
        const numerovoo = req.params.numerovoo;
        let voo = {};
        if (numerovoo !== undefined) {
            voo = await VooModel.findOne({ numerovoo });
        }
        res.render("voo/cadastrar", { voo });
    }

    static async detalhar(req, res) {
        const numerovoo = req.params.numerovoo;
        const voo = await VooModel.findOne({ numerovoo });
        res.render("voo/detalhar", { voo });
    }

    static async remover(req, res) {
        const numerovoo = req.params.numerovoo;
        await VooModel.deleteOne({ numerovoo });
        res.redirect("/voos?s=2");
    }

}

module.exports = VooController;
