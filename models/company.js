/**
 * Created by dan_g on 5/12/2017.
 */
module.exports = function (sequelize, DataTypes) {
	var Company = sequelize.define("company", {
		id: {type: DataTypes.UUID, allowNull: false, defaultValue: DataTypes.UUIDV1, unique: true, primaryKey: true, description: "ID"},
		name: {type: DataTypes.STRING, allowNull: false, description: "Name"},
		updateUserId: {type: DataTypes.UUID, description: "Update User ID"},
		createUserId: {type: DataTypes.UUID, description: "Create User ID"},
		createdAt: {type: DataTypes.DATE, description: "Created Date"},
		updatedAt: {type: DataTypes.DATE, description: "Updated Date"}
	}, {
		description: "Company",
		freezeTableName: true // Model tableName will be the same as the model name
	});

	return Company;
};
