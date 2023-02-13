"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FirmaController = void 0;
const detalji_firme_1 = __importDefault(require("../models/detalji_firme"));
const korisnik_1 = __importDefault(require("../models/korisnik"));
const detalji_firme_2 = __importDefault(require("../models/detalji_firme"));
const rez_ski_1 = __importDefault(require("../models/rez_ski"));
const rez_tura_1 = __importDefault(require("../models/rez_tura"));
const mongodb_1 = require("mongodb");
const planinska_tura_1 = __importDefault(require("../models/planinska_tura"));
class FirmaController {
    constructor() {
        this.dodajPodatkePlaninari = (req, res) => {
            let detalji = req.body;
            console.log('detalji', detalji);
            const detaljiP = new detalji_firme_1.default({
                idF: req.body.idF,
                kor_ime: req.body.kor_ime,
                nazivP: req.body.nazivP,
                planine: req.body.form.planine,
                ziro_racuni: req.body.form.ziro_racun_p,
                popust: 0,
                ocena: 0,
            });
            korisnik_1.default.findOne({ 'kor_ime': req.body.kor_ime }, (err, user) => {
                if (err)
                    return res.status(400).json({ 'message': 'error' });
                if (user) {
                    korisnik_1.default.collection.updateOne({ 'kor_ime': req.body.kor_ime }, { $set: { 'tip': "planinari" } });
                    detalji_firme_1.default.insertMany(detaljiP).then(user => {
                        res.status(200).json({ 'message': 'Uspesno dodati podaci!' });
                    }).catch(err => {
                        res.status(400).json({ 'message': 'Greska prilikom dodavanja detalja preduzeca!' });
                    });
                }
            });
        };
        this.getAllUsers = (req, res) => {
            korisnik_1.default.find({}, (err, user) => {
                if (err)
                    return res.status(400).json({ 'message': 'error' });
                if (!user) {
                    return res.status(400).json({ 'message': 'U bazi nema korisnika' });
                }
                return res.status(200).json(user);
            });
        };
        this.getAllDetaljiFirme = (req, res) => {
            //vraca detalje svih firmi
            detalji_firme_2.default.find({}, (err, detalji) => {
                if (err)
                    return res.status(400).json({ 'message': 'error' });
                if (!detalji) {
                    return res.status(400).json({ 'message': 'U bazi ne postoje detalji firmi' });
                }
                console.log(detalji);
                return res.status(200).json(detalji);
            });
        };
        this.getDetaljiFirme = (req, res) => {
            let kor_ime = req.body.kor_ime;
            detalji_firme_2.default.findOne({ 'kor_ime': kor_ime }, (err, detalji) => {
                if (err)
                    return res.status(400).json({ 'message': 'error' });
                if (!detalji) {
                    return res.status(400).json({ 'message': 'U bazi ne postoje detalji date firme' });
                }
                console.log(detalji);
                return res.status(200).json(detalji);
            });
        };
        this.getDetaljiFirmeById = (req, res) => {
            let idF = req.body.idF;
            detalji_firme_2.default.findOne({ 'idF': idF }, (err, detalji) => {
                if (err)
                    return res.status(400).json({ 'message': 'error' });
                if (!detalji) {
                    return res.status(400).json({ 'message': 'U bazi ne postoje detalji date firme' });
                }
                console.log(detalji);
                return res.status(200).json(detalji);
            });
        };
        this.getFirmaOsnovno = (req, res) => {
            let idP = req.body.idP;
            console.log(idP);
            let o_id = new mongodb_1.ObjectId(idP); // id as a string is passed
            console.log(o_id);
            korisnik_1.default.findOne({ "_id": o_id }, (err, preduzece) => {
                if (err)
                    console.log(err);
                else {
                    if (preduzece) {
                        res.status(200).json(preduzece);
                    }
                    else {
                        res.status(400).json({ 'message': 'U bazi ne postoje osnovni podaci date firme' });
                    }
                }
            });
        };
        this.getAllSki = (req, res) => {
            korisnik_1.default.aggregate([
                {
                    $match: {
                        tip: "ski_skola",
                        status: "aktivan"
                    }
                },
                {
                    $lookup: {
                        from: "detalji_firme",
                        localField: "kor_ime",
                        foreignField: "kor_ime",
                        as: "detalji_skole"
                    }
                }
            ], (err, nadjeno) => {
                if (err)
                    console.log(err);
                else {
                    if (nadjeno) {
                        res.status(200).json(nadjeno);
                    }
                    else {
                        res.status(400).json({ 'message': 'U bazi trenutno ne postoje ski skole' });
                    }
                }
            });
        };
        this.detaljiSkole = (req, res) => {
            korisnik_1.default.aggregate([
                {
                    $match: {
                        _id: new mongodb_1.ObjectId(req.query.idSkole.toString())
                    }
                },
                {
                    $lookup: {
                        from: "detalji_firme",
                        localField: "kor_ime",
                        foreignField: "kor_ime",
                        as: "detalji_skole"
                    }
                }
            ], (err, nadjeno) => {
                if (err)
                    console.log(err);
                else {
                    if (nadjeno) {
                        console.log(nadjeno);
                        res.status(200).json(nadjeno);
                    }
                    else {
                        res.status(400).json({ 'message': 'U bazi trenutno ne postoje podaci o toj skoli' });
                    }
                }
            });
        };
        this.rezSkiCas = (req, res) => {
            let detalji = req.body;
            console.log('detalji', detalji);
            const rezervacija = new rez_ski_1.default({
                idSkole: req.body.idSkole,
                id_instruktora: req.body.form.instruktor,
                rezervacije: req.body.form,
            });
            const rezUpdate = new rez_ski_1.default({
                rezervacije: req.body.form,
            });
            console.log("update", rezUpdate);
            rez_ski_1.default.findOne({ 'id_instruktora': req.body.form.instruktor, 'idSkole': req.body.idSkole }, (err, user) => {
                if (err)
                    return res.status(400).json({ 'message': 'error' });
                if (user) {
                    console.log("usao");
                    rez_ski_1.default.updateOne({ 'id_instruktora': req.body.form.instruktor, 'idSkole': req.body.idSkole }, { $push: { 'rezervacije': rezUpdate.rezervacije } }).then(user => {
                        res.status(200).json({ 'message': 'Uspesno azurirani podaci!' });
                    }).catch(err => {
                        res.status(400).json({ 'message': 'Greska prilikom azuriranja rezervacija!' });
                    });
                }
                else {
                    rez_ski_1.default.insertMany(rezervacija).then(user => {
                        res.status(200).json({ 'message': 'Uspesno dodati podaci!' });
                    }).catch(err => {
                        res.status(400).json({ 'message': 'Greska prilikom dodavanja rezervacije!' });
                    });
                }
            });
        };
        this.prihvatiRezSki = (req, res) => {
            let idRez = req.body.idRez;
            let o_id = new mongodb_1.ObjectId(idRez); // id as a string is passed
            console.log(o_id);
            rez_ski_1.default.findOne({ 'rezervacije._id': o_id }, (err, detalji) => {
                if (err)
                    return res.status(400).json({ 'message': 'error' });
                if (detalji) {
                    console.log("nadjeno");
                    rez_ski_1.default.collection.updateOne({ 'rezervacije._id': o_id }, { $set: { 'rezervacije.$.status': "odobrena" } });
                    return res.status(200).json({ 'message': 'Uspesno prihvacena rezervacija!' });
                }
                return res.status(400).json({ 'message': 'Nisu pronadjeni detalji o preduzecu!' });
            });
        };
        this.odbijRezSki = (req, res) => {
            let idRez = req.body.idRez;
            let o_id = new mongodb_1.ObjectId(idRez); // id as a string is passed
            console.log(o_id);
            rez_ski_1.default.findOne({ 'rezervacije._id': o_id }, (err, detalji) => {
                if (err)
                    return res.status(400).json({ 'message': 'error' });
                if (detalji) {
                    console.log("nadjeno");
                    rez_ski_1.default.collection.updateOne({ 'rezervacije._id': o_id }, { $set: { 'rezervacije.$.status': "odbijena" } });
                    return res.status(200).json({ 'message': 'Uspesno odbijena rezervacija!' });
                }
                return res.status(400).json({ 'message': 'Nisu pronadjeni detalji o preduzecu!' });
            });
        };
        this.dohvRezervacije = (req, res) => {
            console.log("body rez", req.body);
            rez_ski_1.default.find({ 'id_instruktora': req.body.id_instruktora, 'rezervacije.datum': req.body.datum }, (err, rez) => {
                if (err)
                    return res.status(400).json({ 'message': 'error' });
                if (rez) {
                    console.log(rez);
                    res.status(200).json(rez);
                }
                else {
                    res.status(200).json({ 'message': 'Nema u bazi' });
                }
            });
        };
        this.dohvRezervacijeSkole = (req, res) => {
            console.log("body rez", req.body);
            rez_ski_1.default.find({ 'idSkole': req.body.idSkole }, (err, rez) => {
                if (err)
                    return res.status(400).json({ 'message': 'error' });
                if (rez) {
                    console.log(rez);
                    res.status(200).json(rez);
                }
                else {
                    res.status(200).json({ 'message': 'Nema rezervacija' });
                }
            });
        };
        this.getAllPlanTure = (req, res) => {
            //vraca detalje svih tura
            planinska_tura_1.default.find({}, (err, detalji) => {
                if (err)
                    return res.status(400).json({ 'message': 'error' });
                if (!detalji) {
                    return res.status(400).json({ 'message': 'U bazi ne postoje detalji firmi' });
                }
                console.log(detalji);
                return res.status(200).json(detalji);
            });
        };
        this.getAllPlaninari = (req, res) => {
            korisnik_1.default.aggregate([
                {
                    $match: {
                        tip: "planinari",
                        status: "aktivan"
                    }
                },
                {
                    $lookup: {
                        from: "planinska_tura",
                        localField: "kor_ime",
                        foreignField: "kor_ime",
                        as: "detalji_tura"
                    }
                }
            ], (err, nadjeno) => {
                if (err)
                    console.log(err);
                else {
                    if (nadjeno) {
                        res.status(200).json(nadjeno);
                    }
                    else {
                        res.status(400).json({ 'message': 'U bazi trenutno ne postoje planinarska drustva' });
                    }
                }
            });
        };
        this.getAllPlanAndDet = (req, res) => {
            korisnik_1.default.aggregate([
                {
                    $match: {
                        tip: "planinari",
                        status: "aktivan"
                    }
                },
                {
                    $lookup: {
                        from: "planinska_tura",
                        localField: "kor_ime",
                        foreignField: "kor_ime",
                        as: "detalji_tura"
                    }
                },
                { $unwind: "$detalji_tura" },
                // Join with detalji_firme table
                {
                    $lookup: {
                        from: "detalji_firme",
                        localField: "kor_ime",
                        foreignField: "kor_ime",
                        as: "detaljiFirme"
                    }
                },
            ], (err, nadjeno) => {
                if (err)
                    console.log(err);
                else {
                    if (nadjeno) {
                        res.status(200).json(nadjeno);
                    }
                    else {
                        res.status(400).json({ 'message': 'U bazi trenutno ne postoje planinarska drustva' });
                    }
                }
            });
        };
        this.detaljiPlanTure = (req, res) => {
            korisnik_1.default.aggregate([
                {
                    $match: {
                        _id: new mongodb_1.ObjectId(req.query.idSkole.toString())
                    }
                },
                {
                    $lookup: {
                        from: "detalji_firme",
                        localField: "kor_ime",
                        foreignField: "kor_ime",
                        as: "detalji_skole"
                    }
                }
            ], (err, nadjeno) => {
                if (err)
                    console.log(err);
                else {
                    if (nadjeno) {
                        console.log(nadjeno);
                        res.status(200).json(nadjeno);
                    }
                    else {
                        res.status(400).json({ 'message': 'U bazi trenutno ne postoje podaci o tom planinarskom drustvu' });
                    }
                }
            });
        };
        this.rezPlanTura = (req, res) => {
            let detalji = req.body;
            console.log('detalji', detalji);
            console.log('idTure', req.body.idTure);
            const rezervacija = new rez_tura_1.default({
                idTure: req.body.idTure,
                idPlan: req.body.form.idPlan,
                rezervacije: req.body.form,
            });
            const rezUpdate = new rez_tura_1.default({
                rezervacije: req.body.form,
            });
            console.log("update", rezUpdate);
            rez_tura_1.default.findOne({ 'idTure': req.body.idTure }, (err, user) => {
                if (err)
                    return res.status(400).json({ 'message': 'error' });
                if (user) {
                    console.log("usao");
                    rez_tura_1.default.updateOne({ 'idTure': req.body.idTure }, { $push: { 'rezervacije': rezUpdate.rezervacije } }).then(user => {
                        res.status(200).json({ 'message': 'Uspesno azurirani podaci!' });
                    }).catch(err => {
                        res.status(400).json({ 'message': 'Greska prilikom azuriranja rezervacija!' });
                    });
                }
                else {
                    rez_tura_1.default.insertMany(rezervacija).then(user => {
                        res.status(200).json({ 'message': 'Uspesno dodati podaci!' });
                    }).catch(err => {
                        res.status(400).json({ 'message': 'Greska prilikom dodavanja rezervacije!' });
                    });
                }
            });
        };
        this.dohvRezervacijePlan = (req, res) => {
            console.log("body rez", req.body);
            rez_tura_1.default.find({ 'idPlan': req.body.idPlan }, (err, rez) => {
                if (err)
                    return res.status(400).json({ 'message': 'error' });
                if (rez) {
                    console.log(rez);
                    res.status(200).json(rez);
                }
                else {
                    res.status(200).json({ 'message': 'Nema rezervacija' });
                }
            });
        };
        this.prihvatiRezTura = (req, res) => {
            let idRez = req.body.idRez;
            let o_id = new mongodb_1.ObjectId(idRez); // id as a string is passed
            console.log(o_id);
            rez_tura_1.default.findOne({ 'rezervacije._id': o_id }, (err, detalji) => {
                if (err)
                    return res.status(400).json({ 'message': 'error' });
                if (detalji) {
                    console.log("nadjeno");
                    rez_tura_1.default.collection.updateOne({ 'rezervacije._id': o_id }, { $set: { 'rezervacije.$.status': "odobrena" } });
                    return res.status(200).json({ 'message': 'Uspesno prihvacena rezervacija!' });
                }
                return res.status(400).json({ 'message': 'Nisu pronadjeni detalji o preduzecu!' });
            });
        };
        this.odbijRezTura = (req, res) => {
            let idRez = req.body.idRez;
            let o_id = new mongodb_1.ObjectId(idRez); // id as a string is passed
            console.log(o_id);
            rez_tura_1.default.findOne({ 'rezervacije._id': o_id }, (err, detalji) => {
                if (err)
                    return res.status(400).json({ 'message': 'error' });
                if (detalji) {
                    console.log("nadjeno");
                    rez_tura_1.default.collection.updateOne({ 'rezervacije._id': o_id }, { $set: { 'rezervacije.$.status': "odbijena" } });
                    return res.status(200).json({ 'message': 'Uspesno odbijena rezervacija!' });
                }
                return res.status(400).json({ 'message': 'Nisu pronadjeni detalji o preduzecu!' });
            });
        };
        this.dohvSvePlanTura = (req, res) => {
            let idP = req.body.idPlan;
            // console.log(idP);
            // let o_id = new ObjectId(idP);   // id as a string is passed
            // console.log(o_id);
            planinska_tura_1.default.find({ 'idP': idP }, (err, tura) => {
                if (err)
                    return res.status(400).json({ 'message': 'error' });
                if (!tura) {
                    return res.status(400).json({ 'message': 'U bazi nema ture' });
                }
                return res.status(200).json(tura);
            });
        };
        // tip:"hotel",
        // status: "aktivan" 
        this.dohvSveSmestaje = (req, res) => {
            korisnik_1.default.aggregate([
                {
                    $match: {
                        tip: { "$in": ["hotel", "apartman"] },
                        status: "aktivan"
                    }
                },
                {
                    $lookup: {
                        from: "detalji_firme",
                        localField: "kor_ime",
                        foreignField: "kor_ime",
                        as: "detalji_hotela"
                    }
                }
            ], (err, nadjeno) => {
                if (err)
                    console.log(err);
                else {
                    if (nadjeno) {
                        res.status(200).json(nadjeno);
                    }
                    else {
                        res.status(400).json({ 'message': 'U bazi trenutno ne postoje smestaji' });
                    }
                }
            });
        };
        this.detaljiSmestaja = (req, res) => {
            korisnik_1.default.aggregate([
                {
                    $match: {
                        _id: new mongodb_1.ObjectId(req.query.idHotela.toString())
                    }
                },
                {
                    $lookup: {
                        from: "detalji_firme",
                        localField: "kor_ime",
                        foreignField: "kor_ime",
                        as: "detalji_hotela"
                    }
                }
            ], (err, nadjeno) => {
                if (err)
                    console.log(err);
                else {
                    if (nadjeno) {
                        console.log(nadjeno);
                        res.status(200).json(nadjeno);
                    }
                    else {
                        res.status(400).json({ 'message': 'U bazi trenutno ne postoje podaci o tom smestaju!' });
                    }
                }
            });
        };
        this.rezSmestaj = (req, res) => {
            let idF = req.body.idHotela;
            console.log(idF);
            var key_value = "";
            var possible = "ABCDEFabcdef0123456789";
            for (var i = 0; i < 22; i++)
                key_value += possible.charAt(Math.floor(Math.random() * possible.length));
            let key_found = false;
            do {
                detalji_firme_2.default.findOne({ 'rezervacije.idRez': key_value }, (err, key) => {
                    if (err)
                        return res.status(400).json({ 'message': 'error' });
                    if (key) {
                        key_found = true;
                        for (var i = 0; i < 22; i++)
                            key_value += possible.charAt(Math.floor(Math.random() * possible.length));
                    }
                    else
                        key_found = false;
                });
            } while (key_found);
            detalji_firme_2.default.findOne({ 'idF': idF }, (err, detalji) => {
                if (err)
                    console.log(err);
                else {
                    if (detalji) {
                        //let id = new ObjectId(key_value);
                        let rez = {
                            idRez: key_value,
                            klijent: req.body.form.klijent,
                            email: req.body.form.email,
                            tip_sobe: req.body.form.tip_sobe,
                            br_osoba: req.body.form.br_osoba,
                            br_tel: req.body.form.br_tel,
                            datum_OD: req.body.form.datum_OD,
                            datum_DO: req.body.form.datum_DO,
                            dodatne_info: req.body.form.dodatne_info,
                            status: req.body.form.status
                        };
                        console.log(idF);
                        console.log(rez);
                        detalji_firme_2.default.collection.updateOne({ 'idF': idF }, { $push: { 'rezervacije': rez } });
                        res.status(200).json({ 'message': 'Uspešno poslata rezervacija!' });
                    }
                    else {
                        res.status(400).json({ 'message': 'Nema podataka o tom hotelu u bazi!' });
                    }
                }
            });
        };
        this.prihvatiRezSmestaj = (req, res) => {
            let idRez = req.body.idRez;
            detalji_firme_2.default.findOne({ 'rezervacije.idRez': idRez }, (err, detalji) => {
                if (err)
                    return res.status(400).json({ 'message': 'error' });
                if (detalji) {
                    console.log("nadjeno");
                    detalji_firme_2.default.collection.updateOne({ 'rezervacije.idRez': idRez }, { $set: { 'rezervacije.$.status': "odobrena" } });
                    return res.status(200).json({ 'message': 'Uspesno prihvacena rezervacija!' });
                }
                return res.status(400).json({ 'message': 'Nisu pronadjeni detalji o preduzecu!' });
            });
        };
        this.odbijRezSmestaj = (req, res) => {
            let idRez = req.body.idRez;
            detalji_firme_2.default.findOne({ 'rezervacije.idRez': idRez }, (err, detalji) => {
                if (err)
                    return res.status(400).json({ 'message': 'error' });
                if (detalji) {
                    console.log("nadjeno");
                    detalji_firme_2.default.collection.updateOne({ 'rezervacije.idRez': idRez }, { $set: { 'rezervacije.$.status': "odbijena" } });
                    return res.status(200).json({ 'message': 'Uspesno odbijena rezervacija!' });
                }
                return res.status(400).json({ 'message': 'Nisu pronadjeni detalji o preduzecu!' });
            });
        };
        this.editPopust = (req, res) => {
            detalji_firme_2.default.findOne({ 'idF': req.body.idHotela }, (err, detalji) => {
                if (err)
                    return res.status(400).json({ 'message': 'error' });
                if (detalji) {
                    console.log("nadjeno");
                    detalji_firme_2.default.collection.updateOne({ 'idF': req.body.idHotela }, { $set: { 'popust': req.body.noviPopust } });
                    return res.status(200).json({ 'message': 'Uspesno promenjen popust!' });
                }
                return res.status(400).json({ 'message': 'Nisu pronadjeni detalji o preduzecu!' });
            });
        };
        this.searchRezSkiByKor = (req, res) => {
            console.log(req.body.kor_ime);
            rez_ski_1.default.find({ 'rezervacije.klijent': req.body.kor_ime }, (err, user) => {
                if (err)
                    return res.status(400).json({ 'message': 'error' });
                if (!user) {
                    return res.status(400).json({ 'message': 'U bazi nema rezervacija skijanja za tog korisnika' });
                }
                return res.status(200).json(user);
            });
        };
        this.searchRezSmByKor = (req, res) => {
            detalji_firme_2.default.find({ rezervacije: { $elemMatch: { klijent: req.body.kor_ime } } }, (err, user) => {
                if (err)
                    return res.status(400).json({ 'message': 'error' });
                if (!user) {
                    return res.status(400).json({ 'message': 'U bazi nema rezervacija smestaja za tog korisnika' });
                }
                return res.status(200).json(user);
            });
        };
        this.searchRezPlanByKor = (req, res) => {
            rez_tura_1.default.find({ 'rezervacije.$.klijent': req.body.kor_ime }, (err, user) => {
                if (err)
                    return res.status(400).json({ 'message': 'error' });
                if (!user) {
                    return res.status(400).json({ 'message': 'U bazi nema rezervacija skijanja za tog korisnika' });
                }
                return res.status(200).json(user);
            });
        };
        this.addComment = (req, res) => {
            let idF = req.body.idF;
            let textComment = req.body.form.text;
            detalji_firme_1.default.findOne({ 'idF': idF }, (err, detalji) => {
                if (err)
                    console.log(err);
                else {
                    if (detalji) {
                        let comment = {
                            text: req.body.form.text,
                            ocena: req.body.form.ocena,
                            klijent: req.body.kor_ime
                        };
                        console.log(idF);
                        console.log(textComment);
                        detalji_firme_2.default.collection.updateOne({ 'idF': idF }, { $push: { 'komentari': comment } });
                        res.json({ 'message': 'ok' });
                    }
                    else {
                        res.json({ 'message': 'error' });
                    }
                }
            });
        };
        this.updateOcena = (req, res) => {
            detalji_firme_2.default.findOne({ 'idF': req.body.idF }, (err, detalji) => {
                if (err)
                    return res.status(400).json({ 'message': 'error' });
                if (detalji) {
                    console.log("nadjeno");
                    detalji_firme_2.default.collection.updateOne({ 'idF': req.body.idF }, { $set: { 'ocena': parseFloat(req.body.ocena) } });
                    return res.status(200).json({ 'message': 'Uspesno promenjen popust!' });
                }
                return res.status(400).json({ 'message': 'Nisu pronadjeni detalji o preduzecu!' });
            });
        };
    }
}
exports.FirmaController = FirmaController;
// .then(docs => res.status(200).json(docs));
// console.log("all documents", JSON.stringify(docs))
//# sourceMappingURL=firma.controller.js.map