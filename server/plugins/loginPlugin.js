/**
 * Created by dan_g on 5/17/2017.
 */

var Boom = require("boom");
var Promise = require("bluebird");
var bcrypt = require("bcrypt");
var crypto = require("crypto");
var Joi = require("joi");
var jwt = require("jsonwebtoken");

var ONE_MONTH = 24 * 60 * 60 * 1000 * 30;
var loginPlugin =
    {
        register: function (server, options, next) {
            server.route({
                method: "POST",
                path: "/api/login",
                    config: {
                        auth: false,
                    tags: ["api"],
                    description: "Login",
                    notes: "Uses a cookie to track login",
                    validate: {
                        payload: {
                            inputEmail: Joi.string().max(255).required().description(server.app.i18n.USER.EMAIL),
                            inputPassword: Joi.string().max(255).required().description(server.app.i18n.USER.PASSWORD),
                            responseType: Joi.string().optional().allow(null),
                            clientId: Joi.string().optional().allow(null),
                            authState: Joi.string().optional().allow(null)
                        }
                    },
                    handler: function (request, reply) {
                       var models = request.models;
                       models.user.unscoped().findOne({
                            where: {
                                userID: request.payload.inputEmail
                                //active: true
                            },
                            include: [models.company]
                        }).then(function (foundUser) {
                            if (foundUser && bcrypt.compareSync(request.payload.inputPassword, foundUser.password)) {
                                //Generate a unique session ID.
                             //   console.log("itworked");
                                var sid = guid();

                                    var menus = {};


                                            var sessionUser = {
                                                firstName: foundUser.firstName,
                                                userId: foundUser.userId,
                                                lastName: foundUser.lastName,
                                                email: foundUser.email,
                                                id: foundUser.id,
                                                companyId: foundUser.companyId

                                            };

                                            //Put the user object in the cache.
                                            request.server.app.cache.set(sid, {user: sessionUser}, ONE_MONTH, function (err) {
                                                if(err) {
                                                    server.log("error ", "login",err);
                                                }
                                                //Set the session id in the cookie.

                                                    request.cookieAuth.set({sid: sid});

                                                    return reply({
                                                        statusCode: "ok",
                                                        userData: sessionUser,
                                                        menu: menus
                                                    });

                                            });
                                        }
                            else {
                                console.log("error", "login", "Invalid user name or password");
                                return reply(Boom.unauthorized("Bad user name or password"));
                            }
                                    }).catch(function (error) {
                                        console.log("error", "login", error.message + " " + error.stack);
                                   //     reply(Boom.badRequest(error.message));
                                    });


                            }
        }

            });

            server.route({
                method: "GET",
                path: "/api/v1/login/status",
                config: {
                    tags: ["api"],
                    description: "Check status of current user",
                    notes: "Will return OK if session is active.",
                    handler: function (request, reply) {
                        if (request.auth.isAuthenticated) {
                            var language = request.auth.credentials.language;
                            var entitlement = request.auth.credentials.entitlement;
                            var menu = request.auth.credentials.menu;
                            var userData = request.auth.credentials;

                            // refresh settings from database
                            request.models.user.findOne({ where: { id: userData.id } }).then(function(user) {

                                if (!user) {

                                    // if this happens, it's because the user was deleted since they last
                                    // stored their session
                                    server.methods.log("warn", "login", "Invalid user session: User account does not exist ID=" + userData.id);
                                    reply(Boom.unauthorized("Invalid user session"));
                                } else if (!user.active) {

                                    // if this happens, it's because the user's account was deactivated
                                    // since they last stored their session
                                    console.log("warn", "login", "Deactivated user ID=" + userData.id);
                                    reply(Boom.unauthorized("User account deactivated"));
                                } else {

                                    userData.settings = user.settings;
                                    //used for intercom.com tracking
                                    var hmac = crypto.createHmac("sha256", "14kbXCLVFIDWNU04tS6eWPbZ-pSGw_yMU1klHkKZ");
                                    hmac.update(userData.id);
                                    userData.userHash = hmac.digest("hex");

                                    reply({
                                        statusCode: "ok",
                                        language: language,
                                        entitlement: entitlement,
                                        menu: menu,
                                        userData: userData
                                    });
                                }
                            });
                        }
                       else {
                            server.log("warn", "login", "User not logged in");
                            reply(Boom.unauthorized("User not logged in"));
                        }
                    }
                }
            });

            server.route({
                method: "GET",
                path: "/api/logout",
                config: {
                    auth: false,
                    tags: ["api"],
                    description: "Logout",
                    notes: "Clears session and cookies",
                    handler: function (request, reply) {
                        request.cookieAuth.clear();
                        return reply.redirect("/");
                        console.log("LOGOUT");
                    }
                }
            });
            next();
        }
    }
;

function guid() {
    function s4() {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
    }

    return s4() + s4() + "-" + s4() + "-" + s4() + "-" +
        s4() + "-" + s4() + s4() + s4();
}

loginPlugin.register.attributes = {
    name: "login",
    version: "0.0.1"
};

module.exports = loginPlugin;
