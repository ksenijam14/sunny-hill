"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.KorisnikController = void 0;
const korisnik_1 = __importDefault(require("../models/korisnik"));
const korisnik_2 = __importDefault(require("../models/korisnik"));
class KorisnikController {
    constructor() {
        this.login = (req, res) => {
            console.log('usao u login');
            console.log(req.body);
            korisnik_1.default.findOne({ 'kor_ime': req.body.kor_ime, 'lozinka': req.body.lozinka }, (err, user) => {
                if (err)
                    return res.status(400).json({ 'message': 'error' });
                if (!user) {
                    return res.status(400).json({ 'message': 'Korisnik nije pronađen!' });
                }
                return res.status(200).json(user);
            });
        };
        this.registerBuyer = (req, res) => {
            let kupac = req.body;
            console.log("kupac", kupac);
            const noviKupac = new korisnik_1.default({
                ime_prezime: req.body.ime_prezime,
                kor_ime: req.body.kor_ime,
                lozinka: req.body.lozinka,
                telefon: req.body.telefon,
                email: req.body.email,
                tip: "kupac", //moram da vidim za kupce kako cemo ih praviti
                //vrv cu napraviti posebnu putanju, update: to sam i uradila
            });
            console.log(noviKupac);
            // Korisnik.findOne({'kor_ime': req.body.kor_ime}, (err, user)=>{ //ovo je prethodno bilo ako nece da radi
            korisnik_1.default.findOne({ $or: [{ 'kor_ime': req.body.kor_ime }, { 'email': req.body.email }] }, (err, user) => {
                if (err)
                    return res.status(400).json({ 'message': 'error' });
                if (user) {
                    return res.status(400).json({ 'message': 'Korisnik već postoji!' });
                }
                // korisnik.insertMany(noviKupac, (err2, addedUser) => {
                //     if(err2) return res.status(400).json({'message': 'Greska prilikom registracije!'})
                //     else return res.status(200).json({'message': 'Uspesno poslat zahtev za registraciju!'})
                // })
                korisnik_2.default.insertMany(noviKupac).then(user => {
                    res.status(200).json({ 'message': 'Uspešno ste se registrovali!' });
                }).catch(err => {
                    res.status(400).json({ 'message': 'Greška prilikom registracije!' });
                });
            });
        };
        this.changePass = (req, res) => {
            korisnik_1.default.findOne({ 'kor_ime': req.body.kor_ime }, (err, user) => {
                if (err)
                    return res.status(400).json({ 'message': 'error' });
                if (!user)
                    return res.status(400).json({ 'message': 'Korisnik ne postoji u sistemu!' });
                korisnik_1.default.collection.updateOne({ 'kor_ime': req.body.kor_ime }, { $set: { 'lozinka': req.body.lozinka } });
                res.status(200).json({ 'message': 'Lozinka je uspesno promenjena' });
            });
        };
    }
}
exports.KorisnikController = KorisnikController;
//# sourceMappingURL=korisnik.controller.js.map