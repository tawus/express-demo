const { Pool } = require('pg');

const pool = new Pool({
    host: 'localhost',
    database: 'library',
    user: 'postgres',
    password: 'm3dq312'
});

module.exports = pool;
