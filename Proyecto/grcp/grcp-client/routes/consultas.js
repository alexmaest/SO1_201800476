var express = require('express');
var router = express.Router();
const client = require('../grcp-client')

router.post('/', function(req, res) {
    console.log("Llego el dato");
    const data_voto = {
        sede : req.body.sede,
        municipio : req.body.municipio,
        departamento : req.body.departamento,
        papeleta : req.body.papeleta,
        partido : req.body.partido
    }
    client.AddVotos(data_voto, function(err, response) {
        console.log("Agregado en la base de datos")
        res.status(200).json({mensaje: response.message})
    });
});

module.exports = router;