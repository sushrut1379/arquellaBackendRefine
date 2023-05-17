


module.exports = (sequelize, DataTypes) => {
    const RefreshToken = sequelize.define("refreshTokens", {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true,
        },
        user_id: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        refresh_token: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        }
    }, {
        tableName: 'refreshTokens'
    })
    return RefreshToken
}



















// const { Sequelize, DataTypes } = require('sequelize');
// const sequelize = require("../DataBase/dataBase");


// //user modal

// const RefreshToken = sequelize.define("refreshTokens", {
//     id: {
//         type: DataTypes.INTEGER,
//         autoIncrement: true,
//         allowNull: false,
//         primaryKey: true,
//     },
//     user_id: {
//         type: DataTypes.STRING,
//         allowNull: false,
//     },
//     email: {
//         type: DataTypes.STRING,
//         allowNull: false,
//         unique: true,
//     },
//     refresh_token: {
//         type: DataTypes.STRING,
//         allowNull: false,
//         unique: true
//     }
// }, {
//     tableName: 'refreshTokens'
// }
// );



// module.exports = RefreshToken;
