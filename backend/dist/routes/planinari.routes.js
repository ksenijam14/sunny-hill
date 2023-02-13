"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.upload = void 0;
const express_1 = __importDefault(require("express"));
const multer_1 = __importDefault(require("multer"));
const planinska_tura_1 = __importDefault(require("../models/planinska_tura"));
const korisnik_1 = __importDefault(require("../models/korisnik"));
const planinari_controller_1 = require("../controllers/planinari.controller");
const planinarRouter = express_1.default.Router();
const storage = multer_1.default.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './ture_slike/');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});
const filter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png')
        cb(null, true);
    else
        cb(null, false);
};
exports.upload = (0, multer_1.default)({ storage: storage, fileFilter: filter });
planinarRouter.use('/ture_slike', express_1.default.static('ture_slike'));
planinarRouter.post('/addNewTour', exports.upload.array('file[]'), (req, res) => {
    let stringyfyFiles = JSON.parse(JSON.stringify(req.files));
    let filePaths = [];
    for (var i = 0; i < stringyfyFiles.length; i++) {
        const path = 'path';
        filePaths.push(stringyfyFiles[i][path]);
    }
    const novaTura = new planinska_tura_1.default({
        idP: req.body.idF,
        kor_ime: req.body.kor_ime,
        nazivP: req.body.nazivP,
        naslov: req.body.naslov,
        opis: req.body.opis,
        program: req.body.program,
        saveti: req.body.saveti,
        cena: req.body.cena,
        ukljuceno: req.body.ukljuceno,
        nije_ukljuceno: req.body.nije_ukljuceno,
        napomene: req.body.napomene,
        lokacija: req.body.lokacija,
        datum_OD: req.body.datum_od,
        datum_DO: req.body.datum_do,
        br_dana: req.body.br_dana,
        hint_reci: req.body.hint_reci,
        slike: filePaths
    });
    korisnik_1.default.findOne({ 'kor_ime': req.body.kor_ime }, (err, user) => {
        if (err)
            return res.status(400).json({ 'message': 'error' });
        if (user) {
            planinska_tura_1.default.insertMany(novaTura).then(user => {
                res.status(200).json({ 'message': 'Uspesno dodata nova planinska tura!' });
            }).catch(err => {
                res.status(400).json({ 'message': 'Greska prilikom dodavanja nove planinske ture!' });
            });
        }
    });
});
planinarRouter.route('/getPlaninskaTura').post((req, res) => new planinari_controller_1.PlaninariController().getPlaninskaTura(req, res));
planinarRouter.route('/detaljiTure').get((req, res) => new planinari_controller_1.PlaninariController().detaljiTure(req, res));
planinarRouter.route('/dohvSvePlanine').get((req, res) => new planinari_controller_1.PlaninariController().dohvSvePlanine(req, res));
planinarRouter.route('/dohvSvePlanineDrzave').post((req, res) => new planinari_controller_1.PlaninariController().dohvSvePlanineDrzave(req, res));
exports.default = planinarRouter;
//# sourceMappingURL=planinari.routes.js.map