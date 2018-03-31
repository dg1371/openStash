ECHO on
ECHO.


if "%~1"=="" goto BLANK

IF "%~1"=="dev_postgres" GOTO dev_postgres

IF "%~1"=="dev_mysql" GOTO dev_postgres

IF "%~1"=="dev_heroku" GOTO dev_heroku

IF "%~1"=="test_heroku" GOTO test_heroku

IF "%~1"=="prod_heroku" GOTO prod_heroku

IF [%1]==[/?] GOTO BLANK

IF NOT %1=="-b" GOTO UNKNOWN

:dev_postgres

set NODE_ENV = "dev_postgres"
set SERVER_PORT = "3000"
set CACHE_SEGMENT = "openStash"
set REDIS_HOST = "localhost"
set SQL_LOGGING = "false"
set SCHEME= "http"
set DB_USERNAME = "test1"
set DB_PASSWORD = "openstash"
set DATABASE = "openstash"
set DB_PORT = "5432"
set DB_HOST = "localhost"
set DIALECT = "postgres"
set SEEDER_STORAGE_TABLE_NAME = "sequelize_data"
set JWT_SECRET = "luDN4bu9EZ2Ki7IaeyoOll+2Em9NiMR/2f9WUZhZIEnvabsdjWnTUEnCbmw0UJ9o80cSW4h9aAPMk2Qi4Q+MXWqP7wDQ1OI4jWlEpkgATMIlHhCaROPLRnHS4rY4Vsp2+u13QHymHIsySFKb85Qvs88xCjD1TV1k3HQgG2EwL+F/3aZVZfImaLmkeGi6JxnxKjKkvc5hIdbnBt3HBFaPmFda1Wvb7fmvuhrBwcUJn/s3q2D6NIOQFpjr3CdVxN9hDlygKB4zSdf1R2ONCyU2SMEcApqOE7oByGVTEAaF2QJa0F+hCe4Fvz+ktlqueQt2FPI3OgSkGuCL4djRfeTkrA=="
set COOKIE_SECRET = "FxXMG60j0iveFgxUPC0NbgW7dvzeKyXjyU11c4hVYy+W2nzgDhaMrarREPZzvNcD8eu0Oqzd4QqcgNl5Ei5sj1y5wPgPxg4q/AmaphbCES9Lgjx71srUMOllykYtMAoEIPKPZn4+UbFvskM3aa999ZQ44c6PFe2bAG+fmIQuAihQFNvEdUI2/TgyKC3nfCCoILSnjXFcyaXxI5b5YQV3Umfrbj/KoLXZ6w6bpRjvprA4vJS01H7MI/kjyHAp+gPNtZ48h3B0skWYBQd/G0/0d8R4D+aFQzfXTWd6jzmeDLznxz1NbMbe6lBpaC/FxJj18OFr3LXSPZBjHHse0v9Q9Q=="
ECHO %1

GOTO DONE

:dev_mysql

set NODE_ENV = dev_mysql
set SERVER_PORT = 3000
set CACHE_SEGMENT = openStash
set REDIS_HOST = localhost
set SQL_LOGGING = false
set SCHEMA= http
set DB_USERNAME = test1
set DB_PASSWORD = openstash
set DATABASE = openstash
set DB_PORT = 5432
set DB_HOST = localhost
set DIALECT = postgres
set SEEDER_STORAGE_TABLE_NAME = sequelize_data

ECHO %1

GOTO DONE

:dev_heroku

heroku config:set NODE_ENV=dev_heroku
heroku config:set PORT=3000
heroku config:set CACHE_SEGMENT=openStash
heroku config:set REDIS_HOST=localhost
heroku config:set SQL_LOGGING=false
heroku config:set SCHEME=http
heroku config:set DB_USERNAME=dbmoqpfgsunqzd
heroku config:set DB_PASSWORD=0e4fe6b25f61ec0f2a38eeee307347b47192dbc5fa2a90b83932e54390768081
heroku config:set DATABASE=ddf0ug0bpgg8qa
heroku config:set DB_PORT=5432
heroku config:set DB_HOST=ec2-54-243-63-13.compute-1.amazonaws.com
heroku config:set DIALECT=postgres
heroku config:set SEEDER_STORAGE_TABLE_NAME="sequelize_data"
heroku config:set JWT_SECRET="luDN4bu9EZ2Ki7IaeyoOll+2Em9NiMR/2f9WUZhZIEnvabsdjWnTUEnCbmw0UJ9o80cSW4h9aAPMk2Qi4Q+MXWqP7wDQ1OI4jWlEpkgATMIlHhCaROPLRnHS4rY4Vsp2+u13QHymHIsySFKb85Qvs88xCjD1TV1k3HQgG2EwL+F/3aZVZfImaLmkeGi6JxnxKjKkvc5hIdbnBt3HBFaPmFda1Wvb7fmvuhrBwcUJn/s3q2D6NIOQFpjr3CdVxN9hDlygKB4zSdf1R2ONCyU2SMEcApqOE7oByGVTEAaF2QJa0F+hCe4Fvz+ktlqueQt2FPI3OgSkGuCL4djRfeTkrA=="
heroku config:set COOKIE_SECRET="FxXMG60j0iveFgxUPC0NbgW7dvzeKyXjyU11c4hVYy+W2nzgDhaMrarREPZzvNcD8eu0Oqzd4QqcgNl5Ei5sj1y5wPgPxg4q/AmaphbCES9Lgjx71srUMOllykYtMAoEIPKPZn4+UbFvskM3aa999ZQ44c6PFe2bAG+fmIQuAihQFNvEdUI2/TgyKC3nfCCoILSnjXFcyaXxI5b5YQV3Umfrbj/KoLXZ6w6bpRjvprA4vJS01H7MI/kjyHAp+gPNtZ48h3B0skWYBQd/G0/0d8R4D+aFQzfXTWd6jzmeDLznxz1NbMbe6lBpaC/FxJj18OFr3LXSPZBjHHse0v9Q9Q=="
heroku config:set DATABASE_URL=postgres://dbmoqpfgsunqzd:0e4fe6b25f61ec0f2a38eeee307347b47192dbc5fa2a90b83932e54390768081@ec2-54-243-63-13.compute-1.amazonaws.com:5432/ddf0ug0bpgg8qa

ECHO %1

GOTO DONE

:test_heroku

set NODE_ENV = test_heroku
set SERVER_PORT = 3000
set CACHE_SEGMENT = openStash
set REDIS_HOST = localhost
set SQL_LOGGING = false
set SCHEMA= http
set DB_USERNAME = test1
set DB_PASSWORD = openstash
set DATABASE = openstash
set DB_PORT = 5432
set DB_HOST = localhost
set DIALECT = postgres
set SEEDER_STORAGE_TABLE_NAME = sequelize_data

ECHO %1

GOTO DONE

:prod_heroku

set NODE_ENV = prod_heroku
set SERVER_PORT = 3000
set CACHE_SEGMENT = openStash
set REDIS_HOST = localhost
set SQL_LOGGING = false
set SCHEMA= http
set DB_USERNAME = test1
set DB_PASSWORD = openstash
set DATABASE = openstash
set DB_PORT = 5432
set DB_HOST = localhost
set DIALECT = postgres
set SEEDER_STORAGE_TABLE_NAME = sequelize_data

ECHO %1

GOTO DONE

:BLANK

ECHO No Parameter

GOTO DONE

:UNKNOWN

ECHO Unknown Option

GOTO DONE

:DONE

ECHO Done!


