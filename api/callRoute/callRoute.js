const express = require('express');
const router = express.Router();
const auth = require("../../middlewares/auth")
const {addCallController, clearCallController } = require('../../controllers/callController/callController')

router.post('/addcall', auth , addCallController);
router.delete('/delete', clearCallController)



module.exports = router;
