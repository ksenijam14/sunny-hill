"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlaninariController = void 0;
const planinska_tura_1 = __importDefault(require("../models/planinska_tura"));
const planina_1 = __importDefault(require("../models/planina"));
class PlaninariController {
    constructor() {
        this.getPlaninskaTura = (req, res) => {
            let idP = req.body.idP;
            console.log(idP);
            planinska_tura_1.default.find({ "idP": idP }, (err, preduzece) => {
                if (err)
                    console.log(err);
                else {
                    if (preduzece) {
                        res.status(200).json(preduzece);
                    }
                    else {
                        res.status(400).json({ 'message': 'U bazi ne postoje podaci o planinskim turama drustva' });
                    }
                }
            });
        };
        this.detaljiTure = (req, res) => {
            let idT = req.query.idTure;
            console.log(idT);
            planinska_tura_1.default.findOne({ "_id": idT }, (err, tura) => {
                if (err)
                    console.log(err);
                else {
                    if (tura) {
                        console.log("pronasao turu");
                        res.status(200).json(tura);
                    }
                    else {
                        res.status(400).json({ 'message': 'U bazi ne postoji tura sa tim id-em' });
                    }
                }
            });
        };
        this.dohvSvePlanine = (req, res) => {
            planina_1.default.find({}, (err, tura) => {
                if (err)
                    console.log(err);
                else {
                    if (tura) {
                        console.log("pronasao planine");
                        res.status(200).json(tura);
                    }
                    else {
                        res.status(400).json({ 'message': 'U bazi ne postoje planine' });
                    }
                }
            });
        };
        this.dohvSvePlanineDrzave = (req, res) => {
            planina_1.default.findOne({ 'drzava': req.body.drzava }, (err, tura) => {
                if (err)
                    console.log(err);
                else {
                    if (tura) {
                        console.log("pronasao planine");
                        res.status(200).json(tura);
                    }
                    else {
                        res.status(400).json({ 'message': 'U bazi ne postoje planine za tu drzavu' });
                    }
                }
            });
        };
    }
}
exports.PlaninariController = PlaninariController;
//# sourceMappingURL=planinari.controller.js.map