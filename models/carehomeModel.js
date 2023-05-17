
module.exports = (sequelize, DataTypes) => {
    const CareHome = sequelize.define('careHomes', {
        
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    care_home_name: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
        validate: {
            len: {
                args: [3, 30],
                msg: 'Please enter a valid name'
            }
        },
    },

    care_group_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    care_home_email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
        validate: {
            isEmail: {
                msg: 'Please enter a valid email'
            }
        },
    },
    care_home_contact_no: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
        validate: {
            len: {
                args: [6, 13],
                msg: 'Please enter a valid number'
            }
        },
    },
    care_home_address: {
        type: DataTypes.STRING,
        validate: {
            len: {
                args: [3, 30],
                msg: 'Please enter a valid address'
            }
        },
        allowNull: false,
    },
    number_of_rooms_in_care_home: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    number_of_zones_in_care_home: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },

    number_of_community_rooms_in_care_home: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },

    number_of_en_suites_in_care_home: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },

    care_home_manager_email: {
        type: DataTypes.STRING(50)
    },

}, {
    tableName: 'careHomes'
})
    return CareHome
}







// const { DataTypes } = require('sequelize')
// const sequelize = require('../DataBase/dataBase')

// const CareHome = sequelize.define('careHomes', {

//     id: {
//         type: DataTypes.INTEGER,
//         primaryKey: true,
//         autoIncrement: true
//     },
//     care_home_name: {
//         type: DataTypes.STRING,
//         unique: true,
//         allowNull: false,
//         validate: {
//             len: {
//                 args: [3, 30],
//                 msg: 'Please enter a valid name'
//             }
//         },
//     },

//     care_group_name: {
//         type: DataTypes.STRING,
//         allowNull: false
//     },
//     care_home_email: {
//         type: DataTypes.STRING,
//         unique: true,
//         allowNull: false,
//         validate: {
//             isEmail: {
//                 msg: 'Please enter a valid email'
//             }
//         },
//     },
//     care_home_contact_no: {
//         type: DataTypes.STRING,
//         unique: true,
//         allowNull: false,
//         validate: {
//             len: {
//                 args: [6, 13],
//                 msg: 'Please enter a valid number'
//             }
//         },
//     },
//     care_home_address: {
//         type: DataTypes.STRING,
//         validate: {
//             len: {
//                 args: [3, 30],
//                 msg: 'Please enter a valid address'
//             }
//         },
//         allowNull: false,
//     },
//     number_of_rooms_in_care_home: {
//         type: DataTypes.INTEGER,
//         allowNull: true,
//     },
//     number_of_zones_in_care_home: {
//         type: DataTypes.INTEGER,
//         allowNull: true,
//     },

//     number_of_community_rooms_in_care_home: {
//         type: DataTypes.INTEGER,
//         allowNull: true,
//     },

//     number_of_en_suites_in_care_home: {
//         type: DataTypes.INTEGER,
//         allowNull: true,
//     },

//     care_home_manager_email: {
//         type: DataTypes.STRING(50)
//     },

// }, {
//     tableName: 'careHomes'
// }

// )

// module.exports = CareHome