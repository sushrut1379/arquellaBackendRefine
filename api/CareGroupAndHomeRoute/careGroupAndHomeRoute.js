

const express = require('express');
const router = express.Router();
const registerController = require('../../controllers/auth/registerController');
const {getCareGroupCareHome, addCareHomeController, getCareGroupController} = require('../../controllers/careGroupCareHomeController/careGroupCareHomeController')
const auth = require("../../middlewares/auth")

router.post('/caregroupandhomes', auth , getCareGroupCareHome)
router.post('/addcarehome', auth , addCareHomeController)
router.post('/getcaregroup', auth , getCareGroupController)

getCareGroupController





module.exports = router;