const express = require("express")
const controller = require('../controllers/planning.controller')
const router = express.Router()

router.post('/', controller.createTask)
router.get('/', controller.getAllTasks)
router.get('/task/:id', controller.getTaskById)
router.get('/user/:id', controller.getTasksByUserId)
router.patch('/task/:id', controller.setTaskStatus)
router.delete('/delete', controller.removeAllTasks)
router.delete('/delete/:id', controller.deleteTaskById)

module.exports = router

