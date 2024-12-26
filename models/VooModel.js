const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const vooSchema = Schema({
    numerovoo: { type: String, required: true, unique: true },
    trajeto: { type: String, required: true },
    partida: { type: Date, required: true }
});

module.exports = mongoose.model("Voo", vooSchema);
