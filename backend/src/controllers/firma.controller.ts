import * as express from 'express'
import detaljiFirme from '../models/detalji_firme';
import Korisnik from '../models/korisnik';
import DetaljiFirme from '../models/detalji_firme';
import RezSkijanja from '../models/rez_ski';
import RezTura from '../models/rez_tura';
import { ObjectId } from "mongodb";
import PlaninskaTura from '../models/planinska_tura';
import RezPlan from '../models/planinska_tura';
import { brotliDecompressSync } from 'zlib';

export class FirmaController{

    dodajPodatkePlaninari = (req: express.Request, res: express.Response) => {
        let detalji = req.body;
        console.log('detalji', detalji)
        const detaljiP = new detaljiFirme({
            idF: req.body.idF,
            kor_ime: req.body.kor_ime,
            nazivP: req.body.nazivP,
            planine: req.body.form.planine,
            ziro_racuni: req.body.form.ziro_racun_p,
            popust: 0,
            ocena: 0,
        });

        Korisnik.findOne({'kor_ime': req.body.kor_ime},(err, user)=>{
            if(err) return res.status(400).json({'message': 'error'})
            if(user){
                Korisnik.collection.updateOne({'kor_ime':req.body.kor_ime}, {$set:{'tip': "planinari"}});
                detaljiFirme.insertMany(detaljiP).then(user=>{
                    res.status(200).json({'message': 'Uspesno dodati podaci!'})
                }).catch(err=>{
                    res.status(400).json({'message': 'Greska prilikom dodavanja detalja preduzeca!'})
                })
            }
        })
        
    }

    getAllUsers = (req: express.Request, res: express.Response)=>{
        Korisnik.find({}, (err, user)=>{
            if(err) return res.status(400).json({'message': 'error'})
            if(!user){
                return res.status(400).json({'message': 'U bazi nema korisnika'})
            }
            return res.status(200).json(user)
        })
    }

    getAllDetaljiFirme = (req: express.Request, res: express.Response)=>{
        //vraca detalje svih firmi
        DetaljiFirme.find({}, (err, detalji)=>{
            if(err) return res.status(400).json({'message':'error'})
            if(!detalji){
                return res.status(400).json({'message': 'U bazi ne postoje detalji firmi'})
            }
            console.log(detalji)
            return res.status(200).json(detalji)
        })
    }

    getDetaljiFirme = (req: express.Request, res: express.Response) => {
        let kor_ime = req.body.kor_ime;
        DetaljiFirme.findOne({'kor_ime': kor_ime}, (err, detalji)=>{
            if(err) return res.status(400).json({'message':'error'})
            if(!detalji){
                return res.status(400).json({'message': 'U bazi ne postoje detalji date firme'})
            }
            console.log(detalji)
            return res.status(200).json(detalji)
        })
    }

    getDetaljiFirmeById = (req: express.Request, res: express.Response) =>{
        let idF = req.body.idF;
        DetaljiFirme.findOne({'idF': idF}, (err, detalji)=>{
            if(err) return res.status(400).json({'message':'error'})
            if(!detalji){
                return res.status(400).json({'message': 'U bazi ne postoje detalji date firme'})
            }
            console.log(detalji)
            return res.status(200).json(detalji)
        })
    }

    getFirmaOsnovno = (req: express.Request, res: express.Response) =>{
        let idP = req.body.idP;
        console.log(idP);
        let o_id = new ObjectId(idP);   // id as a string is passed
        console.log(o_id);
        Korisnik.findOne({"_id" : o_id}, (err, preduzece )=>{
            if(err) console.log(err);
            else{
                if(preduzece){
                    res.status(200).json(preduzece);
                }else{
                    res.status(400).json({'message':'U bazi ne postoje osnovni podaci date firme'})
                }
            }
        })
    }

    getAllSki = (req: express.Request, res: express.Response) =>{
        Korisnik.aggregate( [
            {
                $match: {
                    tip:"ski_skola",
                    status: "aktivan" 
                }
            },
            {
              $lookup:
                {
                  from: "detalji_firme",
                  localField: "kor_ime",
                  foreignField: "kor_ime",
                  as: "detalji_skole"
                }
           }
         ], (err, nadjeno)=>{
            if(err) console.log(err);
            else{
                if(nadjeno){
                    res.status(200).json(nadjeno);
                }else{
                    res.status(400).json({'message':'U bazi trenutno ne postoje ski skole'});
                }
            }
         } )
    }

    detaljiSkole = (req: express.Request, res: express.Response)=>{
        Korisnik.aggregate( [
            {
                $match: {
                    _id: new ObjectId(req.query.idSkole.toString())
                }
            },
            {
              $lookup:
                {
                  from: "detalji_firme",
                  localField: "kor_ime",
                  foreignField: "kor_ime",
                  as: "detalji_skole"
                }
           }
         ], (err, nadjeno)=>{
            if(err) console.log(err);
            else{
                if(nadjeno){
                    console.log(nadjeno)
                    res.status(200).json(nadjeno);
                }else{
                    res.status(400).json({'message':'U bazi trenutno ne postoje podaci o toj skoli'});
                }
            }
         } )
    }

    rezSkiCas = (req: express.Request, res: express.Response)=>{
        let detalji = req.body;
        console.log('detalji', detalji)

        const rezervacija = new RezSkijanja({
            idSkole: req.body.idSkole,
            id_instruktora: req.body.form.instruktor,
            rezervacije: req.body.form,
        });

        
        const rezUpdate = new RezSkijanja({
            rezervacije: req.body.form,
        });

        console.log("update", rezUpdate);

        RezSkijanja.findOne({'id_instruktora': req.body.form.instruktor, 'idSkole': req.body.idSkole},(err,user)=>{
            if(err) return res.status(400).json({'message': 'error'})
            if(user){
                console.log("usao")
                RezSkijanja.updateOne({'id_instruktora': req.body.form.instruktor, 'idSkole': req.body.idSkole}, {$push:{'rezervacije': rezUpdate.rezervacije}}).then(user=>{
                    res.status(200).json({'message': 'Uspesno azurirani podaci!'})
                }).catch(err=>{
                    res.status(400).json({'message': 'Greska prilikom azuriranja rezervacija!'})
                })
            }else{
                RezSkijanja.insertMany(rezervacija).then(user=>{
                    res.status(200).json({'message': 'Uspesno dodati podaci!'})
                }).catch(err=>{
                    res.status(400).json({'message': 'Greska prilikom dodavanja rezervacije!'})
                })
            }
        })
    }
  
    prihvatiRezSki = (req: express.Request, res: express.Response)=>{
        let idRez = req.body.idRez;
        let o_id = new ObjectId(idRez);   // id as a string is passed
        console.log(o_id);

        RezSkijanja.findOne({'rezervacije._id': o_id}, (err, detalji)=>{
            if(err) return res.status(400).json({'message': 'error'})
            if(detalji){
                console.log("nadjeno")
                RezSkijanja.collection.updateOne({'rezervacije._id': o_id}, {$set:{'rezervacije.$.status': "odobrena"}});
                return res.status(200).json({'message': 'Uspesno prihvacena rezervacija!'})
            }
            return res.status(400).json({'message': 'Nisu pronadjeni detalji o preduzecu!'})
        })
        
    }
    
    odbijRezSki = (req: express.Request, res: express.Response)=>{
        let idRez = req.body.idRez;
        let o_id = new ObjectId(idRez);   // id as a string is passed
        console.log(o_id);

        RezSkijanja.findOne({'rezervacije._id': o_id}, (err, detalji)=>{
            if(err) return res.status(400).json({'message': 'error'})
            if(detalji){
                console.log("nadjeno")
                RezSkijanja.collection.updateOne({'rezervacije._id': o_id}, {$set:{'rezervacije.$.status': "odbijena"}});
                return res.status(200).json({'message': 'Uspesno odbijena rezervacija!'})
            }
            return res.status(400).json({'message': 'Nisu pronadjeni detalji o preduzecu!'})
        })
    }

    dohvRezervacije = (req: express.Request, res: express.Response)=>{
        console.log("body rez", req.body);

        RezSkijanja.find({'id_instruktora':req.body.id_instruktora, 'rezervacije.datum': req.body.datum},(err, rez)=>{
            if(err) return res.status(400).json({'message': 'error'})
            if(rez){
                console.log(rez)
                res.status(200).json(rez);
            }else{
                res.status(200).json({'message':'Nema u bazi'});
            }
        } )
    }

    dohvRezervacijeSkole = (req: express.Request, res: express.Response)=>{
        console.log("body rez", req.body);

        RezSkijanja.find({'idSkole':req.body.idSkole},(err, rez)=>{
            if(err) return res.status(400).json({'message': 'error'})
            if(rez){
                console.log(rez)
                res.status(200).json(rez);
            }else{
                res.status(200).json({'message':'Nema rezervacija'});
            }
        } )
    }

    getAllPlanTure = (req: express.Request, res: express.Response) =>{
        //vraca detalje svih tura
        PlaninskaTura.find({}, (err, detalji)=>{
            if(err) return res.status(400).json({'message':'error'})
            if(!detalji){
                return res.status(400).json({'message': 'U bazi ne postoje detalji firmi'})
            }
            console.log(detalji)
            return res.status(200).json(detalji)
        })
    }

    getAllPlaninari = (req: express.Request, res: express.Response) =>{
        Korisnik.aggregate( [
            {
                $match: {
                    tip:"planinari",
                    status: "aktivan" 
                }
            },
            {
              $lookup:
                {
                  from: "planinska_tura",
                  localField: "kor_ime",
                  foreignField: "kor_ime",
                  as: "detalji_tura"
                }
           }
         ], (err, nadjeno)=>{
            if(err) console.log(err);
            else{
                if(nadjeno){
                    res.status(200).json(nadjeno);
                }else{
                    res.status(400).json({'message':'U bazi trenutno ne postoje planinarska drustva'});
                }
            }
         } )
    }

    getAllPlanAndDet  = (req: express.Request, res: express.Response) =>{
        Korisnik.aggregate( [
            {
                $match: {
                    tip:"planinari",
                    status: "aktivan" 
                }
            },
            {
              $lookup:
                {
                  from: "planinska_tura",
                  localField: "kor_ime",
                  foreignField: "kor_ime",
                  as: "detalji_tura"
                }
           },
           {   $unwind:"$detalji_tura" },     // $unwind used for getting data in object or for one record only

            // Join with detalji_firme table
            {
                $lookup:{
                    from: "detalji_firme", 
                    localField: "kor_ime", 
                    foreignField: "kor_ime",
                    as: "detaljiFirme"
                }
            },
         ], (err, nadjeno)=>{
            if(err) console.log(err);
            else{
                if(nadjeno){
                    res.status(200).json(nadjeno);
                }else{
                    res.status(400).json({'message':'U bazi trenutno ne postoje planinarska drustva'});
                }
            }
         } )
    }

    detaljiPlanTure = (req: express.Request, res: express.Response)=>{
        Korisnik.aggregate( [
            {
                $match: {
                    _id: new ObjectId(req.query.idSkole.toString())
                }
            },
            {
              $lookup:
                {
                  from: "detalji_firme",
                  localField: "kor_ime",
                  foreignField: "kor_ime",
                  as: "detalji_skole"
                }
           }
         ], (err, nadjeno)=>{
            if(err) console.log(err);
            else{
                if(nadjeno){
                    console.log(nadjeno)
                    res.status(200).json(nadjeno);
                }else{
                    res.status(400).json({'message':'U bazi trenutno ne postoje podaci o tom planinarskom drustvu'});
                }
            }
         } )
    }

    rezPlanTura = (req: express.Request, res: express.Response)=>{
        let detalji = req.body;
        console.log('detalji', detalji)
        console.log('idTure', req.body.idTure)

        const rezervacija = new RezTura({
            idTure: req.body.idTure,
            idPlan: req.body.form.idPlan,
            rezervacije: req.body.form,
        });

        
        const rezUpdate = new RezTura({
            rezervacije: req.body.form,
        });

        console.log("update", rezUpdate);

        RezTura.findOne({'idTure': req.body.idTure},(err,user)=>{
            if(err) return res.status(400).json({'message': 'error'})
            if(user){
                console.log("usao")
                RezTura.updateOne({'idTure': req.body.idTure}, {$push:{'rezervacije': rezUpdate.rezervacije}}).then(user=>{
                    res.status(200).json({'message': 'Uspesno azurirani podaci!'})
                }).catch(err=>{
                    res.status(400).json({'message': 'Greska prilikom azuriranja rezervacija!'})
                })
            }else{
                RezTura.insertMany(rezervacija).then(user=>{
                    res.status(200).json({'message': 'Uspesno dodati podaci!'})
                }).catch(err=>{
                    res.status(400).json({'message': 'Greska prilikom dodavanja rezervacije!'})
                })
            }
        })
    }

    

    dohvRezervacijePlan = (req: express.Request, res: express.Response)=>{
        console.log("body rez", req.body);

        RezTura.find({'idPlan':req.body.idPlan},(err, rez)=>{
            if(err) return res.status(400).json({'message': 'error'})
            if(rez){
                console.log(rez)
                res.status(200).json(rez);
            }else{
                res.status(200).json({'message':'Nema rezervacija'});
            }
        } )
    }

    prihvatiRezTura = (req: express.Request, res: express.Response)=>{
        let idRez = req.body.idRez;
        let o_id = new ObjectId(idRez);   // id as a string is passed
        console.log(o_id);

        RezTura.findOne({'rezervacije._id': o_id}, (err, detalji)=>{
            if(err) return res.status(400).json({'message': 'error'})
            if(detalji){
                console.log("nadjeno")
                RezTura.collection.updateOne({'rezervacije._id': o_id}, {$set:{'rezervacije.$.status': "odobrena"}});
                return res.status(200).json({'message': 'Uspesno prihvacena rezervacija!'})
            }
            return res.status(400).json({'message': 'Nisu pronadjeni detalji o preduzecu!'})
        })
    }

    odbijRezTura = (req: express.Request, res: express.Response)=>{
        let idRez = req.body.idRez;
        let o_id = new ObjectId(idRez);   // id as a string is passed
        console.log(o_id);

        RezTura.findOne({'rezervacije._id': o_id}, (err, detalji)=>{
            if(err) return res.status(400).json({'message': 'error'})
            if(detalji){
                console.log("nadjeno")
                RezTura.collection.updateOne({'rezervacije._id': o_id}, {$set:{'rezervacije.$.status': "odbijena"}});
                return res.status(200).json({'message': 'Uspesno odbijena rezervacija!'})
            }
            return res.status(400).json({'message': 'Nisu pronadjeni detalji o preduzecu!'})
        })
    }

    dohvSvePlanTura = (req: express.Request, res: express.Response)=>{
        let idP = req.body.idPlan;
        // console.log(idP);
        // let o_id = new ObjectId(idP);   // id as a string is passed
        // console.log(o_id);

        PlaninskaTura.find({'idP': idP}, (err, tura)=>{
            if(err) return res.status(400).json({'message': 'error'})
            if(!tura){
                return res.status(400).json({'message': 'U bazi nema ture'})
            }
            return res.status(200).json(tura)
        })
    }
    // tip:"hotel",
    // status: "aktivan" 
    dohvSveSmestaje = (req: express.Request, res: express.Response)=>{
        Korisnik.aggregate( [
            {
                $match: {
                    tip: { "$in": ["hotel", "apartman"] },
                    status: "aktivan"
                }
            },
            {
              $lookup:
                {
                  from: "detalji_firme",
                  localField: "kor_ime",
                  foreignField: "kor_ime",
                  as: "detalji_hotela"
                }
           }
         ], (err, nadjeno)=>{
            if(err) console.log(err);
            else{
                if(nadjeno){
                    res.status(200).json(nadjeno);
                }else{
                    res.status(400).json({'message':'U bazi trenutno ne postoje smestaji'});
                }
            }
         } )
    }

    detaljiSmestaja = (req: express.Request, res: express.Response)=>{
        Korisnik.aggregate( [
            {
                $match: {
                    _id: new ObjectId(req.query.idHotela.toString())
                }
            },
            {
              $lookup:
                {
                  from: "detalji_firme",
                  localField: "kor_ime",
                  foreignField: "kor_ime",
                  as: "detalji_hotela"
                }
           }
         ], (err, nadjeno)=>{
            if(err) console.log(err);
            else{
                if(nadjeno){
                    console.log(nadjeno)
                    res.status(200).json(nadjeno);
                }else{
                    res.status(400).json({'message':'U bazi trenutno ne postoje podaci o tom smestaju!'});
                }
            }
         } )
    }

    rezSmestaj = (req: express.Request, res: express.Response)=>{
        let idF = req.body.idHotela;
        console.log(idF);

        var key_value = "";
        var possible = "ABCDEFabcdef0123456789";

        for (var i = 0; i < 22; i++)
            key_value += possible.charAt(Math.floor(Math.random() * possible.length));
        
        let key_found = false;
        do{
            DetaljiFirme.findOne({'rezervacije.idRez': key_value}, (err, key)=>{
                if (err) return res.status(400).json({'message': 'error'})
                if (key) {
                    key_found = true;
                    for (var i = 0; i < 22; i++)
                        key_value += possible.charAt(Math.floor(Math.random() * possible.length));
                }
                else key_found = false;
            })
        }while(key_found)

        DetaljiFirme.findOne({'idF': idF}, (err, detalji)=>{
            if(err) console.log(err);
            else{
                if(detalji){
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
                    }
                    console.log(idF)
                    console.log(rez)
                    DetaljiFirme.collection.updateOne({'idF': idF}, {$push: {'rezervacije': rez}});
                    res.status(200).json({'message': 'Uspešno poslata rezervacija!'})
                }
                else{
                    res.status(400).json({'message': 'Nema podataka o tom hotelu u bazi!'})
                }
                
            }
        })
    }

    prihvatiRezSmestaj= (req: express.Request, res: express.Response)=>{
        let idRez = req.body.idRez;

        DetaljiFirme.findOne({'rezervacije.idRez': idRez}, (err, detalji)=>{
            if(err) return res.status(400).json({'message': 'error'})
            if(detalji){
                console.log("nadjeno")
                DetaljiFirme.collection.updateOne({'rezervacije.idRez': idRez}, {$set:{'rezervacije.$.status': "odobrena"}});
                return res.status(200).json({'message': 'Uspesno prihvacena rezervacija!'})
            }
            return res.status(400).json({'message': 'Nisu pronadjeni detalji o preduzecu!'})
        })
    }

    odbijRezSmestaj = (req: express.Request, res: express.Response)=>{
        let idRez = req.body.idRez;

        DetaljiFirme.findOne({'rezervacije.idRez': idRez}, (err, detalji)=>{
            if(err) return res.status(400).json({'message': 'error'})
            if(detalji){
                console.log("nadjeno")
                DetaljiFirme.collection.updateOne({'rezervacije.idRez': idRez}, {$set:{'rezervacije.$.status': "odbijena"}});
                return res.status(200).json({'message': 'Uspesno odbijena rezervacija!'})
            }
            return res.status(400).json({'message': 'Nisu pronadjeni detalji o preduzecu!'})
        })
    }

    editPopust = (req: express.Request, res: express.Response)=>{
        DetaljiFirme.findOne({'idF': req.body.idHotela}, (err, detalji)=>{
            if(err) return res.status(400).json({'message': 'error'})
            if(detalji){
                console.log("nadjeno")
                DetaljiFirme.collection.updateOne({'idF': req.body.idHotela}, {$set:{'popust': req.body.noviPopust}});
                return res.status(200).json({'message': 'Uspesno promenjen popust!'})
            }
            return res.status(400).json({'message': 'Nisu pronadjeni detalji o preduzecu!'})
        })
    }

    searchRezSkiByKor = (req: express.Request, res: express.Response) =>{
        console.log(req.body.kor_ime);
        RezSkijanja.find({'rezervacije.klijent': req.body.kor_ime}, (err, user)=>{
            if(err) return res.status(400).json({'message': 'error'})
            if(!user){
                return res.status(400).json({'message': 'U bazi nema rezervacija skijanja za tog korisnika'})
            }
            return res.status(200).json(user)
        })
    }

    searchRezSmByKor = (req: express.Request, res: express.Response) =>{
        DetaljiFirme.find({ rezervacije: { $elemMatch: { klijent: req.body.kor_ime } } }, (err, user)=>{
            if(err) return res.status(400).json({'message': 'error'})
            if(!user){
                return res.status(400).json({'message': 'U bazi nema rezervacija smestaja za tog korisnika'})
            }
            return res.status(200).json(user)
        })
    }

    searchRezPlanByKor = (req: express.Request, res: express.Response) =>{
        RezTura.find({'rezervacije.$.klijent': req.body.kor_ime}, (err, user)=>{
            if(err) return res.status(400).json({'message': 'error'})
            if(!user){
                return res.status(400).json({'message': 'U bazi nema rezervacija skijanja za tog korisnika'})
            }
            return res.status(200).json(user)
        })
    }


    addComment = (req: express.Request, res: express.Response) =>{
        let idF = req.body.idF;
        let textComment = req.body.form.text;

        detaljiFirme.findOne({'idF': idF}, (err, detalji)=>{
            if(err) console.log(err);
            else{
                if(detalji){
                    let comment = {
                        text: req.body.form.text,
                        ocena: req.body.form.ocena,
                        klijent: req.body.kor_ime
                    }
                    console.log(idF);
                    console.log(textComment);
                    DetaljiFirme.collection.updateOne({'idF': idF}, {$push: {'komentari': comment}});
                    res.json({'message': 'ok'})
                }
                else{
                    res.json({'message': 'error'})
                }
                
            }
        })
    }

    updateOcena = (req: express.Request, res: express.Response) =>{
        DetaljiFirme.findOne({'idF': req.body.idF}, (err, detalji)=>{
            if(err) return res.status(400).json({'message': 'error'})
            if(detalji){
                console.log("nadjeno")
                DetaljiFirme.collection.updateOne({'idF': req.body.idF}, {$set:{'ocena': parseFloat(req.body.ocena)}});
                return res.status(200).json({'message': 'Uspesno promenjen popust!'})
            }
            return res.status(400).json({'message': 'Nisu pronadjeni detalji o preduzecu!'})
        })
    }
    
}
// .then(docs => res.status(200).json(docs));
// console.log("all documents", JSON.stringify(docs))