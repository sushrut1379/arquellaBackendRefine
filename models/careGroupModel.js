const { DataTypes } = require('sequelize')
const sequelize = require('../DataBase/dataBase')

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
    care_group_billing: {
        type: DataTypes.STRING(100),
    }

}, {
    tableName: 'careGroups'
}
)

module.exports = CareGroup