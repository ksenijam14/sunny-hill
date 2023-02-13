import express from 'express'
import multer from 'multer';
import Korisnik from "../models/korisnik";
import { KorisnikController } from '../controllers/korisnik.controller';
import korisnik from '../models/korisnik';

const userRouter = express.Router();

userRouter.route('/login').post(
    (req, res)=> new KorisnikController().login(req,res)
)

const storage = multer.diskStorage({
    destination : function(req, file, cb) {
        cb(null, './grb_slike/');
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
userRouter.use('/grb_slike', express.static('grb_slike'));

userRouter.post('/register', upload.single('slika'), (req,res)=>{
    //pazi upload.single('slika'), ovo 'slika' mora da bude name od input polja!!!
    console.log("usao")
    let imagepath = req.file.path;
    console.log("image path", imagepath); //to treba da stoji u bazi
    let preduzece = req.file;
    console.log("preduzece", preduzece);
    const noviKorisnik = new Korisnik({
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
    Korisnik.findOne({ $or: [{'kor_ime': req.body.kor_ime}, {'email': req.body.email}]}, (err, user)=>{
        if(err) return res.status(400).json({'message': 'error'})
        if(user){
            return res.status(400).json({'message': 'Postoji već korisnik sa tim korisničkim imenom ili mejlom'})
        }
        // korisnik.insertMany(noviKorisnik, (err2, addedUser) => {
        //     if(err2) return res.status(400).json({'message': 'Greska prilikom registracije!'})
        //     else return res.status(200).json({'message': 'Uspesno poslat zahtev za registraciju!'})
        // })
        
        korisnik.insertMany(noviKorisnik).then(user=>{
            res.status(200).json({'message': 'Uspešno poslat zahtev za registraciju!'})
        }).catch(err=>{
            res.status(400).json({'message': 'Greška prilikom registracije!'})
        })
    })
})

userRouter.route('/registerBuyer').post(
    (req, res)=> new KorisnikController().registerBuyer(req,res)
)

userRouter.route('/changePass').post(
    (req, res)=> new KorisnikController().changePass(req,res)
)



export default userRouter;