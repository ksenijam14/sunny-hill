import mongoose from 'mongoose'

const Schema = mongoose.Schema;

let Korisnik = new Schema({
    _id:{
        type: Object //pazi na ovo
    },
    ime_prezime:{
        type: String
    },
    kor_ime:{
        type: String
    },
    lozinka:{
        type: String
    },
    telefon:{
        type: String
    },
    email:{
        type: String
    },
    nazivP:{
        type: String
    },
    drzava:{
        type: String
    },
    planina:{
        type: String
    },
    adresaP:{
        type: String
    },
    PIB:{
        type: String
    },
    maticni:{
        type: String
    },
    status:{ //samo za firme, kupci odmah postaju aktivni cim se registruju
        type: String
    },
    slika: { //firme ce imati naslovnu sliku, ne i kupci
        type: String
    },
    tip:{ //kupac, firma - hotel, ski, plan_drustvo
        type: String
    },
    kategorija:{
        type: String //popunjeno samo za firme, nece se navesti pri inicijalnoj registraciji, vec kasnije
    }
})

export default mongoose.model('Korisnik', Korisnik, 'korisnik');