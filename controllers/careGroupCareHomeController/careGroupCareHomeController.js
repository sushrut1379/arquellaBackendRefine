
const catchAsyncErrors = require("../../middlewares/catchAsyncErrors");
const ErrorHandler = require('../../utils/ErrorHandler')
const CareGroup = require('../../models/careGroupModel')
const CareHome = require('../../models/careHomeModel')
const User = require("../../models/modalsArquella");


const getCareGroupCareHome = catchAsyncErrors(async (req, res, next) => {
    console.log("+++", req.user);
    let careGroup = await CareGroup.findOne({ where: { managerEmail: req.user.email } })

    let careHome = await CareHome.findOne({ where: { managerEmail: req.user.email } })
    console.log("cp res", careGroup);
    //test commit
    // let {email, password} = req.body
    // if(!email || !password) {
    //     return next(new ErrorHandler('Please enter email & password', 400))
    // }


    res.status(200).json({
        working: 'care group and care home successfully',
        careGroupOfManager: careGroup,
        careHomeOfManager: careHome

    })
})

let CareHomeData = {
    "care_home_name": "Example Care Home",
    "care_home_address": "123 Care Home Street",
    "care_home_contact_no": "123-456-7890",
    "care_home_email": "carehome@example.com",
    "care_home_city": "Example City",
    "care_home_country": "Example Country",
    "number_of_rooms_in_care_home": 50,
    "number_of_zones_in_care_home": 3,
    "number_of_en_suites_in_care_home": 20,
    "number_of_community_rooms_in_care_home": 2,
    "care_home_manager_email": "manager@example.com",
    "careGroup_id": 1,
    "care_group_name": "Example Care Group"
}


const addCareHomeController = catchAsyncErrors(async (req, res, next) => {
    let {
        care_home_name,
        care_home_address,
        care_home_contact_no,
        care_home_email,
        care_home_city,
        care_home_country,
        number_of_rooms_in_care_home,
        number_of_zones_in_care_home,
        number_of_en_suites_in_care_home,
        number_of_community_rooms_in_care_home,
        care_home_manager_email,
        careGroup_id,
        care_group_name
    } = req.body

    console.log("addcarehome controller", req.body);

    let user = await User.findOne({ where: { user_email_address: care_home_manager_email } });
    let careGroup = await CareGroup.findOne({ where: { care_group_name: care_group_name } });
  
    // let careHomeDb = await CareHome.findOne({ where: { care_home_name: care_home_name } });
    // let careHomeDbemail = await CareHome.findOne({ where: { care_home_email} });
    // let careHomeDbContactNo = await CareHome.findOne({ where: { care_home_contact_no: care_home_contact_no } });




    if (user === null) {
        throw next(new ErrorHandler('manager email is not present in ApplicationUser DataBasse before this regiter using this email', 400))
    }
    if (careGroup === null) {
        throw next(new ErrorHandler('Care Group name is not present in CareGroup DataBasse regiter using this Care Group Name', 400));
    }


    // if (careHomeDb.dataValues.care_home_name==care_home_name) {
    //     throw next(new ErrorHandler('Care Home name is already present', 400));
    // }

    // if (
    //     careHomeDbemail.dataValues.care_home_email== care_home_email) {
    //     throw next(new ErrorHandler('Care Home email is already present', 400));
    // }

    // if ( careHomeDbContactNo.dataValues.care_home_contact_no == care_home_contact_no) {
    //     throw next(new ErrorHandler('Care Home contact no is already present', 400));
    // }


    let careHome = await CareHome.create({
        care_home_name,
        care_home_address,
        care_home_contact_no,
        care_home_email,
        care_home_city,
        care_home_country,
        number_of_rooms_in_care_home,
        number_of_zones_in_care_home,
        number_of_en_suites_in_care_home,
        number_of_community_rooms_in_care_home,
        care_home_manager_email: user.dataValues.user_email_address,
        care_group_name: careGroup.dataValues.care_group_name,
        careGroup_id: careGroup.dataValues.id
    }).catch(err => {
        console.log('err in caregoup', err);

        if (err) {
            console.log('err in carehome if', err);
            throw next(new ErrorHandler('There\'s an issue in Care home fields' + err.parent, 400))
        }
    })




    res.status(200).json({
        message: 'Care Home added sucessfully',
        careHome: careHome
    })
})

const getCareGroupController = catchAsyncErrors(async (req, res, next) => {
    let { care_group_name } = req.body
    console.log("get craregrupu ctrl hitted", care_group_name);

    let careGroup = await CareGroup.findAll({include:CareHome
    });

    let careGroupbyId = await CareGroup.findOne({include:CareHome});

   let careGroupByName= await CareGroup.findOne({
        include: [
            { model: CareHome, as: 'careHomes' }
        ],
        where: { care_group_name: care_group_name }
    })

    
    res.status(200).json({
        message: 'Care Home added sucessfully',
        data:  careGroupByName
    })

    //   careGroup.getCareGroupCareHome()

    // await CallModel.destroy({ where: { uid } }).then(result => {
    //     if (result == 1)
    //         res.status(200).json({ message: 'Call cleared successfully ' })
    //     else
    //         res.status(404).json({ message: 'Call not found' })
    // })
})


module.exports = {
    getCareGroupCareHome,
    addCareHomeController,
    getCareGroupController

}
