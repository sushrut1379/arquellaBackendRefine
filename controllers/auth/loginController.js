const User = require("../../models/modalsArquella");
const RefreshToken = require('../../models/refreshTokenModel')
const JwtService = require('../../service/jwtService')
const bcrypt = require('bcrypt')
const Joi = require("joi");
const REFRESH_TOKEN_SECRET="sushrutmahajan"
const catchAsyncErrors = require("../../middlewares/catchAsyncErrors");
const ErrorHandler = require('../../utils/ErrorHandler')


const loginController = catchAsyncErrors(async(req, res, next) => {
    let {email, password} = req.body
    if(!email || !password) {
        return next(new ErrorHandler('Please enter email & password', 400))
    }
    
    //Finds user
    const user = await User.findOne({ where: { email: req.body.email } });
    if (!user)
        return next(new ErrorHandler('Incorrect email please try again', 401))
        
    // compare the password
    const match = await bcrypt.compare(req.body.password, user.password);
    if (!match)
        return next(new ErrorHandler('Please enter correct password', 400))
    
    // Generate token
    const access_token = JwtService.sign({ _id: user.id, email: user.email ,role:user.role });
    const refresh_token = JwtService.sign({ _id: user.id, email: user.email ,role:user.role }, '1y',REFRESH_TOKEN_SECRET);
        
    await RefreshToken.create({ userId:user.id ,email:user.email ,refreshToken:refresh_token })
    res.status(200).json({
        working: 'login successfully',
        reqbody:req.body,
        access_token:access_token,
        refresh_token:refresh_token,
        user:user
    })
})

module.exports = loginController;