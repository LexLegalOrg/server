const express = require("express")
const controller = require('../controllers/bonuses.controller')
const router = express.Router()

router.post('/init', controller.INIT)
router.get('/get', controller.getBonus)
router.get('/get/:user_id', controller.getMyBonus)
router.patch('/edit', controller.editBonus)
router.patch('/catch', controller.catchBonus)
router.patch('/accept', controller.bonusAcceptance)

module.exports = router