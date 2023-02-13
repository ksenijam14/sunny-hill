import mongoose from 'mongoose';

const Schema = mongoose.Schema;

var Rezervacija = new Schema({
    klijent : String,
    br_mesta: Number,
    br_tel: String,
    email: String,
    dodatni_info: String,
    status: String
});

let RezTura = new Schema({
    idPlan:{
        type:String
    },
    naslov:{ //naslov ture, nemam ga ipak
        type:String
    },
    rezervacije:{
        type: [Rezervacija]
    },
    idTure:{
        type: String
    }
})

export default mongoose.model('RezTura', RezTura, 'rez_tura');