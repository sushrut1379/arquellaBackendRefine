

module.exports = (sequelize, DataTypes) => {
    const applicationUsers_careGroups = sequelize.define('applicationUsers_careGroup', {
        applicationUsers_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'applicationUsers', // Replace with the actual table name for User model
                key: 'id',
            },
        },
        careGroup_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'careGroups', // Replace with the actual table name for Group model
                key: 'id',
            },
        },
    },
        {
            sequelize,
            modelName: 'applicationUsers_careGroup',
            timestamps: false, // Disable timestamps for junction tables
        },
        // {
        //     tableName: 'applicationUser_careGroup'
        // }
    )
    return applicationUsers_careGroups
}