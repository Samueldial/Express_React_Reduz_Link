import pg from 'pg';

const pool = pg.Pool;

export const con = new pool({
    user: 'postgres',
    password: 'lauGT51',
    database: 'reduct',
    host: 'localhost',
    port: 5432
});

