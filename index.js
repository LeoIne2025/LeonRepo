const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());

const db = mysql.createConnection({
  host: 'sql212.infinityfree.com', // ejemplo: sql104.infinityfree.com
  user: 'if0_37751788',
  password: 'cJG2WZaEFH',
  database: 'if0_37751788_adminmoviles',
  port: 3306
});

db.connect((err) => {
  if (err) {
    console.error('Error de conexión:', err);
    return;
  }
  console.log('Conectado a MySQL de InfinityFree');
});

app.get('/datos', (req, res) => {
  db.query('SELECT * FROM tu_tabla', (err, results) => {
    if (err) {
      console.error('Error en la consulta:', err);
      res.status(500).send('Error en la base de datos');
    } else {
      res.json(results);
    }
  });
});

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
