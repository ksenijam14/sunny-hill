import mongoose from 'mongoose'

const Schema = mongoose.Schema;

let Planina = new Schema({
    _id:{
        type: Object
    },
    drzava:{
        type: String
    },
    planine:{
        type:Array
    }
})

export default mongoose.model('Planina', Planina, 'planina');