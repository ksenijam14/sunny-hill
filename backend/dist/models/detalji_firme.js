"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
var Instruktor = new Schema({
    ime_prezime: String,
    drzi_za: Array,
});
let DetaljiFirme = new Schema({
    idF: {
        type: Object
    },
    kor_ime: {
        type: String
    },
    nazivP: {
        type: String
    },
    kategorija: {
        type: String
    },
    popust: {
        type: Number
    },
    ocena: {
        type: Number
    },
    komentari: {
        type: Array
    },
    br_zvezdica: {
        type: Number
    },
    vrste_soba: {
        type: Array
    },
    opremljenost: {
        type: Array
    },
    sobe: {
        type: Array
    },
    relax: {
        type: Boolean
    },
    dodatne_usluge: {
        type: String
    },
    hrana: {
        type: Array
    },
    casovi_za: {
        type: Array
    },
    cena_casa: {
        type: Number
    },
    instruktori: {
        type: [Instruktor]
    },
    oprema: {
        type: Boolean
    },
    cena_opreme: {
        type: Number
    },
    proizvodjaci_opreme: {
        type: Array
    },
    planine: {
        type: Array
    },
    slike: {
        type: Array
    },
    ziro_racuni: {
        type: Array
    },
    rezervacije: {
        type: Array
    }
});
exports.default = mongoose_1.default.model('DetaljiFirme', DetaljiFirme, 'detalji_firme');
//# sourceMappingURL=detalji_firme.js.map