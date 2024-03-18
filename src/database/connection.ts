import mysql from 'mysql2';
import dbConfig from './dbConfig';

const connection = mysql.createPool(dbConfig);


export default connection.promise();