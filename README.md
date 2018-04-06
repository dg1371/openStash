![coddship status](https://app.codeship.com/projects/3559fde0-1450-0136-ad8d-42a55589bf77/status?branch=master)


# openStash

#install myslq or postgres and create a DB Schema named openstash

#npm install

#npm install sequelize --global

#npm install sequelise-cli --global

#npm install bcrypt --global

#sequelize db:migrate

#sequelize db:seed --seed company.js

#sequelize db:seed --seed user.js

#sequelize db:seed --seed attachement.js




#Need to have the following enviorment variables .. there are example scripts in defaults dir..

NODE_ENV=  // OPTIONS=(dev_postgres,dev_mysql,dev_heroku,test_heroku,prod_heroku) add as needed, just update config.js accordingly

SSL=   //OPTIONAL (TRUE/FALSE) is DB SSL - Defaults to false

SERVER_PORT=

CACHE_SEGMENT=  //REDIS cache seg name

REDIS_HOST=

REDIS_PORT=    //optional

REDIS_USER=    //optional

REDIS_PASSWORD=   //optional

SQL_LOGGING= (TRUE/FALSE)

SCHEME=  //OPTIONAL (HTTP/HTTPS)

DB_USERNAME=

DB_PASSWORD=

DATABASE=

DB_PORT=

DB_HOST=

DIALECT= (postgres/mysql..etc)

SEEDER_STORAGE_TABLE_NAME=  //sequelize default tables

JWT_SECRET=

COOKIE_SECRET=



