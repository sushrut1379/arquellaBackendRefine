const { default: CustomErrorHandler } = require("../../service/customErrorHandler")
const sequelize = require("../../DataBase/dataBase");

const ErrorHandler = require('../../utils/ErrorHandler')
const User = require("../../models/modalsArquella");
const CareGroup = require('../../models/careGroupModel')
const CareHome = require('../../models/careHomeModel')
const JwtService = require('../../service/jwtService')
const bcrypt = require('bcrypt')
const catchAsyncErrors = require('../../middlewares/catchAsyncErrors')

const registerController = catchAsyncErrors(async(req, res, next) => {
    let { email, password, role, careGroupName, careGroupAddress, mobile, noOfCareHomes,
          careHomeName, careHomeAddress, rooms, zones, enSuites, managerName   } = req.body
    let user = await User.findOne({ where: { email: req.body.email } });
    if(user)
        return next(new ErrorHandler('Email already taken', 400))
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log("hash pass", hashedPassword)
    await User.create({ email, password : hashedPassword, role }).then(result=> {
        access_token = JwtService.sign({ _id: result.id, role: result.role })
    })
    await CareGroup.create({ careGroupName, address: careGroupAddress, mobile, email, careHomes: noOfCareHomes }).catch(err=> {
        if(err) {
            User.destroy({where: {email}})
            console.log(err)
            return next(new ErrorHandler('There\'s an issue in Care group fields'+err.message, 400))
        }
    })
    await CareHome.create({ careHomeName, address: careHomeAddress, mobile, email, careGroup: careGroupName, rooms, zones, enSuites, managerName }).catch(err=> {
        if(err) {
            User.destroy({where: {email}})
            CareGroup.destroy({where: {careGroupName}})
            return next(new ErrorHandler('There\'s an issue in Care home fields'+err.message, 400))
        }
    })
    res.status(200).json({message: 'User created successfully', access_token: access_token})  

})

module.exports = registerController;