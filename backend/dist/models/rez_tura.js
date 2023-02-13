"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
var Rezervacija = new Schema({
    klijent: String,
    br_mesta: Number,
    br_tel: String,
    email: String,
    dodatni_info: String,
    status: String
});
let RezTura = new Schema({
    idPlan: {
        type: String
    },
    naslov: {
        type: String
    },
    rezervacije: {
        type: [Rezervacija]
    },
    idTure: {
        type: String
    }
});
exports.default = mongoose_1.default.model('RezTura', RezTura, 'rez_tura');
//# sourceMappingURL=rez_tura.js.map