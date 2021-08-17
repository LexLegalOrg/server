const mongoose = require('mongoose')

const bonuseSchema = new mongoose.Schema({
    isSet:{
        type:Boolean,
        default:false
    },
    sum: {
        type: Number,
        default: 0
    },
    tickets:{
        type:Array,
        user_id:{
            type:Number
        },
        await_summ:{
            type:Number,
            default:0
        },
        created_at:{
            type:Date
        },
        accept:{
            type: Boolean,
            default: false
        }
    },
    catched_at:{
        type: Date
    }
})

module.exports = mongoose.model('bonuse', bonuseSchema)
