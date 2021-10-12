import pg from 'pg';

const client = new pg.Client({
    user: 'postgres',
    host: 'localhost',
    database: 'ReductApp',
    password: 'lauGT51',
    port: 5432
})

module.exports = client;