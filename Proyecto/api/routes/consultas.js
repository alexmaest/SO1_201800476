const express = require('express');
const router = express.Router();
const mysqlConnection = require('../database');

router.get('/boletas', (req, res) => {
    mysqlConnection.query('select * from boletas;', (err, rows, fields) => {
        if(!err){
            res.json(rows);
        }else{
            console.log(err);
        }
    });    
});

router.get('/tiempo', (req, res) => {
    var fecha= new Date();
    var dia_actual = fecha.getDate();
    var mes_actual = fecha.getMonth();
    var anio_actual = fecha.getFullYear();
    var hora_actual = fecha.getHours();
    var minuto_actual = fecha.getMinutes();
    var segundos_actual = fecha.getSeconds();
    var fecha_general = String(dia_actual) + "/" + String(mes_actual) + "/" + String(anio_actual) + "-" + String(hora_actual) + ":" + String(minuto_actual) + ":" + String(segundos_actual)
    var infoJson = {
        "Fecha": fecha_general
    }
    res.json(infoJson)
});

module.exports = router;