const catchAsyncErrors = require("../../middlewares/catchAsyncErrors");
const { RefreshToken } = require('../../models/refreshTokenModel')


const logoutController = catchAsyncErrors(async(req, res, next) => {
    await RefreshToken.destroy({where: { email: req.body.email }})
    res.status(200).json({working: 'logout Sucessfully'})
})

module.exports = logoutController;