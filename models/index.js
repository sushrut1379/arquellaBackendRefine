
const { Sequelize, DataTypes } = require('sequelize')


const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    logging: false,
    dialect: 'mysql'
})
try {
    sequelize.authenticate()
    console.log('Connection has been established successfully db connect using index file')
} catch (error) {
    console.error('Unable to connect to the database', error)
}

const db = {}
db.Sequelize = Sequelize
db.sequelize = sequelize


db.user = require('./modalsArquella')(sequelize, DataTypes)
db.careGroup = require('./careGroupModel')(sequelize, DataTypes)
db.careHome = require('./careHomeModel')(sequelize, DataTypes)
db.refreshToken = require('./refreshTokenModel')(sequelize, DataTypes)
db.callHistory = require('./callModels/callModel')(sequelize, DataTypes)
db.applicationUsers_careGroups = require('./relationShipsTable/applicationUser_careGroupModel')(sequelize, DataTypes)
db.applicationUsers_careHomes = require('./relationShipsTable/applicationUsers_careHomeModel')(sequelize, DataTypes)


//many to many between application users and caregroups
// In User model
db.user.belongsToMany(db.careGroup, {
    through: db.applicationUsers_careGroups,
    foreignKey: 'applicationUsers_id', // Customize the foreign key name for User model
    otherKey: 'careGroup_id', // Customize the foreign key name for Group model
    uniqueKey: 'my_custom_unique' 
});

// In Group model
db.careGroup.belongsToMany(db.user, {
    through: db.applicationUsers_careGroups,
    foreignKey: 'careGroup_id', // Customize the foreign key name for Group model
    otherKey: 'applicationUsers_id', // Customize the foreign key name for User model
    uniqueKey: 'my_custom_unique' 
});


//many to many between application users and carehomes
// In User model
db.user.belongsToMany(db.careHome, {
    through: db.applicationUsers_careHomes,
    foreignKey: 'applicationUsers_id', // Customize the foreign key name for User model
    otherKey: 'careHomes_id', // Customize the foreign key name for home model
    uniqueKey: 'my_custom_unique_two' 
});

// In carehomes model
db.careHome.belongsToMany(db.user, {
    through: db.applicationUsers_careHomes,
    foreignKey: 'careHomes_id', // Customize the foreign key name for hme model
    otherKey: 'applicationUsers_id', // Customize the foreign key name for User model
    uniqueKey: 'my_custom_unique_two' 
});


// db.user.hasOne(db.refreshToken)

// db.refreshToken.belongsTo(db.user)

db.careGroup.hasMany(db.careHome, {
    foreignKey: "careGroup_id"
})

db.careHome.belongsTo(db.careGroup, {
    foreignKey: "careGroup_id"
})

db.careHome.hasMany(db.callHistory, {
    as: 'callHistory',
    foreignKey: 'careHome_id'
})

db.callHistory.belongsTo(db.careHome, {
    foreignKey: "careHome_id"
})


db.sequelize.sync({ force: false })

module.exports = db