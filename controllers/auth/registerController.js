const { default: CustomErrorHandler } = require("../../service/customErrorHandler")
const sequelize = require("../../DataBase/dataBase");

const ErrorHandler = require('../../utils/ErrorHandler')
const db = require('../../models')
const User = db.user;
const CareGroup = db.careGroup;
const CareHome =db.careHome;
const RefreshToken = db.refreshToken;

const JwtService = require('../../service/jwtService')
const bcrypt = require('bcrypt')
const catchAsyncErrors = require('../../middlewares/catchAsyncErrors');

const registerController = catchAsyncErrors(async (req, res, next) => {
    console.log("req body", req.body);
    let {
        care_group_name,
        care_home_name,
        care_group_address,
        care_home_address,
        care_group_city,
        care_group_country,
        care_group_contact_no,
        care_group_email,
        total_number_of_rooms_in_care_group,
        total_number_of_zones_in_care_group,
        total_number_of_community_rooms_in_care_group,
        total_number_of_en_suites_in_care_group,
        care_home_city,
        care_home_country,
        care_home_contact_no,
        care_home_email,
        number_of_zones_in_care_home,
        number_of_community_rooms_in_care_home,
        number_of_rooms_in_care_home,
        number_of_en_suites_in_care_home,
        user_email_address,
        password,
        no_of_care_homes

    } = req.body;

    //below is request payload send from react.....
    data ={
        "care_group_name": "mahi cg3",
        "care_group_email": "mahi@gmail.com",
        "care_group_contact_no": "25141747",
        "care_home_name": "mahi ch3",
        "care_home_email": "mahich10@gmail.com",
        "care_home_contact_no": "251482393",
        "user_email_address": "test3@gmail.com",
        "care_group_address": "shanti nagar bsl",
        "care_home_address": "shanti nagar bsl",
        "care_group_city": "bhusawal",
        "care_group_country": "India",
        "total_number_of_rooms_in_care_group": 100,
        "total_number_of_zones_in_care_group": 3,
        "total_number_of_community_rooms_in_care_group": 10,
        "total_number_of_en_suites_in_care_group": 20,
        "care_home_city": "bhusawal",
        "care_home_country": "India",
        "number_of_zones_in_care_home": "10",
        "number_of_community_rooms_in_care_home": "10",
        "number_of_rooms_in_care_home": "10",
        "number_of_en_suites_in_care_home": "10",
        "password": "test@123",
        "no_of_care_homes": "10"
    }
    // let { email, password, role, careGroupName, careGroupAddress, mobile, noOfCareHomes,
    //       careHomeName, careHomeAddress, rooms, zones, enSuites, managerName   } = req.body
    let user = await User.findOne({ where: { user_email_address: user_email_address } });
    if (user)
        return next(new ErrorHandler('Email already taken', 400));
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log("hash pass", hashedPassword);
    const maxPrimaryKeyUser = await User.max('id');
    const newPrimaryKeyUser = (maxPrimaryKeyUser || 0) + 1;
    user = await User.create({ id:newPrimaryKeyUser,user_email_address: user_email_address, password: hashedPassword,})

    const maxPrimaryKeyCareGroup = await CareGroup.max('id');
    const newPrimaryKeyCareGroup = (maxPrimaryKeyCareGroup || 0) + 1;

    let careGroup = await CareGroup.create({
        id:newPrimaryKeyCareGroup,
        care_group_name,
        care_group_address,
        care_group_contact_no,
        care_group_email,
        no_of_care_homes,
        care_group_city,
        care_group_country,
        total_number_of_rooms_in_care_group,
        total_number_of_zones_in_care_group,
        total_number_of_community_rooms_in_care_group,
        total_number_of_en_suites_in_care_group,
        care_group_manager_email: user_email_address,
        applicationUsers_id: user.id


    } ).catch(err => {

        if (err) {
            console.log('err in caregoup if', err);
            User.destroy({ where: { user_email_address: user_email_address } })
            //this step get us sequalise error statuse code and type of error
            ErrorHandler.handleSequelizeError(err);
            // throw next(new ErrorHandler('There\'s an issue in Care group fields'+err.parent, 400))
            throw next(new ErrorHandler(ErrorHandler.handleSequelizeError(err).getErrorMessage, ErrorHandler.handleSequelizeError(err).getStatusCode));
        }
    })

   
    if (care_home_email.length>0 && care_home_name.length>0 ) {
        console.log("if condition is running carehome creation ")
        
            const maxPrimaryKeyCareHome = await CareHome.max('id');
            const newPrimaryKeyCareHome = (maxPrimaryKeyCareHome || 0) + 1;
        
            await CareHome.create({
                id:newPrimaryKeyCareHome,
                care_home_name,
                care_home_address,
                care_home_contact_no,
                care_home_email,
                care_group_name: care_group_name,
                care_home_city,
                care_home_country,
                number_of_rooms_in_care_home,
                number_of_zones_in_care_home,
                number_of_en_suites_in_care_home,
                number_of_community_rooms_in_care_home,
                care_home_manager_email: user_email_address,
                careGroup_id: careGroup.id
            }).catch(err => {
        
                if (err) {
                    console.log('err in carehome if', err);
                    User.destroy({ where: { user_email_address: user_email_address } })
                    CareGroup.destroy({ where: { care_group_email: care_group_email } })
                    ErrorHandler.handleSequelizeError(err);
                    throw next(new ErrorHandler(ErrorHandler.handleSequelizeError(err).getErrorMessage, ErrorHandler.handleSequelizeError(err).getStatusCode),);
                }
            })
    }
    let access_token = JwtService.sign({ _id: user.dataValues.id, role: user.dataValues.role })
    // let refresh_token = JwtService.sign({ _id: user.dataValues.id, email: user.dataValues.user_email_address, role: user.dataValues.role }, '1y', process.env.JWT_SECRET);
    // await RefreshToken.create({ userId: user.dataValues.id, email: user.dataValues.email, refreshToken: refresh_token })
    res.status(200).json({ message: 'User created successfully', access_token: access_token })
})

module.exports = registerController;