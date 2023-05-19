

module.exports = (sequelize, DataTypes) => {
    const applicationUsers_careHomes = sequelize.define('applicationUsers_careHomes', {
        applicationUsers_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'applicationUsers', // Replace with the actual table name for User model
                key: 'id',
            },
        },
        careHomes_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'careHomes', // Replace with the actual table name for Group model
                key: 'id',
            },
        },
    },
        {
            sequelize,
            modelName: 'applicationUsers_careHomes',
            timestamps: false, // Disable timestamps for junction tables
        },
        // {
        //     tableName: 'applicationUser_careGroup'
        // }
    )
    return applicationUsers_careHomes
}