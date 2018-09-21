/**
 * Created by dan_g on 5/12/2017.
 */

"use strict";
module.exports = {
	up: function (queryInterface, Sequelize) {
		return queryInterface.createTable("user", {
			id: {
				type: Sequelize.UUID,
				allowNull: false,
				defaultValue: Sequelize.UUIDV1,
				unique: true,
				primaryKey: true
			},
			userID: {
				type: Sequelize.STRING,
				allowNull: false,
				unique: true,
				description: "User ID"
			},
			employeeID: {
				type: Sequelize.STRING,
				allowNull: true,
				description: "Employee ID"
			},
			firstName: {
				type: Sequelize.STRING,
				allowNull: false,
				description: "First Name"
			},
			lastName: {
				type: Sequelize.STRING,
				allowNull: false,
				description: "Last Name"
			},
			password: {
				type: Sequelize.STRING,
				allowNull: false,
				description: "Password"
			},
			email: {
				type: Sequelize.STRING,
				allowNull: false,
				description: "Email"
			},
			apiKey: {
				type: Sequelize.TEXT,
				allowNull: true,
				description: "USER API KEY"
			},
			active: {
				type: Sequelize.BOOLEAN,
				allowNull: false,
				default: true,
				description: "Active Switch"
			},
			updateUserId: {
				type: Sequelize.UUID,
				description: "Update User ID"
			},
			createUserId: {
				type: Sequelize.UUID,
				description: "Create User ID"
			},
			createdAt: {
				allowNull: false,
				type: Sequelize.DATE,
				description: "Created Date"
			},
			updatedAt: {
				allowNull: false,
				type: Sequelize.DATE,
				description: "Updated Date"
			},
			companyId: {
				type: Sequelize.UUID,
				references: {
					model: "company",
					key: "id"
				}
			},
		});
	},
	down: function (queryInterface, Sequelize) {
		return queryInterface.dropTable("user");
	}
};