"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
var Rezervacija = new Schema({
    datum: Date,
    vreme: String,
    renta_opreme: Boolean,
    status: String,
    klijent: String
});
let RezSkijanja = new Schema({
    id_instruktora: {
        type: String
    },
    kor_ime: {
        type: String
    },
    rezervacije: {
        type: [Rezervacija]
    },
    idSkole: {
        type: String
    }
});
exports.default = mongoose_1.default.model('RezSkijanja', RezSkijanja, 'rez_ski');
//# sourceMappingURL=rez_ski.js.map