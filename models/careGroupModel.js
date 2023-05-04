const { DataTypes } = require('sequelize')
const sequelize = require('../DataBase/dataBase')

const CareGroup = sequelize.define('caregroup', {
    careGroupName: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false,
        validate: {
            len: {
                args: [3, 15],
                msg: 'Please enter a valid name'
            }
        },
    },
    careHomes: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
        validate: {
            isEmail: {
                msg: 'Please enter a valid email'
            } 
        },
    },
    mobile: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
        validate: {
          len: {
            args : [10, 13],
            msg : 'Please enter a valid number'
          } 
        },
    },
    address: {
        type: DataTypes.STRING,
        validate: {
            len: {
                args: [10, 30],
                msg: 'Please enter a valid address'
            }
        },
        allowNull: false,
    },
    billing: {
        type: DataTypes.STRING,
    }
    }, {
        tableName: 'CareGroups'
    }
)

module.exports = CareGroup