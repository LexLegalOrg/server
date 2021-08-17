const errorUtil = require("../utils/error.util")
const Bonus = require('../models/bonuses.model')
const e = require("express")

module.exports.INIT = async (req, res) => {
    try {
        let bonus = new Bonus({
            isSet: true,
            sum: req.body.sum
        })

        await bonus.save()
        res.json(bonus)

    }
    catch (e) {
        console.log(e)
        errorUtil(res, e)
    }
}

module.exports.getBonus = async (req, res) => {
    try {
        let bonus = await Bonus.find({})

        res.json(bonus[0])
    }
    catch (e) {
        errorUtil(res, e)
    }
}

module.exports.editBonus = async (req, res) => {
    try {
        let bonus = await Bonus.find({})

        let edit = await Bonus.findOneAndUpdate(
            { _id: bonus[0]._id },
            {
                $set: {
                    sum: req.body.sum
                }
            },
            { new: true }
        )

        res.json(bonus)
    }
    catch (e) {
        errorUtil(res, e)
    }
}

module.exports.catchBonus = async (req, res) => {
    try {
        let bonus = await Bonus.find({})

        let toSave = {
            user_id: req.body.user_id,
            await_summ: req.body.await_summ,
            created_at: new Date().getTime(),
            accept: undefined
        }

        let edit = await Bonus.findOneAndUpdate(
            { _id: bonus[0]._id },
            {
                $push: {
                    tickets: toSave
                }
            },
            { new: false }
        )

        res.json(edit)
    }
    catch (e) {
        errorUtil(res, e)
    }
}


module.exports.getMyBonus = async (req, res) => {
    try {
        let bonus = await Bonus.find({})
        let result = []
        await bonus[0].tickets.forEach(item => {
            if (item.user_id == req.params.user_id) {
                result.push(item)
            }
        })

        res.json(result)

    }
    catch (e) {
        errorUtil(res, e)
    }
}

module.exports.bonusAcceptance = async (req, res) => {
    try {
        let bonus = await Bonus.find({})

        await bonus[0].tickets.forEach(item => {
            if (item.created_at == req.body.created_at) {
                 Bonus.findOneAndUpdate({
                    "bonus.tickets": {
                        created_at: req.body.created_at
                    },
                    $set: {
                        item: {
                            user_id: item.user_id,
                            await_summ: item.await_summ,
                            created_at: item.created_at,
                            accept: req.body.accept
                        }
                    }
                },
                    { new: true }
                )
            }
        })

        if (req.body.accept == true) {
            res.json({ ticket_id: req.body.created_at, status: 'accepted' })
        }
        else {
            res.json({ ticket_id: req.body.created_at, status: 'not accepted' })
        }
    }
    catch (e) {
        errorUtil(res, e)
    }
}