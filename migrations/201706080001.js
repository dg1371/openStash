/**
 * Created by dan_g on 6/8/2017.
 */

'use strict';
module.exports = {
    up: function (queryInterface, Sequelize) {
        return queryInterface.createTable('attachement', {
            id: {
                type: Sequelize.UUID,
                allowNull: false,
                defaultValue: Sequelize.UUIDV1,
                unique: true,
                primaryKey: true
            },
            description: {
                type: Sequelize.STRING,
                allowNull: true,
                description: "Attachement Description"
            },
            file: {
                type: Sequelize.BLOB,
                allowNull: true,
                description: "Attachement"
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
                    model: 'company',
                    key: 'id'
                }
            },
        });
    },
    down: function (queryInterface, Sequelize) {
        return queryInterface.dropTable('attachement');
    }
};