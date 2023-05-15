
const CallModel = require('../../models/callModels/callModel');
const catchAsyncErrors = require('../../middlewares/catchAsyncErrors');
const ErrorHandler = require('../../utils/ErrorHandler')
const CareGroup = require('../../models/careGroupModel')
const CareHome = require('../../models/careHomeModel')

//request body for call controller
const jsonObject = {
    "CareHomeName": "Care Group A",
    "CareGroupName": "Care Home A",
    "callData": [
        {
            "objectProperty1": "value3",
            "objectProperty2": "value4"
        },
        {
            "objectProperty1": "value5",
            "objectProperty2": "value6"
        }
    ]
};




const addCallController =
    catchAsyncErrors(async (req, res, next) => {
        let careGroupName = req.body.CareGroupName;
        let careHomeName = req.body.CareHomeName;
        let callDataArray = req.body.callData;

        // console.log("block runni++++n", req.body);
        // console.log("block runni++++n", req.body.callData);

        let careGroup = await CareGroup.findOne({ where: { care_group_name: careGroupName } });
        let careHome = await CareHome.findOne({ where: { care_home_name: careHomeName } });

        if (careGroup === null) {
            throw next(new ErrorHandler('Care Group name is not present in DataBasse', 500))
        } else {
            console.log("care group", careGroup instanceof CareGroup); // true
            console.log(careGroup.dataValues.id ,careGroup.dataValues.care_group_name); // 'My Title'
        }

        if (careHome === null) {
            throw next(new ErrorHandler('Care Home name is not present in Database', 500))
        } else {
            console.log("care group", careHome instanceof CareHome); // true
            console.log(careHome.dataValues.id , careHome.dataValues.care_home_name); // 'My Title'
        }

        const callDataArrayMapWithFK =await callDataArray.map(obj => {
            // Replace the property names below with the ones you want to change
            obj.cll_caregroup=careGroup.dataValues.care_group_name;
            obj.cll_carehome=careHome.dataValues.care_home_name;
            obj.careHome_id=careHome.dataValues.id;
            return obj;
          });

        // console.log("care home and caregroup data" , careGroup , careHome);

        // console.log("req body", callDataArray);
        // following is aarya data object format
        let {
            cl_site_ID,
            cll_start_date,
            cll_end_date,
            cll_duration,
            cll_room,
            cll_type,
            cll_zone,
            cll_unit_ID,
            cll_db_ref_id,
            cll_db_date_id,
            cll_db_time_id,
            cll_call_group_ID,
            cll_worked_through,
            cll_carer,
            cll_call_tracking_ref,
            cll_clear,
            cll_fb_record_id,
            cll_panel_name,
            cll_journey_ref,
            cll_caregroup,
            cll_carehome
        } = req.body;

        //saving to database call records
        await CallModel.bulkCreate(callDataArray).catch(err => {
            console.log("error in call model", err);
            // if (err) {
            //     User.destroy({ where: { email: userEmailAddress } })
            // }
            throw next(new ErrorHandler('There\'s an issue in callmodel modelfields', 500))
        })


        console.log('call controller hitted', req.user);
        res.status(200).json({
            message: 'Call Data save successfully',
             callDataArrayy: callDataArrayMapWithFK
        })

    });

    const getCallHistoryController = catchAsyncErrors(async (req, res, next) => {
        let { careHomeName } = req.body
        console.log("get call history hitted " , careHomeName);

        let careHomeAndCallHistroy= await CareHome.findOne({
            include: [
                { model: CallModel, as: 'callHistory' }
            ],
            where: { care_home_name: careHomeName }
        })
    
        
        res.status(200).json({
            message: 'Care Home added sucessfully',
            data:  careHomeAndCallHistroy
        })
    
    })








const clearCallController = catchAsyncErrors(async (req, res, next) => {
    let { uid } = req.body
    await CallModel.destroy({ where: { uid } }).then(result => {
        if (result == 1)
            res.status(200).json({ message: 'Call cleared successfully ' })
        else
            res.status(404).json({ message: 'Call not found' })
    })
})



module.exports = { addCallController, clearCallController, getCallHistoryController };



// const clearCallController = catchAsyncErrors(async (req, res, next) => {
//     let { uid } = req.body
//     await CallModel.destroy({ where: { uid } }).then(result => {
//         if (result == 1)
//             res.status(200).json({ message: 'Call cleared successfully ' })
//         else
//             res.status(404).json({ message: 'Call not found' })
//     })
// })