

const express = require('express');
const router = express.Router();
const registerController = require('../../controllers/auth/registerController');
const {getUsers, addCareHomeController, getCareGroupController, addCareHomeController2 } = require('../../controllers/careGroupCareHomeController/careGroupCareHomeController')
const auth = require("../../middlewares/auth")

router.get('/getUsers', auth , getUsers)
router.post('/addcarehome', auth , addCareHomeController)
router.post('/getcaregroup', auth , getCareGroupController)

getCareGroupController





module.exports = router;