Git Info
- pushed with .env for info on variables (PORT and URL)
- when using postgresql, if you don't set a password, it is not required in the db url :)

Postgresql Connection
- install on brew -> `brew install postgresql@15`
- start services -> `brew services start postgresql@15`
- initialize postgres -> `psql -h localhost -d postgres`
- create db (doesn't do it for you) -> `CREATE DATABASE dbName`

Other commands
- `\conninfo` -> gives connection info
- `psql -U [username] -h localhost [hostname] -d [database]` -> connect to existing 

Docker
- basic docker setup for frontend, backend, db
- built on `node:18-alpine` base image
- run `docker-compose up --build` (docker must be installed)
- docker will not work unless postgreSQL password is added