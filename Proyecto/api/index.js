const express = require('express');
const Redis = require('ioredis');
var cors = require('cors');
const app = express();

app.use(cors({origin: '*',}));

app.use(express.json());

app.use(require('./routes/consultas'));

var boletas = [];
var sedes = [];

// Conexión con Redis
const client = new Redis({
  host: 'redis',
  port: 6379,
  password: '',
  db: 0,
});

client.subscribe('boletas', function (err) {
  if (err) {
    console.error(err);
  }
  console.log("Conectado con exito");
});

// Subscripción al canal "boletas"
client.on('message', function (channel, message) {
  // Separar el mensaje en sus componentes
  const values = message.split(':');
  if (values.length !== 5) {
    console.log('input does not match format');
    return;
  }
  boletas.push(values);
  agregarSede(values);
  console.log(values);
});

// Ruta de prueba
app.get('/', (req, res) => {
  const now = new Date();
  const day = now.getDate().toString().padStart(2, '0');
  const month = (now.getMonth() + 1).toString().padStart(2, '0');
  const year = now.getFullYear().toString().slice(-2);
  const hours = now.getHours().toString().padStart(2, '0');
  const minutes = now.getMinutes().toString().padStart(2, '0');
  const formattedDate = `${day}/${month}/${year} - ${hours}:${minutes}`;

  const reports = {
    time: formattedDate,
    reporte5: obtenerTop5Sedes(sedes),
    reporte6: boletas.slice(-5)
  };
  res.json(reports);
});

app.post('/', (req, res) => {
  console.log("llega dato");
});

function agregarSede(values) {
  const nuevaSede = {
    sede: 'Sede ' + values[0],
    cantidad: 1
  };

  // Verificar si la sede ya existe en el array
  const sedeExistente = sedes.find(sede => sede.sede === nuevaSede.sede);

  // Si la sede ya existe, aumentar la cantidad en 1
  if (sedeExistente) {
    sedeExistente.cantidad++;
  } else {
    // Si la sede no existe, agregarla al array
    sedes.push(nuevaSede);
  }
}

function obtenerTop5Sedes(sedesArray) {
  // Ordenar el array de sedes en orden descendente según la cantidad
  sedesArray.sort((a, b) => b.cantidad - a.cantidad);

  // Obtener las primeras 5 sedes (con mayor cantidad) del array
  const top5Sedes = sedesArray.slice(0, 5);

  return top5Sedes;
}

// Iniciar el servidor en el puerto 5001
app.listen(5001, () => {
  console.log('Servidor escuchando en el puerto 5001');
});
