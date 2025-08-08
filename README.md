Postgresql Connection
- install on brew -> `brew install postgresql@15`
- start services -> `brew services start postgresql@15`
- initialize postgres -> `psql -h localhost -d postgres`
- create db (doesn't do it for you) -> `CREATE DATABASE dbName`

Other commands
- `\conninfo` -> gives connection info
- `psql -U [username] -h localhost [hostname] -d [database]` -> connect to existing 
