import mysql from "mysql2/promise";

import dbConfig from "./dbConfig";

const pool = mysql.createPool({
  host: dbConfig.host,
  port: dbConfig.port,
  database: dbConfig.database,
  user: dbConfig.user,
  password: dbConfig.password,
  connectionLimit: 10,
});
// console.log(dbConfig.user);

export default pool;
