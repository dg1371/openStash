/**
 * Created by dan_g on 5/13/2017.
 */

var Joi = require("joi");
var Boom = require("boom");
var companyPlugin = {
	register: function (server, options, next) {

		//object prefix for the routes.
		var object = "company";

		//Get all companies
		//TODO: Must support pagination.
		server.route({
			method: "GET",
			path: "/api/v1/" + object,
			config: {
				tags: ["api"],
				description: "Company - Get All",
				notes: "Only returns user's company",
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
				var where = {where: {id: companyId}};

				models.company.findAll(where).then(function (returnData) {
					reply(returnData);
				}).catch(function (error) {
					server.methods.log("error", "company", error.stack);
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
						name: Joi.string().max(255).description(server.app.i18n.COMPANY.ENTITY_NAME),
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
				var where = {where: {id: companyId}};
				//if this users is a super admin then allow them to look at all companies
				//by passing a blank where clause.

				models.company.all(where).then(function (returnData) {
					var hits = returnData;
					reply(hits);
				}, function (error) {
					server.methods.log("error", "company", error.stack);
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
							.description(server.app.i18n.COMPANY.ENTITY_NAME+" "+server.app.i18n.GENERAL.ID)
					}
				},
				description: "Company - Get By ID",
				notes: "Will only return company user is assigned to no matter what company id is passed.",

			},
			handler: function (request, reply) {
				//database models
				var models = request.models;
				var companyId = request.auth.credentials.companyId;
				var whereClause = {where: {id: companyId}};


				models.company.findOne(whereClause).then(function (returnData) {
					var hits = returnData;
					reply(hits);
				}, function (error) {
					server.methods.log("error", "company", error.stack);
					reply(Boom.badRequest(error.message));
				});

			}
		});
		//Create Company
		//Return the created information?
		server.route({
			method: "POST",
			path: "/api/v1/" + object,
			config: {
				tags: ["api"],
				description: "Company - Create",
				validate: {
					payload: {
						name: Joi.string().max(255).description(server.app.i18n.COMPANY.NAME)

					}
				}
			},
			handler: function (request, reply) {
				var models = request.models;
				var userId = request.auth.credentials.id;

				request.payload.createUserId = userId;
				request.payload.updateUserId = userId;
				// request.payload.settings = JSON.stringify(request.payload.settings);
				models.company.create(request.payload).then(function (response) {
					var hits = response;
					reply(hits);
				}).catch(function (error) {
					server.methods.log("error", "company", error.stack);
					reply(Boom.badRequest(error.message));
				});
			}
		});
		//Update company
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
						name: Joi.string().max(255).description(server.app.i18n.COMPANY.NAME)

					}
				},
				description: "Company - Update",
				notes: "Will only update user's company regardless of id passed.",

			},
			handler: function (request, reply) {
				var models = request.models;
				var companyId = request.params.id;
				var where = {where: {id: companyId}};


				var userId = request.auth.credentials.id;
				request.payload.updateUserId = userId;

				var company;

				models.company.findOne(where).then(function (row) {
					return row.update(request.payload);
				}).then(function (response) {
					company = response;
					server.app.dataCache.drop("company:" + company.id);
					// return server.methods.checkAndUpdateCellMetrics(models.company, company);
				}).then(function() {
					var hits = company;
					reply(hits);
				}).catch(function (error) {
					console.log("error", "company", error.stack);
					reply(Boom.badRequest(error.message));
				});
			}
		});

		next();
	}
};

companyPlugin.register.attributes = {
	name: "companyPlugin",
	version: "0.0.1"
};

module.exports = companyPlugin;