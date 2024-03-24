const mysql = require("mysql2/promise");
const dbConfig = require('./dbConfig');

const pool = mysql.createPool({
    host: dbConfig.host, 
    port: dbConfig.port,
    database: dbConfig.database,
    user: dbConfig.user,
    password: dbConfig.password,
    connectionLimit: 10
});
// console.log(dbConfig.user);

module.exports = pool;