
// response body for below scema
const requestJsonBody = {
    cl_site_ID: 1,
    cll_start_date: '2023-05-11T10:00:00',
    cll_end_date: '2023-05-11T11:00:00',
    cll_duration: 60,
    cll_room: 'Room A',
    cll_type: 'Type A',
    cll_zone: 'Zone A',
    cll_unit_ID: 1,
    cll_db_ref_id: 'ABC123',
    cll_db_date_id: 'DEF456',
    cll_db_time_id: 'GHI789',
    cll_call_group_ID: 1,
    cll_worked_through: 0,
    cll_carer: 'John Doe',
    cll_call_tracking_ref: 'Tracking123',
    cll_clear: 'Clearance A',
    cll_fb_record_id: 'FB123',
    cll_panel_name: 'Panel A',
    cll_journey_ref: 'Journey123',
    cll_caregroup: 'Care Group A',
    cll_carehome: 'Care Home A'
};

module.exports = (sequelize, DataTypes) => {
    const CallModel = sequelize.define('callHistory', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        cl_site_ID: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        cll_start_date: {
            type: DataTypes.DATE
        },
        cll_end_date: {
            type: DataTypes.DATE
        },
        cll_duration: {
            type: DataTypes.INTEGER
        },
        cll_room: {
            type: DataTypes.STRING(250)
        },
        cll_type: {
            type: DataTypes.STRING(250)
        },
        cll_zone: {
            type: DataTypes.STRING(250)
        },
        cll_unit_ID: {
            type: DataTypes.INTEGER
        },
        cll_db_ref_id: {
            type: DataTypes.STRING(45)
        },
        cll_db_date_id: {
            type: DataTypes.STRING(45)
        },
        cll_db_time_id: {
            type: DataTypes.STRING(45)
        },
        cll_call_group_ID: {
            type: DataTypes.INTEGER
        },
        cll_worked_through: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
        cll_carer: {
            type: DataTypes.STRING(100)
        },
        cll_call_tracking_ref: {
            type: DataTypes.STRING(200)
        },
        cll_clear: {
            type: DataTypes.STRING(100)
        },
        cll_fb_record_id: {
            type: DataTypes.STRING(100)
        },
        cll_panel_name: {
            type: DataTypes.STRING(100)
        },
        cll_journey_ref: {
            type: DataTypes.STRING(100)
        },
        cll_caregroup: {
            type: DataTypes.STRING(255)
        },

        cll_carehome: {
            type: DataTypes.STRING(255)
        }


    }, {
        tableName: 'callHistory'
    })
    return CallModel
}















// const { DataTypes } = require('sequelize')
// const sequelize = require('../../DataBase/dataBase')
// const CallModel = sequelize.define('callHistory', {
//     id: {
//         type: DataTypes.INTEGER,
//         primaryKey: true,
//         autoIncrement: true
//     },
//     cl_site_ID: {
//         type: DataTypes.INTEGER,
//         allowNull: false
//     },
//     cll_start_date: {
//         type: DataTypes.DATE
//     },
//     cll_end_date: {
//         type: DataTypes.DATE
//     },
//     cll_duration: {
//         type: DataTypes.INTEGER
//     },
//     cll_room: {
//         type: DataTypes.STRING(250)
//     },
//     cll_type: {
//         type: DataTypes.STRING(250)
//     },
//     cll_zone: {
//         type: DataTypes.STRING(250)
//     },
//     cll_unit_ID: {
//         type: DataTypes.INTEGER
//     },
//     cll_db_ref_id: {
//         type: DataTypes.STRING(45)
//     },
//     cll_db_date_id: {
//         type: DataTypes.STRING(45)
//     },
//     cll_db_time_id: {
//         type: DataTypes.STRING(45)
//     },
//     cll_call_group_ID: {
//         type: DataTypes.INTEGER
//     },
//     cll_worked_through: {
//         type: DataTypes.INTEGER,
//         defaultValue: 0
//     },
//     cll_carer: {
//         type: DataTypes.STRING(100)
//     },
//     cll_call_tracking_ref: {
//         type: DataTypes.STRING(200)
//     },
//     cll_clear: {
//         type: DataTypes.STRING(100)
//     },
//     cll_fb_record_id: {
//         type: DataTypes.STRING(100)
//     },
//     cll_panel_name: {
//         type: DataTypes.STRING(100)
//     },
//     cll_journey_ref: {
//         type: DataTypes.STRING(100)
//     },
//     cll_caregroup: {
//         type: DataTypes.STRING(255)
//     },

//     cll_carehome: {
//         type: DataTypes.STRING(255)
//     }


// }, {
//     tableName: 'callHistory'
// }
// )

// module.exports = CallModel