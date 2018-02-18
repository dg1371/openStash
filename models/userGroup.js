/**
 * Created by dan_g on 5/12/2017.
 */
module.exports = function (sequelize, DataTypes) {
    var UserGroup = sequelize.define("user_group", {
        id: {type: DataTypes.UUID, allowNull: false, defaultValue: DataTypes.UUIDV1, unique: true, primaryKey: true, description: "ID"},
        companyId: {type: DataTypes.UUID, description: "Company ID"},
        name: {type: DataTypes.STRING, allowNull: false, description: "Name"},
        updateUserId: {type: DataTypes.UUID, description: "Update User ID"},
        createUserId: {type: DataTypes.UUID, description: "Create User ID"},
        createdAt: {type: DataTypes.DATE, description: "Created Date"},
        updatedAt: {type: DataTypes.DATE, description: "Updated Date"}
    }, {
        description: "User Group",
        classMethods: {
            associate: function (model) {
                return this.belongsTo(model.company);
            }
        },
        freezeTableName: true // Model tableName will be the same as the model name
    });

    return UserGroup;
};