const mongoose = require('mongoose')

const InfoSchema = mongoose.Schema({
    base_unit:{type:String},
    name:{type:String},
    last:{type:Number},
    buy:{type:Number},
    sell:{type:Number},
    volume:{type:Number},
})

module.exports=mongoose.model('Info',InfoSchema);