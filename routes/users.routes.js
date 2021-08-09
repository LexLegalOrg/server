const express = require("express")
const controller = require('../controllers/users.controller')
const router = express.Router()

router.get('/', controller.getUsers)
router.get('/init', controller._INIT_USERS)
router.get('/active', controller.getOnlyActiveUsers)
router.get('/delete', controller.delete)

module.exports = router
