const bcrypt = require('bcryptjs')
const User = require('../models/platformUser.model')
const jwt = require('jsonwebtoken')

const errorHandler = require('../utils/error.util')
const moment = require('moment')

let keys = {
    jwt: process.env.JWT
}

module.exports.login = async (req, res) => {
    const candidate = await User.findOne({ email: req.body.email })

    if (candidate) {
        // user_exists
        const passwordResult = bcrypt.compareSync(req.body.password, candidate.password)

        if (passwordResult) {
            // generate token, passwords compared
            const token = jwt.sign({
                email: candidate.email,
                userId: candidate._id
            }, keys.jwt, { expiresIn: 60 * 60 * 72})

            res.status(200).json({
                token: `Bearer ${token}`,
                user: {
                    id:candidate._id,
                    email:candidate.email,
                    assignTo:candidate.assignTo
                }
            })
        } else {
            // Error: password_incorrect
            res.status(401).json({ msg: 'password_incorrect' })
        }
    } else {
        //user_not_exists
        res.status(404).json({ msg: 'not_found' })
    }
}

module.exports.register = async (req, res) => {
    const candidate = await User.findOne({
        email: req.body.email
    })

    if (candidate) {
        // User exists, retrieve error
        res.status(409).json({
            msg: 'email_exist'
        })
    } else {
        //Create user
        const salt = bcrypt.genSaltSync(10)

        const password = req.body.password

        const user = new User({
            email: req.body.email,
            password: bcrypt.hashSync(password, salt),
            assignTo: req.body.assignTo
        })

        try {
            await user.save()
            res.status(201).json({
                id: user._id,
                email: user.email,
                assignTo: user.assignTo
            })
        }
        catch (e) {      
            errorHandler(res, e)
        }

    }
}
