// pool is collection of client connections that the library manages for you
const { Pool } = require('pg'); // Node postgresql client
require('dotenv').config(); // imports dotenv package

// tells pg to create pool instance (connections to db)
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});

// exports the pool
module.exports = pool;