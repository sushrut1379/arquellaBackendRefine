const { DataTypes } = require('sequelize')
const sequelize = require('../DataBase/dataBase')

const User = sequelize.define('applicationUsers', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  user_email_address: {
    type: DataTypes.STRING,
    unique: true,
    validate: {
      isEmail: {
        msg: 'Please enter a valid email'
      }
    },
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  role: {
    type: DataTypes.ENUM('admin', 'user'),
    defaultValue: 'user'
  }
}, {
  tableName: 'applicationUsers'
}
)

module.exports = User
