import mongoose from 'mongoose';

const Schema = mongoose.Schema;

var Instruktor = new Schema({
    ime_prezime : String,
    drzi_za: Array,
});


let DetaljiFirme = new Schema({
    idF:{
        type: Object
    },
    kor_ime:{
        type: String
    },
    nazivP:{
        type: String
    },
    kategorija:{//hotel, apartmani, ski, planinarsko_drustvo
        type: String
    },
    popust: {
        type: Number
    },
    ocena: {
        type: Number
    },
    komentari: {
        type: Array
    },
    br_zvezdica:{ //hoteli i apartmani imaju
        type: Number
    },
    vrste_soba:{ //hoteli i apartmani imaju
        type: Array
    },
    opremljenost:{ //hoteli i apartmani imaju
        type:Array
    },
    sobe:{ //hoteli i apartmani imaju
        type: Array
    },
    relax:{
        type: Boolean
    },
    dodatne_usluge:{ //hoteli i apartmani imaju
        type: String
    },
    hrana:{ //hoteli i apartmani imaju
        type: Array
    },
    casovi_za:{ //ski skole imaju
        type: Array
    },
    cena_casa:{
        type: Number
    },
    instruktori:{ //ski skole imaju
        type: [Instruktor]
    },
    oprema:{ //ski skole imaju, da, ne, misli se na skijasku opremu
        type: Boolean
    },
    cena_opreme:{ //ski skole imaju, da, ne, misli se na skijasku opremu
        type: Number
    },
    proizvodjaci_opreme:{ //treba da postoji samo ako se moze iznajmiti skijaska oprema
        type: Array
    },
    planine:{ //planinarska drustva imaju, samo niz naziva planina
        type: Array
    },
    slike:{ //slike ponude
        type: Array
    },
    ziro_racuni:{
        type: Array
    },
    rezervacije:{
        type: Array
    }
})

export default mongoose.model('DetaljiFirme', DetaljiFirme, 'detalji_firme');