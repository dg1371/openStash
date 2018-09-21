/**
 * Created by dan_g on 5/13/2017.
 */

var Joi = require("joi");
var Boom = require("boom");
var attachementPlugin = {
	register: function (server, options, next) {

		//object prefix for the routes.
		var object = "attachement";

		//Get all attachements
		//TODO: Must support pagination.
		server.route({
			method: "GET",
			path: "/api/v1/" + object,
			config: {
				tags: ["api"],
				description: "attachement - Get All",
				notes: "Only returns attachement's attachement",
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

				models.attachement.findAll(where).then(function (returnData) {
					reply(returnData);
				}).catch(function (error) {
					server.methods.log("error", "attachement", error.stack);
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
				notes: "Need to remove from Documentation not callable by a attachement. Search is done by payload but must be validated.",
				validate: {
					query: {
						description: Joi.string().max(255).description(server.app.i18n.USER.ENTITY_NAME),
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

				models.attachement.findAll(options).then(function (returnData) {
					var hits = returnData;
					reply(hits);
				}, function (error) {
					server.methods.log("error", "attachement", error.stack);
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
				description: "attachement - Get By ID",
				notes: "Will only return attachement attachement is assigned to no matter what attachement id is passed.",

			},
			handler: function (request, reply) {
				//database models
				var models = request.models;
				var companyId = request.auth.credentials.companyId;
				var options = {};
				options.where = request.query;
				options.where.companyId = companyId;

				models.attachement.findOne(options).then(function (returnData) {
					var hits = returnData;
					reply(hits);
				}, function (error) {
					server.methods.log("error", "attachement", error.stack);
					reply(Boom.badRequest(error.message));
				});

			}
		});

		//Create attachement

		server.route({
			method: "POST",
			path: "/api/v1/" + object,
			config: {
				plugins: {
					"hapi-swagger": {
						payloadType: "form"
					}
				},
				tags: ["api"],
				description: "attachement - Create",
				validate: {

					payload: {
						description: Joi.string().max(255).description("Description"),
						active: Joi.string().required().description("Active Switch 0/1"),
						file: Joi.any().meta({swaggerType: "file" }).description("json file")
					}
				}
			},
			handler: function (request, reply) {

				var models = request.models;
				var userId = request.auth.credentials.id;
				var companyId = request.auth.credentials.companyId;
				request.payload.companyId = companyId;
				request.payload.createUserId = userId;
				request.payload.updateUserId = userId;
				console.log(request.payload);
				// request.payload.settings = JSON.stringify(request.payload.settings);
				models.attachement.create(request.payload).then(function (response) {
					var hits = response;
					reply(hits);
				}).catch(function (error) {
					console.log("error", "attachement", error.stack);
					reply(Boom.badRequest(error.message));
				});
			}
		});

		//update attachement

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
				description: "attachement - Update",
				notes: "Will only update attachement's company regardless of id passed.",

			},
			handler: function (request, reply) {
				var models = request.models;
				var companyId = request.auth.credentials.companyId;
				var where = {where: {companyId: companyId, id: request.params.id}};


				var userId = request.auth.credentials.id;
				request.payload.updateUserId = userId;
				request.payload.companyId = companyId;
				request.payload.id = request.params.id;
				var attachement;



				console.log(request.payload);




				models.attachement.findOne(where).then(function (row) {
					return row.update(request.payload);
				}).then(function (response) {
					attachement = response;
					// server.app.dataCache.drop("attachement:" + user.id);
					// return //server.methods.checkAndUpdateCellMetrics(models.user, user);
				}).then(function() {
					var hits = attachement;
					reply(hits);
				}).catch(function (error) {
					console.log("error", "attachement", error.stack);
					reply(Boom.badRequest(error.message));
				});
			}
		});


		next(); 
	}
};

attachementPlugin.register.attributes = {
	name: "attachementPlugin",
	version: "0.0.1"
};

module.exports = attachementPlugin;