const express = require('express');
const mysql = require('mysql');
var cors = require('cors');
const app = express();

app.use(cors({origin: '*',}));

const connection = mysql.createConnection({
  host: '34.125.230.126',
  user: 'root',
  password: 'pass123',
  database: 'backendTable'
});

connection.connect((err) => {
  if (err) {
    console.error('Error de conexión a MySQL: ', err);
  } else {
    console.log('Conexión a MySQL establecida');
  }
});

app.get('/ram', async (req, res) => {
  const sql = 'SELECT * FROM RAM';
  connection.query(sql, async (err, result) => {
    if (err) {
      console.error('Error al ejecutar la consulta: ', err);
      res.status(500).send('Error del servidor');
    } else {
      if (result.length > 0) {
        res.send(result[0].Porcentaje);
        return; // Agregar declaración de retorno
      } else {
        res.status(404).send('No se encontraron resultados');
        return; // Agregar declaración de retorno
      }
    }
  });
});

app.get('/cpu', async (req, res) => {
  const sql = 'SELECT * FROM Cpu';
  connection.query(sql, async (err, result) => {
    if (err) {
      console.error('Error al ejecutar la consulta: ', err);
      res.status(500).send('Error del servidor');
    } else {
      if (result.length > 0) {
        res.send(result[0].datos);
        return; // Agregar declaración de retorno
      } else {
        res.status(404).send('No se encontraron resultados');
        return; // Agregar declaración de retorno
      }
    }
  });
});

app.get('/process', async (req, res) => {
  const sql = 'SELECT * FROM Procesos';
  connection.query(sql, async (err, result) => {
    if (err) {
      console.error('Error al ejecutar la consulta: ', err);
      res.status(500).send('Error del servidor');
    } else {
      if (result.length > 0) {
        res.send(result[0].datos);
        return; // Agregar declaración de retorno
      } else {
        res.status(404).send('No se encontraron resultados');
        return; // Agregar declaración de retorno
      }
    }
  });
});

app.listen(5000, () => {
  console.log('Servidor iniciado en el puerto 5000');
});
