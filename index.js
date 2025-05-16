const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio'); // si el PHP responde HTML en tabla
const app = express();
const PORT = process.env.PORT || 3000;

app.get('/api/consumo', async (req, res) => {
  try {
    const { data } = await axios.get('https://adminmoviles.infinityfreeapp.com/get_consumo.php');

    // Si ya viene como JSON directamente
    try {
      const json = JSON.parse(data);
      return res.json(json);
    } catch (e) {
      // Si no es JSON, asumimos que es HTML con una tabla
      const $ = cheerio.load(data);
      const rows = [];
      $('table tr').each((i, el) => {
        const cols = $(el).find('td');
        if (cols.length > 0) {
          rows.push({
            campo1: $(cols[0]).text().trim(),
            campo2: $(cols[1]).text().trim(),
            // agrega más campos si hay más columnas
          });
        }
      });
      return res.json(rows);
    }

  } catch (err) {
    console.error('Error al obtener los datos:', err.message);
    res.status(500).json({ error: 'Error al obtener los datos.' });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor escuchando en puerto ${PORT}`);
});

