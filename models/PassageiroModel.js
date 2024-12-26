const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const passageiroSchema = Schema({
    cpf: { type: String, required: true, unique: true },
    nome: { type: String, required: true },
    assento: { type: String, required: true }
});

module.exports = mongoose.model("Passageiro", passageiroSchema);
