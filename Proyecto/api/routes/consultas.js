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

module.exports = router;