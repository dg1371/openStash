const fs = require('fs');

module.exports = {
    dev_postgres: {
        username: process.env.DB_USERNAME || "test1",
        password: process.env.DB_PASSWORD || "openstash",
        database: process.env.DATABASE || "openstash",
        port: process.env.DB_PORT || "5432",
        host: process.env.DB_HOST || "localhost",
        dialect: process.env.DIALECT || "postgres",
        seederStorageTableName: process.env.SEEDER_STORAGE_TABLE_NAME || "sequelize_data",
        SSL:  process.env.SSL || "false",
        PORT:  process.env.PORT || "3000",
        CACHE_SEGMENT:  process.env.CACHE_SEGMENT || "openStash",
        REDIS_HOST: process.env.REDIS_HOST || "localhost",
        REDIS_PORT: process.env.REDIS_PORT || "",
        REDIS_USER: process.env.REDIS_USER || "",
        REDIS_PASSWORD: process.env.REDIS_PASSWORD || "",
        SQL_LOGGING: process.env.SQL_LOGGING || "false",
        SCHEME: process.env.SCHEME || "http",
        JWT_SECRET:  process.env.JWT_SECRET || "luDN4bu9EZ2Ki7IaeyoOll+2Em9NiMR/2f9WUZhZIEnvabsdjWnTUEnCbmw0UJ9o80cSW4h9aAPMk2Qi4Q+MXWqP7wDQ1OI4jWlEpkgATMIlHhCaROPLRnHS4rY4Vsp2+u13QHymHIsySFKb85Qvs88xCjD1TV1k3HQgG2EwL+F/3aZVZfImaLmkeGi6JxnxKjKkvc5hIdbnBt3HBFaPmFda1Wvb7fmvuhrBwcUJn/s3q2D6NIOQFpjr3CdVxN9hDlygKB4zSdf1R2ONCyU2SMEcApqOE7oByGVTEAaF2QJa0F+hCe4Fvz+ktlqueQt2FPI3OgSkGuCL4djRfeTkrA==",
        COOKIE_SECRET:  process.env.COOKIE_SECRET || "FxXMG60j0iveFgxUPC0NbgW7dvzeKyXjyU11c4hVYy+W2nzgDhaMrarREPZzvNcD8eu0Oqzd4QqcgNl5Ei5sj1y5wPgPxg4q/AmaphbCES9Lgjx71srUMOllykYtMAoEIPKPZn4+UbFvskM3aa999ZQ44c6PFe2bAG+fmIQuAihQFNvEdUI2/TgyKC3nfCCoILSnjXFcyaXxI5b5YQV3Umfrbj/KoLXZ6w6bpRjvprA4vJS01H7MI/kjyHAp+gPNtZ48h3B0skWYBQd/G0/0d8R4D+aFQzfXTWd6jzmeDLznxz1NbMbe6lBpaC/FxJj18OFr3LXSPZBjHHse0v9Q9Q==",
        DATABASE_URL:  process.env.DATABASE_URL || "postgres://dbmoqpfgsunqzd:0e4fe6b25f61ec0f2a38eeee307347b47192dbc5fa2a90b83932e54390768081@ec2-54-243-63-13.compute-1.amazonaws.com:5432/ddf0ug0bpgg8qa"

    },
    dev_mysql: {
        username: process.env.DB_USERNAME || "test1",
        password: process.env.DB_PASSWORD || "openstash",
        database: process.env.DATABASE || "openstash",
        port: process.env.DB_PORT || "3306",
        host: process.env.DB_HOST || "localhost",
        dialect: process.env.DIALECT || "mysql",
        seederStorageTableName: process.env.SEEDER_STORAGE_TABLE_NAME || "sequelize_data",
        SSL:  process.env.SSL || "false",
        PORT:  process.env.PORT || "3000",
        CACHE_SEGMENT:  process.env.CACHE_SEGMENT || "openStash",
        REDIS_HOST: process.env.REDIS_HOST || "localhost",
        REDIS_PORT: process.env.REDIS_PORT || "",
        REDIS_USER: process.env.REDIS_USER || "",
        REDIS_PASSWORD: process.env.REDIS_PASSWORD || "",
        SQL_LOGGING: process.env.SQL_LOGGING || "false",
        SCHEME: process.env.SCHEME || "http",
        JWT_SECRET:  process.env.JWT_SECRET || "luDN4bu9EZ2Ki7IaeyoOll+2Em9NiMR/2f9WUZhZIEnvabsdjWnTUEnCbmw0UJ9o80cSW4h9aAPMk2Qi4Q+MXWqP7wDQ1OI4jWlEpkgATMIlHhCaROPLRnHS4rY4Vsp2+u13QHymHIsySFKb85Qvs88xCjD1TV1k3HQgG2EwL+F/3aZVZfImaLmkeGi6JxnxKjKkvc5hIdbnBt3HBFaPmFda1Wvb7fmvuhrBwcUJn/s3q2D6NIOQFpjr3CdVxN9hDlygKB4zSdf1R2ONCyU2SMEcApqOE7oByGVTEAaF2QJa0F+hCe4Fvz+ktlqueQt2FPI3OgSkGuCL4djRfeTkrA==",
        COOKIE_SECRET:  process.env.COOKIE_SECRET || "FxXMG60j0iveFgxUPC0NbgW7dvzeKyXjyU11c4hVYy+W2nzgDhaMrarREPZzvNcD8eu0Oqzd4QqcgNl5Ei5sj1y5wPgPxg4q/AmaphbCES9Lgjx71srUMOllykYtMAoEIPKPZn4+UbFvskM3aa999ZQ44c6PFe2bAG+fmIQuAihQFNvEdUI2/TgyKC3nfCCoILSnjXFcyaXxI5b5YQV3Umfrbj/KoLXZ6w6bpRjvprA4vJS01H7MI/kjyHAp+gPNtZ48h3B0skWYBQd/G0/0d8R4D+aFQzfXTWd6jzmeDLznxz1NbMbe6lBpaC/FxJj18OFr3LXSPZBjHHse0v9Q9Q==",
        DATABASE_URL:  process.env.DATABASE_URL || "postgres://dbmoqpfgsunqzd:0e4fe6b25f61ec0f2a38eeee307347b47192dbc5fa2a90b83932e54390768081@ec2-54-243-63-13.compute-1.amazonaws.com:5432/ddf0ug0bpgg8qa"

    },
    dev_heroku: {
        use_env_variable: "DATABASE_URL",
        username: process.env.DB_USERNAME || "dbmoqpfgsunqzd",
        password: process.env.DB_PASSWORD || "0e4fe6b25f61ec0f2a38eeee307347b47192dbc5fa2a90b83932e54390768081",
        database: process.env.DATABASE || "ddf0ug0bpgg8qa",
        port: process.env.DB_PORT || "5432",
        host: process.env.DB_HOST || "ec2-54-243-63-13.compute-1.amazonaws.com",
        dialect: process.env.DIALECT || "postgres",
        seederStorageTableName: process.env.SEEDER_STORAGE_TABLE_NAME || "sequelize_data",
        SSL:  process.env.SSL || "true",
        PORT:  process.env.PORT || "3000",
        CACHE_SEGMENT:  process.env.CACHE_SEGMENT || "openStash",
        REDIS_HOST: process.env.REDIS_HOST || "ec2-50-16-50-168.compute-1.amazonaws.com",
        REDIS_PORT: process.env.REDIS_PORT || "47629",
        REDIS_USER: process.env.REDIS_USER || "h",
        REDIS_PASSWORD: process.env.REDIS_PASSWORD || "p026488d978ac2a64ed8de5f5ce1daa6b09c71ebaecf0488b4c56059719a3512c",
        SQL_LOGGING: process.env.SQL_LOGGING || "false",
        SCHEME: process.env.SCHEME || "http",
        JWT_SECRET:  process.env.JWT_SECRET || "luDN4bu9EZ2Ki7IaeyoOll+2Em9NiMR/2f9WUZhZIEnvabsdjWnTUEnCbmw0UJ9o80cSW4h9aAPMk2Qi4Q+MXWqP7wDQ1OI4jWlEpkgATMIlHhCaROPLRnHS4rY4Vsp2+u13QHymHIsySFKb85Qvs88xCjD1TV1k3HQgG2EwL+F/3aZVZfImaLmkeGi6JxnxKjKkvc5hIdbnBt3HBFaPmFda1Wvb7fmvuhrBwcUJn/s3q2D6NIOQFpjr3CdVxN9hDlygKB4zSdf1R2ONCyU2SMEcApqOE7oByGVTEAaF2QJa0F+hCe4Fvz+ktlqueQt2FPI3OgSkGuCL4djRfeTkrA==",
        COOKIE_SECRET:  process.env.COOKIE_SECRET || "FxXMG60j0iveFgxUPC0NbgW7dvzeKyXjyU11c4hVYy+W2nzgDhaMrarREPZzvNcD8eu0Oqzd4QqcgNl5Ei5sj1y5wPgPxg4q/AmaphbCES9Lgjx71srUMOllykYtMAoEIPKPZn4+UbFvskM3aa999ZQ44c6PFe2bAG+fmIQuAihQFNvEdUI2/TgyKC3nfCCoILSnjXFcyaXxI5b5YQV3Umfrbj/KoLXZ6w6bpRjvprA4vJS01H7MI/kjyHAp+gPNtZ48h3B0skWYBQd/G0/0d8R4D+aFQzfXTWd6jzmeDLznxz1NbMbe6lBpaC/FxJj18OFr3LXSPZBjHHse0v9Q9Q==",
        DATABASE_URL:  process.env.DATABASE_URL || "postgres://dbmoqpfgsunqzd:0e4fe6b25f61ec0f2a38eeee307347b47192dbc5fa2a90b83932e54390768081@ec2-54-243-63-13.compute-1.amazonaws.com:5432/ddf0ug0bpgg8qa"

},
    test: {
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        host: process.env.DB_HOSTNAME,
        dialect: process.env.DIALECT,
    },
    production: {
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        host: process.env.DB_HOSTNAME,
        dialect: process.env.DIALECT,

    }
};