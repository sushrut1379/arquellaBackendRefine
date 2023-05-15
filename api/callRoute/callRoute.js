const express = require('express');
const router = express.Router();
const auth = require("../../middlewares/auth")
const {addCallController, clearCallController, getCallHistoryController } = require('../../controllers/callController/callController')

router.post('/addcall', auth , addCallController);
router.post('/getcallhistory', auth , getCallHistoryController);

router.delete('/delete', clearCallController);



module.exports = router;
