/**
 * Created by dan_g on 5/13/2017.
 */
var bcrypt = require("bcryptjs");
var crypto = require("crypto");
var Joi = require("joi");
var Boom = require("boom");
var userPlugin = {
	register: function (server, options, next) {

		//object prefix for the routes.
		var object = "user";

		//Get all companies
		//TODO: Must support pagination.
		server.route({
			method: "GET",
			path: "/api/v1/" + object,
			config: {
				tags: ["api"],
				description: "user - Get All",
				notes: "Only returns user's user",
				validate: {
					params: {
						ID: Joi.string().guid()
						// .required()
							.description("the id for the todo item")
					}
				}

			},
			handler: function (request, reply) {
				//database models
				var models = request.models;
				var companyId = request.auth.credentials.companyId;
				var where = {where: {companyId: companyId}};

				models.user.findAll(where).then(function (returnData) {
					reply(returnData);
				}).catch(function (error) {
					server.methods.log("error", "user", error.stack);
					reply(Boom.badRequest(error.message));
				});
			}
		});

		server.route({
			method: "GET",
			path: "/api/v1/" + object + "/search",
			config: {
				tags: ["api"],
				description: "Query by Example",
				notes: "Need to remove from Documentation not callable by a user. Search is done by payload but must be validated.",
				validate: {
					query: {
						name: Joi.string().max(255).description(server.app.i18n.USER.ENTITY_NAME),
						id: Joi.string().description(server.app.i18n.GENERAL.ID),
						createdAt: Joi.date(),
						updatedAt: Joi.date()
					}
				}
			},
			handler: function (request, reply) {
				//database models
				var models = request.models;
				var companyId = request.auth.credentials.companyId;
				var options = {};
				options.where = request.query;
				options.where.companyId = companyId;

				models.user.findAll(options).then(function (returnData) {
					var hits = returnData;
					reply(hits);
				}, function (error) {
					server.methods.log("error", "user", error.stack);
					reply(Boom.badRequest(error.message));
				});
			}
		});

		server.route({
			method: "GET",
			path: "/api/v1/" + object + "/{id}",
			config: {
				tags: ["api"],
				validate: {
					params: {
						id: Joi.string()
							.required()
							.description(server.app.i18n.USER.ENTITY_NAME+" "+server.app.i18n.GENERAL.ID)
					}
				},
				description: "User - Get By ID",
				notes: "Will only return User user is assigned to no matter what user id is passed.",

			},
			handler: function (request, reply) {
				//database models
				var models = request.models;
				var companyId = request.auth.credentials.companyId;
				var options = {};
				options.where = request.query;
				options.where.companyId = companyId;

				models.user.findOne(options).then(function (returnData) {
					var hits = returnData;
					reply(hits);
				}, function (error) {
					server.methods.log("error", "user", error.stack);
					reply(Boom.badRequest(error.message));
				});

			}
		});

		//Create User

		server.route({
			method: "POST",
			path: "/api/v1/" + object,
			config: {
				tags: ["api"],
				description: "User - Create",
				validate: {

					payload: {

						userId:Joi.string().required().description("user ID"),
						employeeId: Joi.string().max(255).description("employee ID"),
						firstName: Joi.string().max(255).description("Lirst Name"),
						lastName: Joi.string().max(255).description("Last Name"),
						password: Joi.string().max(255).description("Password"),
						email: Joi.string().max(255).description("employee ID"),
						apiKey: Joi.string().max(255).description("employee ID"),
						email: Joi.string().email().description("email"),
						active: Joi.string().required().description("Active Switch 0/1")


					}
				}
			},
			handler: function (request, reply) {
				var salt = bcrypt.genSaltSync(10);
				var passwordHash = bcrypt.hashSync(request.payload.password, salt);
				request.payload.password = passwordHash;
				var models = request.models;
				var userId = request.auth.credentials.id;
				var companyId = request.auth.credentials.companyId;
				request.payload.companyId = companyId;
				request.payload.createUserId = userId;
				request.payload.updateUserId = userId;
				console.log(request.payload);
				// request.payload.settings = JSON.stringify(request.payload.settings);
				models.user.create(request.payload).then(function (response) {
					var hits = response;
					reply(hits);
				}).catch(function (error) {
					console.log("error", "user", error.stack);
					reply(Boom.badRequest(error.message));
				});
			}
		});

		//update user

		server.route({
			method: "POST",
			path: "/api/v1/" + object + "/{id}",
			config: {
				tags: ["api"],
				validate: {
					params: {
						id: Joi.string()
							.required()
							.description(server.app.i18n.COMPANY.ENTITY_NAME+" "+ server.app.i18n.GENERAL.ID)
					},
					payload: {


						userId:Joi.string().required().description("user ID"),
						employeeId: Joi.string().max(255).description("employee ID"),
						firstName: Joi.string().max(255).description("Lirst Name"),
						lastName: Joi.string().max(255).description("Last Name"),
						password: Joi.string().max(255).description("Password"),
						apiKey: Joi.string().max(255).description("employee ID"),
						email: Joi.string().email().description("email"),
						active: Joi.string().required().description("Active Switch 0/1")



					}
				},
				description: "User - Update",
				notes: "Will only update user's company regardless of id passed.",

			},
			handler: function (request, reply) {
				var models = request.models;
				var companyId = request.auth.credentials.companyId;
				var where = {where: {companyId: companyId, id: request.params.id}};


				var userId = request.auth.credentials.id;
				request.payload.updateUserId = userId;
				request.payload.companyId = companyId;
				request.payload.id = request.params.id;
				var user;



				console.log(request.payload);




				models.user.findOne(where).then(function (row) {
					return row.update(request.payload);
				}).then(function (response) {
					user = response;
					// server.app.dataCache.drop("user:" + user.id);
					// return //server.methods.checkAndUpdateCellMetrics(models.user, user);
				}).then(function() {
					var hits = user;
					reply(hits);
				}).catch(function (error) {
					console.log("error", "user", error.stack);
					reply(Boom.badRequest(error.message));
				});
			}
		});


		next();
	}
};

userPlugin.register.attributes = {
	name: "userPlugin",
	version: "0.0.1"
};

module.exports = userPlugin;