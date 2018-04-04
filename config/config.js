const fs = require('fs');

module.exports = {
    dev_postgres: {
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DATABASE,
        port: process.env.DB_PORT,
        host: process.env.DB_HOST,
        dialect: process.env.DIALECT,
        seederStorageTableName: process.env.SEEDER_STORAGE_TABLE_NAME,
        SSL: process.env.SSL,
        PORT: process.env.PORT,
        CACHE_SEGMENT: process.env.CACHE_SEGMENT,
        REDIS_HOST: process.env.REDIS_HOST,
        REDIS_PORT: process.env.REDIS_PORT,
        REDIS_USER: process.env.REDIS_USER,
        REDIS_PASSWORD: process.env.REDIS_PASSWORD,
        SQL_LOGGING: process.env.SQL_LOGGING,
        SCHEME: process.env.SCHEME,
        JWT_SECRET: process.env.JWT_SECRET,
        COOKIE_SECRET: process.env.COOKIE_SECRET,
        DATABASE_URL: process.env.DATABASE_URL

    },
    dev_mysql: {
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DATABASE,
        port: process.env.DB_PORT,
        host: process.env.DB_HOST,
        dialect: process.env.DIALECT,
        seederStorageTableName: process.env.SEEDER_STORAGE_TABLE_NAME,
        SSL: process.env.SSL,
        PORT: process.env.PORT,
        CACHE_SEGMENT: process.env.CACHE_SEGMENT,
        REDIS_HOST: process.env.REDIS_HOST,
        REDIS_PORT: process.env.REDIS_PORT,
        REDIS_USER: process.env.REDIS_USER,
        REDIS_PASSWORD: process.env.REDIS_PASSWORD,
        SQL_LOGGING: process.env.SQL_LOGGING,
        SCHEME: process.env.SCHEME,
        JWT_SECRET: process.env.JWT_SECRET,
        COOKIE_SECRET: process.env.COOKIE_SECRET,
        DATABASE_URL: process.env.DATABASE_URL
    },
    dev_heroku: {
        use_env_variable: "DATABASE_URL",
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DATABASE,
        port: process.env.DB_PORT, //
        host: process.env.DB_HOST,
        dialect: process.env.DIALECT,
        seederStorageTableName: process.env.SEEDER_STORAGE_TABLE_NAME,
        SSL: process.env.SSL,
        PORT: process.env.PORT,
        CACHE_SEGMENT: process.env.CACHE_SEGMENT,
        REDIS_HOST: process.env.REDIS_HOST,
        REDIS_PORT: process.env.REDIS_PORT,
        REDIS_USER: process.env.REDIS_USER,
        REDIS_PASSWORD: process.env.REDIS_PASSWORD,
        SQL_LOGGING: process.env.SQL_LOGGING,
        SCHEME: process.env.SCHEME,
        JWT_SECRET: process.env.JWT_SECRET,
        COOKIE_SECRET: process.env.COOKIE_SECRET,
        DATABASE_URL: process.env.DATABASE_URL

},
    test: {
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        host: process.env.DB_HOSTNAME,
        dialect: process.env.DIALECT
    },
    production: {
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        host: process.env.DB_HOSTNAME,
        dialect: process.env.DIALECT

    }
};