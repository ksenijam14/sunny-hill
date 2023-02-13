import express from 'express'
import { readSync } from 'fs';
import multer from 'multer';
import { FirmaController } from '../controllers/firma.controller';
import detaljiFirme from '../models/detalji_firme';
import Korisnik from '../models/korisnik';

const firmaRouter = express.Router();
const storage = multer.diskStorage({
    destination : function(req, file, cb) {
        cb(null, './ponuda_slike/');
    },
    filename : function(req, file, cb) {
        cb(null, file.originalname);
    }
    });

const filter = (req : any, file : any, cb : any) => {
    if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png')
        cb(null, true);
    else
        cb(null, false);
    };

export const upload = multer({storage : storage, fileFilter : filter});
firmaRouter.use('/ponuda_slike', express.static('ponuda_slike'));

///---------dodavanje podataka za hotele i apartmane----///
firmaRouter.post('/addDataSmestaj', upload.array('file[]'),(req,res) => {
    console.log("podaciHotel", req.body);

    const detaljiP = new detaljiFirme({
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

    Korisnik.findOne({'kor_ime': req.body.kor_ime},(err, user)=>{
        if(err) return res.status(400).json({'message': 'error'})
        if(user){
            Korisnik.collection.updateOne({'kor_ime':req.body.kor_ime}, {$set:{'tip': req.body.form.kategorija}});
            detaljiFirme.insertMany(detaljiP).then(user=>{
                res.status(200).json({'message': 'Uspesno dodati podaci!'})
            }).catch(err=>{
                res.status(400).json({'message': 'Greska prilikom dodavanja detalja preduzeca!'})
            })
        }
    })
});

///----------- dodavanje podataka za ski skole -----------///
firmaRouter.post('/addDataSkiSkola',(req,res) => {
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
    const detaljiP = new detaljiFirme({
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

    Korisnik.findOne({'kor_ime': req.body.kor_ime},(err, user)=>{
        if(err) return res.status(400).json({'message': 'error'})
        if(user){
            Korisnik.collection.updateOne({'kor_ime':req.body.kor_ime}, {$set:{'tip': 'ski_skola'}});
            detaljiFirme.insertMany(detaljiP).then(user=>{
                res.status(200).json({'message': 'Uspesno dodati podaci!'})
            }).catch(err=>{
                res.status(400).json({'message': 'Greska prilikom dodavanja detalja preduzeca!'})
            })
        }
    })

    // detaljiFirme.insertMany(detaljiP).then(user=>{
    //     res.status(200).json({'message': 'Uspesno dodati podaci!'})
    // }).catch(err=>{
    //     res.status(400).json({'message': 'Greska prilikom dodavanja detalja preduzeca!'})
    // })

});

firmaRouter.post('/addImages', upload.array('file[]'),(req,res) => {
    let stringyfyFiles : string = JSON.parse(JSON.stringify(req.files));
    console.log("stringifyFiles", stringyfyFiles);
    console.log("bodyFiles", req.files);
    console.log("kor_ime", req.body.kor_ime);
    let filePaths : string[] = [];
    for (var i = 0; i < stringyfyFiles.length; i++) {
        const path : any = 'path';
        filePaths.push(stringyfyFiles[i][path]);
    }
    console.log("filePath", filePaths);
    // const detaljiP = new detaljiFirme({
    //     slike: filePaths
    // });

    Korisnik.findOne({'kor_ime': req.body.kor_ime},(err, user)=>{
        if(err) return res.status(400).json({'message': 'error'})
        if(user){
            console.log("nasao usera");
            detaljiFirme.updateOne({'kor_ime': req.body.kor_ime}, 
            {
            'slike' : filePaths
            }, 
            (err, updatedUser) => {
                if(err) return console.log(err);
                else res.status(200).json({'message': 'Uspesno dodate slike!'})
            });
            //detaljiFirme.collection.updateOne({'kor_ime':req.body.kor_ime}, {$set:{'slike': filePaths}});
            // detaljiFirme.insertMany(detaljiP).then(user=>{
            //     res.status(200).json({'message': 'Uspesno dodati podaci!'})
            // }).catch(err=>{
            //     res.status(400).json({'message': 'Greska prilikom dodavanja detalja preduzeca!'})
            // })
        }
    })
    // detaljiFirme.insertMany(detaljiP).then(user=>{
    //     res.status(200).json({'message': 'Uspesno dodate slike!'})
    // }).catch(err=>{
    //     res.status(400).json({'message': 'Greska prilikom dodavanja slika ponude!'})
    // })
})

firmaRouter.route('/addDataPlaninari').post(
    (req, res)=> new FirmaController().dodajPodatkePlaninari(req,res)
)

firmaRouter.route('/getAllUsers').get(
    (req, res)=> new FirmaController().getAllUsers(req,res)
)

firmaRouter.route('/getDetaljiFirme').post(
    (req, res)=> new FirmaController().getDetaljiFirme(req,res)
)

firmaRouter.route('/getDetaljiFirmeById').post(
    (req, res)=> new FirmaController().getDetaljiFirmeById(req,res)
)

firmaRouter.route('/getFirmaOsnovno').post(
    (req, res)=> new FirmaController().getFirmaOsnovno(req,res)
)

firmaRouter.route('/getAllSki').get(
    (req, res)=> new FirmaController().getAllSki(req,res)
)

firmaRouter.route('/detaljiSkole').get(
    (req, res)=>new FirmaController().detaljiSkole(req, res)
)

firmaRouter.route('/rezSkiCas').post(
    (req, res)=> new FirmaController().rezSkiCas(req,res)
)

firmaRouter.route('/prihvatiRezSki').post(
    (req, res)=> new FirmaController().prihvatiRezSki(req,res)
)

firmaRouter.route('/odbijRezSki').post(
    (req, res)=> new FirmaController().odbijRezSki(req,res)
)

firmaRouter.route('/dohvRezervacije').post(
    (req, res)=> new FirmaController().dohvRezervacije(req,res)
)

firmaRouter.route('/dohvRezervacijeSkole').post(
    (req, res)=> new FirmaController().dohvRezervacijeSkole(req,res)
)

firmaRouter.route('/getAllPlaninari').get(
    (req, res)=> new FirmaController().getAllPlaninari(req,res)
)

firmaRouter.route('/getAllPlanAndDet').get(
    (req, res)=> new FirmaController().getAllPlanAndDet(req,res)
)

firmaRouter.route('/detaljiPlanTure').get(
    (req, res)=>new FirmaController().detaljiPlanTure(req, res)
)

firmaRouter.route('/rezPlanTura').post(
    (req, res)=>new FirmaController().rezPlanTura(req, res)
)

firmaRouter.route('/dohvRezervacijePlan').post(
    (req, res)=>new FirmaController().dohvRezervacijePlan(req, res)
)

firmaRouter.route('/prihvatiRezTura').post(
    (req, res)=>new FirmaController().prihvatiRezTura(req, res)
)

firmaRouter.route('/odbijRezTura').post(
    (req, res)=>new FirmaController().odbijRezTura(req, res)
)

firmaRouter.route('/dohvSvePlanTura').post(
    (req, res)=>new FirmaController().dohvSvePlanTura(req, res)
)

firmaRouter.route('/dohvSveSmestaje').get(
    (req, res)=>new FirmaController().dohvSveSmestaje(req, res)
)

firmaRouter.route('/detaljiSmestaja').get(
    (req, res)=>new FirmaController().detaljiSmestaja(req, res)
)

firmaRouter.route('/rezSmestaj').post(
    (req, res)=>new FirmaController().rezSmestaj(req, res)
)

firmaRouter.route('/prihvatiRezSmestaj').post(
    (req, res)=>new FirmaController().prihvatiRezSmestaj(req, res)
)

firmaRouter.route('/odbijRezSmestaj').post(
    (req, res)=>new FirmaController().odbijRezSmestaj(req, res)
)

firmaRouter.route('/editPopust').post(
    (req, res)=>new FirmaController().editPopust(req, res)
)

firmaRouter.route('/searchRezSkiByKor').post(
    (req, res)=>new FirmaController().searchRezSkiByKor(req, res)
)

firmaRouter.route('/searchRezSmByKor').post(
    (req, res)=>new FirmaController().searchRezSmByKor(req, res)
)

firmaRouter.route('/searchRezPlanByKor').post(
    (req, res)=>new FirmaController().searchRezPlanByKor(req, res)
)

firmaRouter.route('/getAllDetaljiFirme').get(
    (req, res)=>new FirmaController().getAllDetaljiFirme(req, res)
)

firmaRouter.route('/getAllPlanTure').get(
    (req, res)=>new FirmaController().getAllPlanTure(req, res)
)

firmaRouter.route('/addComment').post(
    (req, res)=>new FirmaController().addComment(req, res)
)

firmaRouter.route('/updateOcena').post(
    (req, res)=>new FirmaController().updateOcena(req, res)
)


export default firmaRouter;

