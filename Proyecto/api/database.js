const mysql = require('mysql2');

const mysqlConnection = mysql.createConnection({
    host: 'mysql',
    user: 'root',
    password: 'pass123',
    database: 'backendTable',
    port: '3306'
});

mysqlConnection.connect(function (err) {
    if(err){
        console.log(err);
        return;
    }else{
        console.log("Base de Datos conectada")
    }
});

module.exports = mysqlConnection;