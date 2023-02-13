import mongoose from 'mongoose';

const Schema = mongoose.Schema;

let PlaninskaTura = new Schema({
    idP:{
        type: String
    },
    kor_ime:{
        type: String
    },
    nazivP:{
        type:String
    },
    naslov:{
        type: String
    },
    opis:{
        type: String
    },
    program:{
        type: String
    },
    saveti:{
        type: String
    },
    cena:{
        type: Number
    },
    ukljuceno:{
        type: String
    },
    nije_ukljuceno:{
        type: String
    },
    napomene:{
        type: String
    },
    lokacija:{
        type: String
    },
    datum_OD:{
        type: Date
    },
    datum_DO:{
        type: Date
    },
    br_dana:{
        type: Number
    },
    hint_reci:{
        type: String
    },
    slike:{ //slike ture
        type: Array
    }
})

export default mongoose.model('PlaninskaTura', PlaninskaTura, 'planinska_tura');