
var env = process.env.NODE_ENV || "development";
console.log("======> Current ENV is: " + env);
var config = require('./config/config.js')[env];
var Joi = require("joi");
var Hapi = require("hapi");
var Inert = require("inert");
var Vision = require("vision");
var HapiSwagger = require("hapi-swagger");
var Sequelize = require("sequelize");
var HapiSequelize = require("hapi-sequelize");
var HapiRBAC = require("hapi-rbac");
var I18n = require("./www/i18n/en.json");
var Sequelize = require("sequelize");
var _ = require("lodash");
var Good = require("good");
var goodReporters = {};
var Package = require("./package.json");
var path = require("path");
var Handlebars = require("handlebars");

var sqlLogging              = config.server.sqlLogging              || false;
var redisHost               = config.server.redisHost               || "localhost";
var cacheSegment            = config.server.cacheSegment            || "openStash";
var timerCacheSegment       = cacheSegment + "timer";
var downtimeCacheSegment    = cacheSegment + "downtime";
var dataCacheSegment        = cacheSegment + "data";

var test = config.database.host;
console.log(test);

var dbHost               = config.database.host            || "localhost";
var Database           = config.database.database          || "openstash";
var dbUser               = config.database.username        || "test1";
var dbPort                  = config.database.port         || "5432";
var dbPassword           = config.database.password        || "openstash";
var JWT_SECRET = process.env.JWT_SECRET || "luDN4bu9EZ2Ki7IaeyoOll+2Em9NiMR/2f9WUZhZIEnvabsdjWnTUEnCbmw0UJ9o80cSW4h9aAPMk2Qi4Q+MXWqP7wDQ1OI4jWlEpkgATMIlHhCaROPLRnHS4rY4Vsp2+u13QHymHIsySFKb85Qvs88xCjD1TV1k3HQgG2EwL+F/3aZVZfImaLmkeGi6JxnxKjKkvc5hIdbnBt3HBFaPmFda1Wvb7fmvuhrBwcUJn/s3q2D6NIOQFpjr3CdVxN9hDlygKB4zSdf1R2ONCyU2SMEcApqOE7oByGVTEAaF2QJa0F+hCe4Fvz+ktlqueQt2FPI3OgSkGuCL4djRfeTkrA==";
var COOKIE_SECRET = process.env.COOKIE_SECRET || "FxXMG60j0iveFgxUPC0NbgW7dvzeKyXjyU11c4hVYy+W2nzgDhaMrarREPZzvNcD8eu0Oqzd4QqcgNl5Ei5sj1y5wPgPxg4q/AmaphbCES9Lgjx71srUMOllykYtMAoEIPKPZn4+UbFvskM3aa999ZQ44c6PFe2bAG+fmIQuAihQFNvEdUI2/TgyKC3nfCCoILSnjXFcyaXxI5b5YQV3Umfrbj/KoLXZ6w6bpRjvprA4vJS01H7MI/kjyHAp+gPNtZ48h3B0skWYBQd/G0/0d8R4D+aFQzfXTWd6jzmeDLznxz1NbMbe6lBpaC/FxJj18OFr3LXSPZBjHHse0v9Q9Q==";

var scheme = config.server.scheme;


//if (env=="development"){
//   scheme="http";
//}


var hb = Handlebars.create();
hb.registerHelper({
    formatDate: function (date, format, timezone) {
        timezone = timezone || "UTC";
        // format date to the specified format and timezone
        var mmnt = moment.tz(date, timezone);
        return mmnt.format(format);
    }
});

// one engine / path to rule them all
var handlebarsEngine = {
    module: hb,
    path: path.join(__dirname, "server/views/emails")
};
var swaggerOptions = {
    info: {
        "title": "OpenStash API Documentation",
        "version": Package.version
    },
    schemes: [scheme],
    pathPrefixSize: 3,
    basePath: "/api",
    //debug: true,
    sortEndpoints: "path"
};

var serverConfig = {
    app: {
        version: Package.version,
        logLevel: "error"
    },
    cache: [{
        engine: require("catbox-redis"),
        host: redisHost,
        shared: true
    }]
};

var server = new Hapi.Server(serverConfig);


server.connection({
    port: config.server.port,
   // host: 'localhost',
   routes: {
       cors: true,
       files: {
           relativeTo: __dirname

       }
   }
});


server.app.version = Package.version;
server.app.i18n = I18n;
server.app.jwtSecret = JWT_SECRET;
server.app.version = Package.version;
server.app.defaultPageSize = 25;

console.log("sdfsadf"+config.database.dialect);

var sequelizeOptions = {
    dialect: "postgres",
   // dialect: config.database.dialect,
    port: 5432,
    //port: config.database.port,
   // logging: config.server.sqlLogging,
    benchmark: true,
    pool: {
        min: 10,
        max: 50
    },
    define: {
        underscoredAll: true,
        freezeTableName: true
    },

};

var sequelize = new Sequelize(Database, dbUser, dbPassword,{
    host: 'localhost',
    //port: 5432,
        dialect: 'postgres',
        protocol: 'postgres'
});


        server.register([Inert,
        Vision,
            {
                register: HapiSequelize,
                options: [{
                    name: "db", // identifier
                    models: ["models/**/*.js"],  // paths/globs to model files
                    sequelize: sequelize, // sequelize instance
                    sync: false, // sync models - default false
                    forceSync: false // force sync (drops tables) - default false

                }]
            },
            HapiRBAC,
            require("hapi-auth-cookie"),
            require("hapi-qs"),
            require("hapi-auth-jwt2"),
            require("./server/plugins/companyPlugin"),
            require("./server/plugins/userPlugin"),
            require("./server/plugins/loginPlugin"),
            require("./server/plugins/attachementPlugin"),

        {
            register: HapiSwagger,
            options: swaggerOptions
        }], function (err) {
            if (err) {
                server.log(["fatal", "init"], err.stack);
                throw err;
            }

            var cache = server.cache({ segment: cacheSegment, expiresIn: 24 * 60 * 60 * 1000 * 30 });
            var TIMER_CACHE_EXPIRATION = 61000;
            var timerCache = server.cache({ segment: timerCacheSegment, expiresIn: TIMER_CACHE_EXPIRATION });
            var downtimeCache = server.cache({ segment: downtimeCacheSegment, expiresIn: 24 * 60 * 60 * 1000 * 2 });
            var dataCache = server.cache({ segment: dataCacheSegment, expiresIn: 1000 * 60 * 5 });


            server.app.cacheSegment = cacheSegment;
            server.app.timerCacheSegment = timerCacheSegment;
            server.app.downtimeCacheSegment = downtimeCacheSegment;
            server.app.dataCacheSegment = dataCacheSegment;
            server.app.cache = cache;
            server.app.timerCache = timerCache;
            server.app.downtimeCache = downtimeCache;
            server.app.dataCache = dataCache;

            //server.app.esClient = esClient;


            process.on("uncaughtException", function(err) {
                var log = {
                    msg: "Uncaught Exception",
                    message: err.message || null,
                    stack: err.stack || null
                };
                try {
                    server.log(["fatal", "global"], log); // eslint-disable-line openstash/no-server-log
                } catch (e) {
                    console.log(log); // eslint-disable-line no-console
                }
            });

            process.on("unhandledRejection", function(reason, p) {
                var log = {
                    msg: "Unhandled Rejection",
                    promise: p,
                    message: reason.message || null,
                    stack: reason.stack || null
                };
                try {
                    server.log(["fatal", "global"], log); // eslint-disable-line openstash/no-server-log
                } catch (e) {
                    console.log(log); // eslint-disable-line no-console
                }
            });
            server.auth.strategy("session", "cookie", false, {
                password: COOKIE_SECRET,
                cookie: "openstash",
                isSecure: false,
                redirectTo: '/index.html',
                clearInvalid: true,
                keepAlive: true,
                ttl: 24 * 60 * 60 * 1000 * 2,
                validateFunc: function (request, session, callback) {
                    cache.get(session.sid, function (err, cached) {
                        if (err) {

                            server.methods.log("error", "session", err.stack);
                            return callback(err, false);
                        }

                        if (!cached) {

                            server.methods.log("error", "session", "Cached user not found.");
                            return callback(null, false);
                        }

                        return callback(null, true, cached.user);
                    });
                }
            });

            var validateJWT = function (decoded, request, callback) {

                cache.get(decoded.id, function (err, cached) {
                    if (err) {

                        server.methods.log("error", "jwt", err.stack);
                        return callback(err, false);
                    }

                    if (!cached) {

                        server.methods.log("error", "jwt", "Cached user not found.");
                        return callback(null, false);
                    }

                    return callback(null, true, cached.user);

                });
            };

            server.auth.strategy("jwt", "jwt", false, {
                key: JWT_SECRET,
                validateFunc: validateJWT,
                verifyOptions: { algorithms: ["HS256"]
                }

            });

            server.auth.default({
                strategies: ["jwt", "session"]
            });


            var db = server.plugins["hapi-sequelize"].db;
            for (var dbModel in db.sequelize.models) {
                if (typeof dbModel.associate == "function") {
                    dbModel.associate(db.sequelize.models);
                }
            }

            server.route([
                {
                method: 'GET',
                path: '/',
                handler: function (request, reply) {

                    reply.redirect('./index.html');
                }
           },
                {
                method: 'GET',
                path: '/{p*}',
                    config: {
                    auth: false
                    },
                handler: {
                    directory: {
                        path: 'www',
                        listing: false,
                        index: true
                    }
                }
            }

            ]);




            server.ext("onPreHandler", function (modelCollections) {
                return function (request, reply) {
                    request.models = modelCollections;
                    if (request.auth.credentials !== null) {

                        var companyCacheKey = "company:" + request.auth.credentials.companyId;

                        server.app.dataCache.get(companyCacheKey, function(err, value) {

                            if (err) {
                                server.methods.log("warn", "global", {msg: "failed to get company from cache", error: err });
                            }

                            if (!value) {

                                request.models.company.findById(request.auth.credentials.companyId).then(function (data) {

                                    request.company = data.dataValues;
                                   // request.company.settings = JSON.parse(data.dataValues.settings);

                                    server.app.dataCache.set(companyCacheKey, data, 24 * 60 * 1000, function(err) {
                                        if (err) {
                                            server.methods.log("warn", "global", {msg: "failed to set company in cache", error: err });
                                        }
                                    });

                                    reply.continue();
                                }).catch(function(error) {
                                    console.log("error", "global", {msg: "failed load company", error: error });
                                    reply(Boom.badRequest("Unable to load company details"));
                                });
                            } else {
                                request.company = value;
                                reply.continue();
                            }
                        });

                    } else {
                        reply.continue();
                    }
                };
            } (server.plugins["hapi-sequelize"].db.sequelize.models));

            if (!module.parent) {
                server.start(function () {
                    console.log('Server started at: ' + server.info.uri);
                    server.log("info", "init", "Server running at: " + server.info.uri + " version: " + Package.version);
                });
            }

        });



module.exports = server;

