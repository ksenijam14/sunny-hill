"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
let Planina = new Schema({
    _id: {
        type: Object
    },
    drzava: {
        type: String
    },
    planine: {
        type: Array
    }
});
exports.default = mongoose_1.default.model('Planina', Planina, 'planina');
//# sourceMappingURL=planina.js.map