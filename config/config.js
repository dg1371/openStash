/**
 * Created by dan_g on 5/15/2017.
 */
var config = {
    development: {
        //url to be used in link generation
        url: 'http://my.site.com',
        username: 'test1',
        password: 'openstash',
        database: 'openstash',
        port: '5432',
        host: 'localhost',
        dialect: 'postgres',
        seederStorageTableName: 'sequelize_data',
        dialect: "postgres",
        //mongodb connection settings
        database: {
            username: 'test1',
            password: 'openstash',
            database: 'openstash',
            port: '5432',
            host: 'localhost',
            dialect: 'postgres',
            seederStorageTableName: 'sequelize_data'
        },
        //server details
        server: {
            host: 'localhost',
            port: '3000',
            cacheSegment: 'openStash',
            redisHost: 'localhost',
            sqlLogging: 'false',
            scheme: 'http',
        }
    },
    dev_postgres: {
        //url to be used in link generation
        url: 'http://my.site.com',
        dialect: "postgres",
        //mongodb connection settings
        database: {
            username: 'test1',
            password: 'openstash',
            database: 'openstash',
            port: '5432',
            host: 'localhost',
            dialect: 'postgres',
            seederStorageTableName: 'sequelize_data'
        },
        //server details
        server: {
            host: 'localhost',
            port: '3000',
            cacheSegment: 'openStash',
            redisHost: 'localhost',
            sqlLogging: 'false',
            scheme: 'http',
        }
    },
    dev_huroku: {
        //url to be used in link generation
        url: 'http://my.site.com',
        //mongodb connection settings
        database: {
            username: 'ynwfvdzenmzgdv',
            password: 'abb01e73f261644ba2849a10ec12b8b679b7e540f6a41a4c1159ad861e5af917',
            database: 'd1q8uva1i3fjtu',
            port: '5432',
            host: 'ec2-174-129-206-173.compute-1.amazonaws.com',
            dialect: 'postgres',
            seederStorageTableName: 'sequelize_data',
            URI: 'postgres://ynwfvdzenmzgdv:abb01e73f261644ba2849a10ec12b8b679b7e540f6a41a4c1159ad861e5af917@ec2-174-129-206-173.compute-1.amazonaws.com:5432/d1q8uva1i3fjtu'
        },
        //server details
        server: {
            host: 'localhost',
            port: '3000',
            cacheSegment: 'openStash',
            redisHost: 'localhost',
            sqlLogging: 'false',
            scheme: 'http'
        }
    },
    production: {
        //url to be used in link generation
        url: 'http://my.site.com',
        //mongodb connection settings
        database: {
            username: 'test1',
            password: 'openstash',
            database: 'openstash',
            port: '3306',
            host: 'localhost',
            dialect: 'mysql',
            seederStorageTableName: 'sequelize_data'
        },
        //server details
        server: {
            host: 'localhost',
            port: '3000',
            cacheSegment: 'openStash',
            redisHost: 'localhost',
            sqlLogging: 'false',
            scheme: 'http'
        }
    },

    postgres: {
        database: 'openstash',
        username: 'test1',
        password: 'openstash',
        dialect: 'postgres',
        port: '5432'
    }
};
module.exports = config;
