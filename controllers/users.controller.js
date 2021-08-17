const { base_url, methods } = require("../utils/url.util")

const errorUtil = require("../utils/error.util")
const axios = require('axios')
const User = require('../models/user.model')

module.exports.saveToDB = async (data) => {
    try{
        let user = new User({
            bitrix_id: data.ID,
            name: data.NAME,
            midname: data.LAST_NAME,
            email: data.EMAIL,
            avatar: data.PERSONAL_PHOTO,
            account:{
                user_type: data.USER_TYPE,
                user_role: data.WORK_POSITION,
                active: data.ACTIVE
            },
            password: ''
        })
    
        await user.save()
        console.log(`${data.NAME} ${data.LAST_NAME} saved at ${new Date().getTime()}`)
    }

    catch(e){
        console.log(e)
    }
}

module.exports._INIT_USERS = async (req,res) => {
    try {
        let options = {
            url: base_url.url + methods.users.get,
            method:'get'
        }

        axios(options)
        .then((response)=>{
            let data = response.data.result 
            
            data.forEach(i => {
                this.saveToDB(i)
            });

            res.json({status: 'users_inited'})
        })
    }
    catch(e){
        console.log(res)
        errorUtil(res,e)
    }
}

module.exports.getUsers = async(req,res)=>{
    try{
      let users = await User.find({})

      res.json(users)
    }
    catch(e){
        errorUtil(res,e)
    }
}

module.exports.getUserById = async(req,res)=>{
    try{
        let user = await User.findOne({
            bitrix_id: req.params.bitrix_id
        })

        res.json(user)
    }

    catch(e){
        errorUtil(res,e)
    }
}

module.exports.getOnlyActiveUsers = async(req,res)=>{
    try{
        let filter = {"account.active":true}

        
      let users = await User.find(filter)

      res.json(users)
    }
    catch(e){
        errorUtil(res,e)
    }
}

module.exports.delete = async(req,res)=>{
    try{
        await User.remove({})

        res.json({status:'ok', msg: 'Users:DeletedAll'})
    }
    catch(e){
        errorUtil(res,e)
    }
}
