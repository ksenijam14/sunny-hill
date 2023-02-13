"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
let PlaninskaTura = new Schema({
    idP: {
        type: String
    },
    kor_ime: {
        type: String
    },
    nazivP: {
        type: String
    },
    naslov: {
        type: String
    },
    opis: {
        type: String
    },
    program: {
        type: String
    },
    saveti: {
        type: String
    },
    cena: {
        type: Number
    },
    ukljuceno: {
        type: String
    },
    nije_ukljuceno: {
        type: String
    },
    napomene: {
        type: String
    },
    lokacija: {
        type: String
    },
    datum_OD: {
        type: Date
    },
    datum_DO: {
        type: Date
    },
    br_dana: {
        type: Number
    },
    hint_reci: {
        type: String
    },
    slike: {
        type: Array
    }
});
exports.default = mongoose_1.default.model('PlaninskaTura', PlaninskaTura, 'planinska_tura');
//# sourceMappingURL=planinska_tura.js.map