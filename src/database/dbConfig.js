require("dotenv").config();

module.exports = {
    host: process.env.DB_IP,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME,
    user: process.env.DB_USER, 
    password: process.env.DB_PASSWORD
}