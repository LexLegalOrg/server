const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    bitrix_id:{
        type:Number
    },
    name:{
        type:String,
        required: true
    },
    password:{
        type:String
    },
    midname:{
        type:String,
        required:true
    },
    email:{
        type:String,
        unique: true,
        required: true
    },
    rating:{
        type: Number
    },
    avatar:{
        type:String
    },
    account:{
        type:Object,
        user_type:{
            type:String
        },
        user_role:{
            type:String
        },
        active:{
            type:Boolean
        }
    }
    
})

module.exports = mongoose.model('users',userSchema)