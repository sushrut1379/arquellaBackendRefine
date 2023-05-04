const express = require('express');
const loginController = require('../../controllers/auth/loginController');
const router = express.Router();
const registerController = require('../../controllers/auth/registerController');
const auth = require("../../middlewares/auth")
const refreshTokenController = require('../../controllers/auth/refreshTokenController')
const logoutController = require('../../controllers/auth/logOutController')

router.post('/register', registerController)
router.post('/login', loginController)
router.post('/logout', logoutController)
router.post('/refresh', refreshTokenController.refreshToken);





module.exports = router;