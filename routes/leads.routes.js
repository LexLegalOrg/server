const express = require("express")
const controller = require('../controllers/leads.controller')
const router = express.Router()

router.get('/', controller.getLeads)
router.get('/delete', controller.deleteAll)

module.exports = router

