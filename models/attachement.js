/**
 * Created by dan_g on 5/12/2017.
 */
module.exports = function (sequelize, DataTypes) {
	var Attachement = sequelize.define("attachement", {
		id: {type: DataTypes.UUID, allowNull: false, defaultValue: DataTypes.UUIDV1, unique: true, primaryKey: true, description: "ID"},
		companyId: {type: DataTypes.UUID, description: "Company ID"},
		description: {type: DataTypes.STRING, allowNull: true, description: "Attachement Description"},
		file: {type: DataTypes.BLOB, allowNull: true, description: "Attachement"},
		active: {type: DataTypes.BOOLEAN, allowNull: true, defaultValue: true, description: "Active"},
		updateUserId: {type: DataTypes.UUID, description: "Update User ID"},
		createUserId: {type: DataTypes.UUID, description: "Create User ID"},
		createdAt: {type: DataTypes.DATE, description: "Created Date"},
		updatedAt: {type: DataTypes.DATE, description: "Updated Date"}
	}, {
		description: "Attachement",
		freezeTableName: true // Model tableName will be the same as the model name
	});



	return Attachement;
};