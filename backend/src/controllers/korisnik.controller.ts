import * as express from 'express'
import Korisnik from '../models/korisnik';
import korisnik from '../models/korisnik';


export class KorisnikController{

    login = (req: express.Request, res: express.Response) =>{
        console.log('usao u login')
        console.log(req.body);
        Korisnik.findOne({'kor_ime': req.body.kor_ime, 'lozinka': req.body.lozinka}, (err, user)=>{
            if(err) return res.status(400).json({'message': 'error'})
            if(!user){
                return res.status(400).json({'message': 'Korisnik nije pronađen!'})
            }
            return res.status(200).json(user)
        })
    }


    registerBuyer = (req: express.Request, res: express.Response) =>{
        let kupac = req.body;
        console.log("kupac", kupac)
        const noviKupac = new Korisnik({
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
        Korisnik.findOne({ $or: [{'kor_ime': req.body.kor_ime}, {'email': req.body.email}]}, (err, user)=>{
            if(err) return res.status(400).json({'message': 'error'})
            if(user){
                return res.status(400).json({'message': 'Korisnik već postoji!'})
            }
            // korisnik.insertMany(noviKupac, (err2, addedUser) => {
            //     if(err2) return res.status(400).json({'message': 'Greska prilikom registracije!'})
            //     else return res.status(200).json({'message': 'Uspesno poslat zahtev za registraciju!'})
            // })
            korisnik.insertMany(noviKupac).then(user=>{
                res.status(200).json({'message': 'Uspešno ste se registrovali!'})
            }).catch(err=>{
                res.status(400).json({'message': 'Greška prilikom registracije!'})
            })
        })
    }

    changePass = (req: express.Request, res: express.Response) => {
        Korisnik.findOne({'kor_ime': req.body.kor_ime},(err,user)=>{
            if(err) return res.status(400).json({'message': 'error'})
            if(!user) return res.status(400).json({'message': 'Korisnik ne postoji u sistemu!'})
            Korisnik.collection.updateOne({'kor_ime':req.body.kor_ime}, {$set:{'lozinka': req.body.lozinka}});
            res.status(200).json({'message': 'Lozinka je uspesno promenjena'})
        })
    }

}