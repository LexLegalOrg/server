const mongoose = require('mongoose')

const platformUserModel = new mongoose.Schema({
    email:{
        type: String, 
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true
    },
    assignTo:{
        type:Number,
        required:true
    }
})

module.exports = mongoose.model('platformUser', platformUserModel)
