const express = require('express');
const app = express();
const axios = require('axios');
const PORT = process.env.PORT || 10000;

// Ruta raíz para confirmar que el servidor está funcionando
app.get('/', (req, res) => {
  res.send('Servidor funcionando ✅');
});

// Ruta para traer el JSON del PHP
app.get('/api/consumo', async (req, res) => {
  try {
    const response = await axios.get('https://adminmoviles.infinityfreeapp.com/get_consumo.php');
    res.json(response.data); // Reenvía el JSON directamente
  } catch (error) {
    console.error('Error al obtener los datos:', error.message);
    res.status(500).json({ error: 'No se pudieron obtener los datos' });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});


