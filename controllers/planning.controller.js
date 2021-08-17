const errorUtil = require('../utils/error.util')
const Plan = require('../models/planning.model')

module.exports.createTask = async(req,res)=>{
    try{
        let task = new Plan({
            assign: req.body.assign,
            task:{
                type: req.body.task.type,
                brief: req.body.task.brief
            },
            date:{
                from: req.body.date.from,
                due: req.body.date.due
            },
            status: req.body.status
        })

        await task.save()
        res.json(task)
    }
    catch(e){
        errorUtil(res,e)
    }
}

module.exports.getAllTasks = async(req,res)=>{
    try{
        let task = await Plan.find({})

        res.json(task)
    }
    catch(e){
        errorUtil(res,e)
    }
}

module.exports.getTasksByUserId = async(req,res)=>{
    try{
        let task = await Plan.find({assign: req.params.id})

        res.json(task)
    }
    catch(e){
        errorUtil(res,e)
    }
}

module.exports.getTaskById = async(req,res)=>{
    try{
        let task = await Plan.findOneById({_id: req.params.id})

        res.json(task)
    }
    catch(e){
        errorUtil(res,e)
    }
}

module.exports.setTaskStatus = async(req,res)=>{
    try{
        let task = await Plan.findOneAndUpdate(
            {_id: req.params.id},
            {$set:{
                status: req.body.status
            }},
            {new:true}
            )
        
        res.json(task)
    }
    catch(e){
        errorUtil(res,e)
    }
}

module.exports.deleteTaskById = async(req,res)=>{
    try{
        await Plan.findOneAndDelete({
            _id: req.params.id
        })

        res.json({msg:'deleted_one', success:true})
    }
    catch(e){
        errorUtil(res,e)
    }
}

module.exports.removeAllTasks = async(req,res)=>{
    try{
        await Plan.remove({})

        res.json({msg:'deleted_all', success:true})
    }
    catch(e){
        errorUtil(res,e)
    }
}