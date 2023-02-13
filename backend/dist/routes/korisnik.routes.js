"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.upload = void 0;
const express_1 = __importDefault(require("express"));
const multer_1 = __importDefault(require("multer"));
const korisnik_1 = __importDefault(require("../models/korisnik"));
const korisnik_controller_1 = require("../controllers/korisnik.controller");
const korisnik_2 = __importDefault(require("../models/korisnik"));
const userRouter = express_1.default.Router();
userRouter.route('/login').post((req, res) => new korisnik_controller_1.KorisnikController().login(req, res));
const storage = multer_1.default.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './grb_slike/');
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
userRouter.use('/grb_slike', express_1.default.static('grb_slike'));
userRouter.post('/register', exports.upload.single('slika'), (req, res) => {
    //pazi upload.single('slika'), ovo 'slika' mora da bude name od input polja!!!
    console.log("usao");
    let imagepath = req.file.path;
    console.log("image path", imagepath); //to treba da stoji u bazi
    let preduzece = req.file;
    console.log("preduzece", preduzece);
    const noviKorisnik = new korisnik_1.default({
        ime_prezime: req.body.ime_prezime,
        kor_ime: req.body.kor_ime,
        lozinka: req.body.lozinka,
        telefon: req.body.telefon,
        email: req.body.email,
        nazivP: req.body.nazivP,
        drzava: req.body.drzava,
        planina: req.body.planina,
        adresaP: req.body.adresaP,
        PIB: req.body.PIB,
        maticni: req.body.maticni,
        slika: imagepath,
        status: "kreiran",
        tip: "firma" //moram da vidim za kupce kako cemo ih praviti
        //vrv cu napraviti posebnu putanju, update: to sam i uradila
    });
    korisnik_1.default.findOne({ $or: [{ 'kor_ime': req.body.kor_ime }, { 'email': req.body.email }] }, (err, user) => {
        if (err)
            return res.status(400).json({ 'message': 'error' });
        if (user) {
            return res.status(400).json({ 'message': 'Postoji već korisnik sa tim korisničkim imenom ili mejlom' });
        }
        // korisnik.insertMany(noviKorisnik, (err2, addedUser) => {
        //     if(err2) return res.status(400).json({'message': 'Greska prilikom registracije!'})
        //     else return res.status(200).json({'message': 'Uspesno poslat zahtev za registraciju!'})
        // })
        korisnik_2.default.insertMany(noviKorisnik).then(user => {
            res.status(200).json({ 'message': 'Uspešno poslat zahtev za registraciju!' });
        }).catch(err => {
            res.status(400).json({ 'message': 'Greška prilikom registracije!' });
        });
    });
});
userRouter.route('/registerBuyer').post((req, res) => new korisnik_controller_1.KorisnikController().registerBuyer(req, res));
userRouter.route('/changePass').post((req, res) => new korisnik_controller_1.KorisnikController().changePass(req, res));
exports.default = userRouter;
//# sourceMappingURL=korisnik.routes.js.map