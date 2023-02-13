import express from 'express';
import multer from 'multer';
import PlaninskaTura from '../models/planinska_tura';
import Korisnik from '../models/korisnik';
import { PlaninariController } from '../controllers/planinari.controller';

const planinarRouter = express.Router();

const storage = multer.diskStorage({
    destination : function(req, file, cb) {
        cb(null, './ture_slike/');
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
planinarRouter.use('/ture_slike', express.static('ture_slike'));

planinarRouter.post('/addNewTour', upload.array('file[]'),(req,res) => {
    
    let stringyfyFiles : string = JSON.parse(JSON.stringify(req.files));
    let filePaths : string[] = [];
    for (var i = 0; i < stringyfyFiles.length; i++) {
        const path : any = 'path';
        filePaths.push(stringyfyFiles[i][path]);
    }

    const novaTura = new PlaninskaTura({
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

    Korisnik.findOne({'kor_ime': req.body.kor_ime},(err, user)=>{
        if(err) return res.status(400).json({'message': 'error'})
        if(user){
            PlaninskaTura.insertMany(novaTura).then(user=>{
                res.status(200).json({'message': 'Uspesno dodata nova planinska tura!'})
            }).catch(err=>{
                res.status(400).json({'message': 'Greska prilikom dodavanja nove planinske ture!'})
            })
        }
    })

});

planinarRouter.route('/getPlaninskaTura').post(
    (req, res)=> new PlaninariController().getPlaninskaTura(req,res)
)

planinarRouter.route('/detaljiTure').get(
    (req, res)=>new PlaninariController().detaljiTure(req, res)
)

planinarRouter.route('/dohvSvePlanine').get(
    (req, res)=>new PlaninariController().dohvSvePlanine(req, res)
)

planinarRouter.route('/dohvSvePlanineDrzave').post(
    (req, res)=> new PlaninariController().dohvSvePlanineDrzave(req,res)
)


export default planinarRouter;