import * as express from 'express'
import { ObjectId } from 'mongodb';
import PlaninskaTura from '../models/planinska_tura';
import Planina from '../models/planina';


export class PlaninariController{

    getPlaninskaTura = (req: express.Request, res: express.Response)=>{
        let idP = req.body.idP;
        console.log(idP);
        PlaninskaTura.find({"idP" : idP}, (err, preduzece )=>{
            if(err) console.log(err);
            else{
                if(preduzece){
                    res.status(200).json(preduzece);
                }else{
                    res.status(400).json({'message':'U bazi ne postoje podaci o planinskim turama drustva'})
                }
            }
        })
    }

    detaljiTure = (req: express.Request, res: express.Response)=>{
        let idT = req.query.idTure;
        console.log(idT);
        PlaninskaTura.findOne({"_id" : idT}, (err, tura)=>{
            if(err) console.log(err);
            else{
                if(tura){
                    console.log("pronasao turu")
                    res.status(200).json(tura)
                }else{
                    res.status(400).json({'message':'U bazi ne postoji tura sa tim id-em'})
                }
            }
        })
    }

    dohvSvePlanine = (req: express.Request, res: express.Response)=>{
        Planina.find({}, (err, tura)=>{
            if(err) console.log(err);
            else{
                if(tura){
                    console.log("pronasao planine")
                    res.status(200).json(tura)
                }else{
                    res.status(400).json({'message':'U bazi ne postoje planine'})
                }
            }
        })
    }

    dohvSvePlanineDrzave = (req: express.Request, res: express.Response)=>{
        Planina.findOne({'drzava': req.body.drzava}, (err, tura)=>{
            if(err) console.log(err);
            else{
                if(tura){
                    console.log("pronasao planine")
                    res.status(200).json(tura)
                }else{
                    res.status(400).json({'message':'U bazi ne postoje planine za tu drzavu'})
                }
            }
        })
    }
}