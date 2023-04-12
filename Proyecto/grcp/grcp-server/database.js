const mysql = require('mysql2');

const mysqlConnection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'secret',
    database: 'backendTable',
    port: '3308'
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