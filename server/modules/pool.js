const pg = require("pg");

const Pool = pg.Pool;
const pool = new Pool({
    database: "Fintodo",
    host: "localhost",
    port: 5432,
    max: 10,
    idleTimeoutMillis: 30000
})

pool.on("connect", () => {
    console.log('postgres is now connected');
})
pool.on("error", error => {
    console.log("error with postgres tool", error);
})

module.exports = pool;
