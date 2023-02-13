"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
let Korisnik = new Schema({
    _id: {
        type: Object //pazi na ovo
    },
    ime_prezime: {
        type: String
    },
    kor_ime: {
        type: String
    },
    lozinka: {
        type: String
    },
    telefon: {
        type: String
    },
    email: {
        type: String
    },
    nazivP: {
        type: String
    },
    drzava: {
        type: String
    },
    planina: {
        type: String
    },
    adresaP: {
        type: String
    },
    PIB: {
        type: String
    },
    maticni: {
        type: String
    },
    status: {
        type: String
    },
    slika: {
        type: String
    },
    tip: {
        type: String
    },
    kategorija: {
        type: String //popunjeno samo za firme, nece se navesti pri inicijalnoj registraciji, vec kasnije
    }
});
exports.default = mongoose_1.default.model('Korisnik', Korisnik, 'korisnik');
//# sourceMappingURL=korisnik.js.map