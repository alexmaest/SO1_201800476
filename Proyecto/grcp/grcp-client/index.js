const express = require('express');
const cors = require('cors')
const app = express();

app.use(cors({origin: '*',}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(require('./routes/consultas'));

app.listen(8000, () => {
  console.log('Servidor escuchando en el puerto 8000');
});
