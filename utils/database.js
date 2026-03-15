// Connection Successfully Established with MySQL DB

const mysql = require('mysql2');
let pool = mysql.createPool({
    host:'localhost',
    user:'root',
    password:'',
    database:'air-bnb',
    connectionLimit: 10,
    queueLimit:0,
    waitForConnections:true
}) 

module.exports = pool.promise();