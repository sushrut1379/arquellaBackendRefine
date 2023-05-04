const { DataTypes } = require('sequelize')
const sequelize = require('../DataBase/dataBase')

const CareHome = sequelize.define('carehome', {
    careHomeName: {
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
    managerName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: {
                args: [3, 25],
                msg: 'Please enter a valid name'
            }
        },
    },
	careGroup: {
		type: DataTypes.STRING,
		allowNull: false
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
    rooms: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    zones: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    enSuites: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    }, {
        tableName: 'CareHomes'
    }
)

module.exports = CareHome