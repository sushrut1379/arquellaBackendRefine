
const express = require('express');
const router = express.Router();
const auth = require("../../middlewares/auth")
const manageUsers = require("../../controllers/manageUserController/manageUsers")

router.get('/getUsers',auth,manageUsers.getUserController.getUsers)
router.post('/updateUserById',auth,manageUsers.updateUserController.updateUsers)


module.exports = router;