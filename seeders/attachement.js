/**
 * Created by dan_g on 5/17/2017.
 */
module.exports = {
    up: function (queryInterface, Sequelize) {
        return queryInterface.bulkInsert('attachement', [
            {   "id": "7519a7a0-3474-11e8-b467-0ed5f89f718b",
                "companyId":"2c35de20-5012-11e6-a019-07b01393e1fe",
                "description": "file 1 ",
                "file": "ddgluck",
                "active": "1",
                "updateUserId":null,
                "createUserId":null,
                "createdAt":"2016-07-22T13:42:46",
                "updatedAt":"2017-02-24T22:09:21"}
        ]);
    },

    down: function (queryInterface, Sequelize) {
        return queryInterface.bulkDelete('attachement', null, {});
    }
};