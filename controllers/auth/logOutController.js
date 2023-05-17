const catchAsyncErrors = require("../../middlewares/catchAsyncErrors");
const db = require('../../models')
const RefreshToken = db.refreshToken


const logoutController = catchAsyncErrors(async(req, res, next) => {
    await RefreshToken.destroy({where: { email: req.body.email }})
    res.status(200).json({working: 'logout Sucessfully'})
})

module.exports = logoutController;