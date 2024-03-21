import mysql from 'mysql2';
import dbConfig from './dbConfig';

const{
    createPool
} = require('mysql2');

const pool = createPool({
    host: dbConfig.ip,
    user: dbConfig.user,
    password: dbConfig.password,
    database: dbConfig.host,
    connectionLimit: 10
});

pool.query('SELECT * FROM type_exercise', (err, results, fields) => {
    if(err){
        return console.error(err.message);
    }
    return console.log(results);
});

module.exports = pool;

// const connection = mysql.createPool(dbConfig);


// export default connection.promise();