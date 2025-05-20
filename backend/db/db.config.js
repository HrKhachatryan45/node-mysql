const mysql2 = require("mysql2");

const pool = mysql2.createPool({
    host: "localhost",
    user: "root",
    password: "admin123",
    connectionLimit: 5000,
    database: "exampledb"
}).promise();

module.exports = pool;