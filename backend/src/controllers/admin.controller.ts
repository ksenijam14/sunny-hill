import * as express from 'express'
import Korisnik from '../models/korisnik';
import { ObjectId } from "mongodb";

export class AdminController{
    getAllCompanies = (req: express.Request, res: express.Response) =>{
        console.log('usao u admin_get_all_companies');
        //hocu da dohvatim sve korisnike ciji je tip preduzece tj, prodavnica ili ugostitelj i da radim onda sa njima na frontu
        Korisnik.find({ $or: [{'tip': "firma"}, {'tip': "hotel"}, {'tip': "apartman"}, {'tip': "planinari"}, {'tip': "ski_skola"}]}, (err, firma)=>{
            if(err) return res.status(400).json({'message': 'error'})
            if(!firma){
                return res.status(400).json({'message': 'U bazi ne postoje registrovana preduzeca1'})
            }
            return res.status(200).json(firma)
        })
    }

    activateCompany = (req: express.Request, res: express.Response) =>{
        let idP = req.body.idP;
        console.log(idP);
        let o_id = new ObjectId(idP);   // id as a string is passed
        console.log(o_id);
        Korisnik.findOne({"_id" : o_id}, (err, preduzece )=>{
            if(err) console.log(err);
            else{
                if(preduzece){
                    console.log("pronasao preduzece")
                    Korisnik.collection.updateOne({'_id':o_id}, {$set:{'status': 'aktivan'}});
                    res.status(200).json({'message': 'Aktiviran nalog'})
                }else{
                    res.status(400).json({'message':'error no user'})
                }
            }
        })
    }

    deactivateCompany = (req: express.Request, res: express.Response) =>{
        let idP = req.body.idP;
        console.log(idP);
        let o_id = new ObjectId(idP);   // id as a string is passed
        console.log(o_id);
        Korisnik.findOne({"_id" : o_id}, (err, preduzece )=>{
            if(err) console.log(err);
            else{
                if(preduzece){
                    console.log("pronasao preduzece")
                    Korisnik.collection.updateOne({'_id':o_id}, {$set:{'status': 'neaktivan'}});
                    res.status(200).json({'message': 'Deaktiviran nalog'})
                }else{
                    res.status(400).json({'message':'error no user'})
                }
            }
        })
    }
}