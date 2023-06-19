const { Pool } = require('pg');

//Database connection
const db = new Pool ({
    user: 'admin',
    host: 'localhost',
    database: 'wiki',
    password: 'admin',
    port: '5432'
})

module.exports = db;