/**
 * Created by dan_g on 5/17/2017.
 */
module.exports = {
	up: function (queryInterface, Sequelize) {
		return queryInterface.bulkInsert("user", [
			{   "id": "9e912cf9-285f-4b2d-9371-2acbf0f48b49",
				"companyId":"2c35de20-5012-11e6-a019-07b01393e1fe",
				"userID": "test1",
				"employeeID": "ddgluck",
				"firstName": "Dan",
				"lastName": "Gluck",
				"password": "$2a$10$GZjM/jK5qeBAeYQEwzGNaecWCxySNx7w4h3NwlZsIVtPRKBubs79S",
				"email": "test1@gmail.com",
				"active": "1",
				"apiKey": "$2a$10$vE31D5mz446doSB4L5UnAu88cfHHKsqTRvvnd7NQZdANcZgF8mMGy",
				"updateUserId":null,
				"createUserId":null,
				"createdAt":"2016-07-22T13:42:46",
				"updatedAt":"2017-02-24T22:09:21"}
		]);
	},

	down: function (queryInterface, Sequelize) {
		return queryInterface.bulkDelete("user", null, {});
	}
};