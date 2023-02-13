"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminController = void 0;
const korisnik_1 = __importDefault(require("../models/korisnik"));
const mongodb_1 = require("mongodb");
class AdminController {
    constructor() {
        this.getAllCompanies = (req, res) => {
            console.log('usao u admin_get_all_companies');
            //hocu da dohvatim sve korisnike ciji je tip preduzece tj, prodavnica ili ugostitelj i da radim onda sa njima na frontu
            korisnik_1.default.find({ $or: [{ 'tip': "firma" }, { 'tip': "hotel" }, { 'tip': "apartman" }, { 'tip': "planinari" }, { 'tip': "ski_skola" }] }, (err, firma) => {
                if (err)
                    return res.status(400).json({ 'message': 'error' });
                if (!firma) {
                    return res.status(400).json({ 'message': 'U bazi ne postoje registrovana preduzeca1' });
                }
                return res.status(200).json(firma);
            });
        };
        this.activateCompany = (req, res) => {
            let idP = req.body.idP;
            console.log(idP);
            let o_id = new mongodb_1.ObjectId(idP); // id as a string is passed
            console.log(o_id);
            korisnik_1.default.findOne({ "_id": o_id }, (err, preduzece) => {
                if (err)
                    console.log(err);
                else {
                    if (preduzece) {
                        console.log("pronasao preduzece");
                        korisnik_1.default.collection.updateOne({ '_id': o_id }, { $set: { 'status': 'aktivan' } });
                        res.status(200).json({ 'message': 'Aktiviran nalog' });
                    }
                    else {
                        res.status(400).json({ 'message': 'error no user' });
                    }
                }
            });
        };
        this.deactivateCompany = (req, res) => {
            let idP = req.body.idP;
            console.log(idP);
            let o_id = new mongodb_1.ObjectId(idP); // id as a string is passed
            console.log(o_id);
            korisnik_1.default.findOne({ "_id": o_id }, (err, preduzece) => {
                if (err)
                    console.log(err);
                else {
                    if (preduzece) {
                        console.log("pronasao preduzece");
                        korisnik_1.default.collection.updateOne({ '_id': o_id }, { $set: { 'status': 'neaktivan' } });
                        res.status(200).json({ 'message': 'Deaktiviran nalog' });
                    }
                    else {
                        res.status(400).json({ 'message': 'error no user' });
                    }
                }
            });
        };
    }
}
exports.AdminController = AdminController;
//# sourceMappingURL=admin.controller.js.map