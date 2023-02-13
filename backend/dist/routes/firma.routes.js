"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.upload = void 0;
const express_1 = __importDefault(require("express"));
const multer_1 = __importDefault(require("multer"));
const firma_controller_1 = require("../controllers/firma.controller");
const detalji_firme_1 = __importDefault(require("../models/detalji_firme"));
const korisnik_1 = __importDefault(require("../models/korisnik"));
const firmaRouter = express_1.default.Router();
const storage = multer_1.default.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './ponuda_slike/');
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
firmaRouter.use('/ponuda_slike', express_1.default.static('ponuda_slike'));
///---------dodavanje podataka za hotele i apartmane----///
firmaRouter.post('/addDataSmestaj', exports.upload.array('file[]'), (req, res) => {
    console.log("podaciHotel", req.body);
    const detaljiP = new detalji_firme_1.default({
        idF: req.body.idF,
        kor_ime: req.body.kor_ime,
        nazivP: req.body.nazivP,
        kategorija: req.body.form.kategorija,
        br_zvezdica: req.body.form.br_zvezdica,
        vrste_soba: req.body.form.vrste_soba,
        opremljenost: req.body.form.opremljenost,
        hrana: req.body.form.hrana,
        sobe: req.body.form.soba,
        dodatne_usluge: req.body.form.dodatno,
        relax: req.body.form.relax,
        ziro_racuni: req.body.form.ziro_racun_h,
        popust: 0,
        ocena: 0,
    });
    korisnik_1.default.findOne({ 'kor_ime': req.body.kor_ime }, (err, user) => {
        if (err)
            return res.status(400).json({ 'message': 'error' });
        if (user) {
            korisnik_1.default.collection.updateOne({ 'kor_ime': req.body.kor_ime }, { $set: { 'tip': req.body.form.kategorija } });
            detalji_firme_1.default.insertMany(detaljiP).then(user => {
                res.status(200).json({ 'message': 'Uspesno dodati podaci!' });
            }).catch(err => {
                res.status(400).json({ 'message': 'Greska prilikom dodavanja detalja preduzeca!' });
            });
        }
    });
});
///----------- dodavanje podataka za ski skole -----------///
firmaRouter.post('/addDataSkiSkola', (req, res) => {
    // console.log("podaciSki", req.body);
    // let stringyfyFiles : string = JSON.parse(JSON.stringify(req.body.files));
    // console.log("stringifyFiles", stringyfyFiles);
    // console.log("bodyFiles", req.files);
    // let filePaths : string[] = [];
    // for (var i = 0; i < stringyfyFiles.length; i++) {
    //     const path : any = 'path';
    //     filePaths.push(stringyfyFiles[i][path]);
    // }
    // form: form,
    // formFiles: slike
    const detaljiP = new detalji_firme_1.default({
        idF: req.body.idF,
        kor_ime: req.body.kor_ime,
        nazivP: req.body.nazivP,
        casovi_za: req.body.form.casovi_za,
        cena_casa: req.body.form.cena_casa,
        instruktori: req.body.form.instruktor,
        oprema: req.body.form.oprema,
        cena_opreme: req.body.form.cena_opreme,
        ziro_racuni: req.body.form.ziro_racun_s,
        popust: 0,
        ocena: 0,
        // proizvodjaci_opreme: req.body.proizvodjaci,
        // slike: filePaths
    });
    korisnik_1.default.findOne({ 'kor_ime': req.body.kor_ime }, (err, user) => {
        if (err)
            return res.status(400).json({ 'message': 'error' });
        if (user) {
            korisnik_1.default.collection.updateOne({ 'kor_ime': req.body.kor_ime }, { $set: { 'tip': 'ski_skola' } });
            detalji_firme_1.default.insertMany(detaljiP).then(user => {
                res.status(200).json({ 'message': 'Uspesno dodati podaci!' });
            }).catch(err => {
                res.status(400).json({ 'message': 'Greska prilikom dodavanja detalja preduzeca!' });
            });
        }
    });
    // detaljiFirme.insertMany(detaljiP).then(user=>{
    //     res.status(200).json({'message': 'Uspesno dodati podaci!'})
    // }).catch(err=>{
    //     res.status(400).json({'message': 'Greska prilikom dodavanja detalja preduzeca!'})
    // })
});
firmaRouter.post('/addImages', exports.upload.array('file[]'), (req, res) => {
    let stringyfyFiles = JSON.parse(JSON.stringify(req.files));
    console.log("stringifyFiles", stringyfyFiles);
    console.log("bodyFiles", req.files);
    console.log("kor_ime", req.body.kor_ime);
    let filePaths = [];
    for (var i = 0; i < stringyfyFiles.length; i++) {
        const path = 'path';
        filePaths.push(stringyfyFiles[i][path]);
    }
    console.log("filePath", filePaths);
    // const detaljiP = new detaljiFirme({
    //     slike: filePaths
    // });
    korisnik_1.default.findOne({ 'kor_ime': req.body.kor_ime }, (err, user) => {
        if (err)
            return res.status(400).json({ 'message': 'error' });
        if (user) {
            console.log("nasao usera");
            detalji_firme_1.default.updateOne({ 'kor_ime': req.body.kor_ime }, {
                'slike': filePaths
            }, (err, updatedUser) => {
                if (err)
                    return console.log(err);
                else
                    res.status(200).json({ 'message': 'Uspesno dodate slike!' });
            });
            //detaljiFirme.collection.updateOne({'kor_ime':req.body.kor_ime}, {$set:{'slike': filePaths}});
            // detaljiFirme.insertMany(detaljiP).then(user=>{
            //     res.status(200).json({'message': 'Uspesno dodati podaci!'})
            // }).catch(err=>{
            //     res.status(400).json({'message': 'Greska prilikom dodavanja detalja preduzeca!'})
            // })
        }
    });
    // detaljiFirme.insertMany(detaljiP).then(user=>{
    //     res.status(200).json({'message': 'Uspesno dodate slike!'})
    // }).catch(err=>{
    //     res.status(400).json({'message': 'Greska prilikom dodavanja slika ponude!'})
    // })
});
firmaRouter.route('/addDataPlaninari').post((req, res) => new firma_controller_1.FirmaController().dodajPodatkePlaninari(req, res));
firmaRouter.route('/getAllUsers').get((req, res) => new firma_controller_1.FirmaController().getAllUsers(req, res));
firmaRouter.route('/getDetaljiFirme').post((req, res) => new firma_controller_1.FirmaController().getDetaljiFirme(req, res));
firmaRouter.route('/getDetaljiFirmeById').post((req, res) => new firma_controller_1.FirmaController().getDetaljiFirmeById(req, res));
firmaRouter.route('/getFirmaOsnovno').post((req, res) => new firma_controller_1.FirmaController().getFirmaOsnovno(req, res));
firmaRouter.route('/getAllSki').get((req, res) => new firma_controller_1.FirmaController().getAllSki(req, res));
firmaRouter.route('/detaljiSkole').get((req, res) => new firma_controller_1.FirmaController().detaljiSkole(req, res));
firmaRouter.route('/rezSkiCas').post((req, res) => new firma_controller_1.FirmaController().rezSkiCas(req, res));
firmaRouter.route('/prihvatiRezSki').post((req, res) => new firma_controller_1.FirmaController().prihvatiRezSki(req, res));
firmaRouter.route('/odbijRezSki').post((req, res) => new firma_controller_1.FirmaController().odbijRezSki(req, res));
firmaRouter.route('/dohvRezervacije').post((req, res) => new firma_controller_1.FirmaController().dohvRezervacije(req, res));
firmaRouter.route('/dohvRezervacijeSkole').post((req, res) => new firma_controller_1.FirmaController().dohvRezervacijeSkole(req, res));
firmaRouter.route('/getAllPlaninari').get((req, res) => new firma_controller_1.FirmaController().getAllPlaninari(req, res));
firmaRouter.route('/getAllPlanAndDet').get((req, res) => new firma_controller_1.FirmaController().getAllPlanAndDet(req, res));
firmaRouter.route('/detaljiPlanTure').get((req, res) => new firma_controller_1.FirmaController().detaljiPlanTure(req, res));
firmaRouter.route('/rezPlanTura').post((req, res) => new firma_controller_1.FirmaController().rezPlanTura(req, res));
firmaRouter.route('/dohvRezervacijePlan').post((req, res) => new firma_controller_1.FirmaController().dohvRezervacijePlan(req, res));
firmaRouter.route('/prihvatiRezTura').post((req, res) => new firma_controller_1.FirmaController().prihvatiRezTura(req, res));
firmaRouter.route('/odbijRezTura').post((req, res) => new firma_controller_1.FirmaController().odbijRezTura(req, res));
firmaRouter.route('/dohvSvePlanTura').post((req, res) => new firma_controller_1.FirmaController().dohvSvePlanTura(req, res));
firmaRouter.route('/dohvSveSmestaje').get((req, res) => new firma_controller_1.FirmaController().dohvSveSmestaje(req, res));
firmaRouter.route('/detaljiSmestaja').get((req, res) => new firma_controller_1.FirmaController().detaljiSmestaja(req, res));
firmaRouter.route('/rezSmestaj').post((req, res) => new firma_controller_1.FirmaController().rezSmestaj(req, res));
firmaRouter.route('/prihvatiRezSmestaj').post((req, res) => new firma_controller_1.FirmaController().prihvatiRezSmestaj(req, res));
firmaRouter.route('/odbijRezSmestaj').post((req, res) => new firma_controller_1.FirmaController().odbijRezSmestaj(req, res));
firmaRouter.route('/editPopust').post((req, res) => new firma_controller_1.FirmaController().editPopust(req, res));
firmaRouter.route('/searchRezSkiByKor').post((req, res) => new firma_controller_1.FirmaController().searchRezSkiByKor(req, res));
firmaRouter.route('/searchRezSmByKor').post((req, res) => new firma_controller_1.FirmaController().searchRezSmByKor(req, res));
firmaRouter.route('/searchRezPlanByKor').post((req, res) => new firma_controller_1.FirmaController().searchRezPlanByKor(req, res));
firmaRouter.route('/getAllDetaljiFirme').get((req, res) => new firma_controller_1.FirmaController().getAllDetaljiFirme(req, res));
firmaRouter.route('/getAllPlanTure').get((req, res) => new firma_controller_1.FirmaController().getAllPlanTure(req, res));
firmaRouter.route('/addComment').post((req, res) => new firma_controller_1.FirmaController().addComment(req, res));
firmaRouter.route('/updateOcena').post((req, res) => new firma_controller_1.FirmaController().updateOcena(req, res));
exports.default = firmaRouter;
//# sourceMappingURL=firma.routes.js.map