/**
 * Created by dan_g on 5/15/2017.
 */
/*
----------------  POSTGRES  --------------------
 */
module.exports = {
    "development": {
        "username": process.env.MYSQL_USER || "test1",
        "password": process.env.MYSQL_PASSWORD || "openstash",
        "database": process.env.MYSQL_DATABASE || "openstash",
        "host": process.env.MYSQL_HOST || "localhost",
        "dialect": "postgres"
    }



/*  ------------------- MYSQL  -------------------
module.exports = {

    "development": {
        "username": process.env.MYSQL_USER || "test1",
        "password": process.env.MYSQL_PASSWORD || "openstash",
        "database": process.env.MYSQL_DATABASE || "openstash",
        "host": process.env.MYSQL_HOST || "localhost",
        "dialect": "mysql"
    }

    */

};