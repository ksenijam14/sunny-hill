import mongoose from 'mongoose';

const Schema = mongoose.Schema;

var Rezervacija = new Schema({
    datum : Date,
    vreme: String,
    renta_opreme: Boolean,
    status: String,
    klijent: String
});

let RezSkijanja = new Schema({
    id_instruktora:{
        type: String
    },
    kor_ime:{
        type:String
    },
    rezervacije:{
        type: [Rezervacija]
    },
    idSkole:{
        type: String
    }
})

export default mongoose.model('RezSkijanja', RezSkijanja, 'rez_ski');