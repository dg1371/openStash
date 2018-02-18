/**
 * Created by dan_g on 5/12/2017.
 */

'use strict';
module.exports = {
    up: function (queryInterface, Sequelize) {
        return queryInterface.createTable('user_group', {
            id: {
                type: Sequelize.UUID,
                allowNull: false,
                defaultValue: Sequelize.UUIDV1,
                unique: true,
                primaryKey: true
            },
            name: {
                type: Sequelize.STRING,
                allowNull: false,
                description: "Name"
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
                    model: 'company',
                    key: 'id'
                }
            },
        });
    },
    down: function (queryInterface, Sequelize) {
        return queryInterface.dropTable('user_group');
    }
};