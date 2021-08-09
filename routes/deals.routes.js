const express = require("express")
const controller = require('../controllers/deals.controller')
const router = express.Router()

router.get('/', controller.getDeals)


module.exports = router

