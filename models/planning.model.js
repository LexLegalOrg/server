const mongoose = require('mongoose')

const planningModel = new mongoose.Schema({
    assign:{
        type:Number
    },
    task:{
        type:{
            type:Number    
        },
        brief:{
            type:String
        }
    },
    date:{
        from:{
            type:Date
        },
        due:{
            type:Date
        }
    },
    status:{
        type:String,
        default: 'awaits'
    }

})

module.exports = mongoose.model('planning', planningModel)
