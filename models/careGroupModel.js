
const reqBodyCreGroup = {
    "care_group_name": "Sample Care Group",
    "no_of_care_homes": 5,
    "care_group_email": "caregroup@example.com",
    "care_group_contact_no": "1234567890",
    "care_group_address": "123 Main Street",
    "care_group_city": "City",
    "care_group_country": "Country",
    "care_group_manager_email": "manager@example.com",
    "total_number_of_rooms_in_care_group": 100,
    "total_number_of_zones_in_care_group": 3,
    "total_number_of_community_rooms_in_care_group": 10,
    "total_number_of_en_suites_in_care_group": 20,
    "care_group_billing": "Billing information"
  }
  
module.exports = (sequelize, DataTypes) => {
    const CareGroup = sequelize.define('careGroups', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        care_group_name: {
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
        no_of_care_homes: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    
    
        care_group_email: {
            type: DataTypes.STRING(50),
            unique: true,
            allowNull: false,
            validate: {
                isEmail: {
                    msg: 'Please enter a valid email'
                }
            },
        },
        care_group_contact_no: {
            type: DataTypes.STRING(50),
            allowNull: false,
            validate: {
                len: {
                    args: [6, 13],
                    msg: 'Please enter a valid number'
                }
            },
        },
        care_group_address: {
            type: DataTypes.STRING,
            validate: {
                len: {
                    args: [3, 30],
                    msg: 'Please enter a valid address'
                }
            },
            allowNull: false,
        },
    
        care_group_city: {
            type: DataTypes.STRING
        },
    
        care_group_country: {
            type: DataTypes.STRING
        },
    
    
        care_group_manager_email: {
            type: DataTypes.STRING(50)
        },
    
        total_number_of_rooms_in_care_group: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        total_number_of_zones_in_care_group: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    
        total_number_of_community_rooms_in_care_group: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    
        total_number_of_en_suites_in_care_group: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    
        care_group_billing: {
            type: DataTypes.STRING(100),
        }
    
    }, {
        tableName: 'careGroups'
    }
    )
    return CareGroup
}




// const { DataTypes } = require('sequelize')
// const sequelize = require('../DataBase/dataBase')

// const CareGroup = sequelize.define('careGroups', {
//     id: {
//         type: DataTypes.INTEGER,
//         primaryKey: true,
//         autoIncrement: true
//     },
//     care_group_name: {
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
//     no_of_care_homes: {
//         type: DataTypes.INTEGER,
//         allowNull: false,
//     },


//     care_group_email: {
//         type: DataTypes.STRING(50),
//         unique: true,
//         allowNull: false,
//         validate: {
//             isEmail: {
//                 msg: 'Please enter a valid email'
//             }
//         },
//     },
//     care_group_contact_no: {
//         type: DataTypes.STRING(50),
//         allowNull: false,
//         validate: {
//             len: {
//                 args: [6, 13],
//                 msg: 'Please enter a valid number'
//             }
//         },
//     },
//     care_group_address: {
//         type: DataTypes.STRING,
//         validate: {
//             len: {
//                 args: [3, 30],
//                 msg: 'Please enter a valid address'
//             }
//         },
//         allowNull: false,
//     },

//     care_group_city: {
//         type: DataTypes.STRING
//     },

//     care_group_country: {
//         type: DataTypes.STRING
//     },


//     care_group_manager_email: {
//         type: DataTypes.STRING(50)
//     },

//     total_number_of_rooms_in_care_group: {
//         type: DataTypes.INTEGER,
//         allowNull: false,
//     },
//     total_number_of_zones_in_care_group: {
//         type: DataTypes.INTEGER,
//         allowNull: false,
//     },

//     total_number_of_community_rooms_in_care_group: {
//         type: DataTypes.INTEGER,
//         allowNull: false,
//     },

//     total_number_of_en_suites_in_care_group: {
//         type: DataTypes.INTEGER,
//         allowNull: false,
//     },

//     care_group_billing: {
//         type: DataTypes.STRING(100),
//     }

// }, {
//     tableName: 'careGroups'
// }

// )

// module.exports = CareGroup