const express = require('express')
const router = express.Router()
const userController = require('../controller/userController')

router.post('/addUser',userController.ADD)
router.get('/getUser',userController.getAll)
router.put('/update-user',userController.updateByemail)
router.delete('/delete-user',userController.deleteUser)
router.post('/getUserById',userController.getUserByID)

module.exports = router;