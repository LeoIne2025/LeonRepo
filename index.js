const express = require('express');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 10000;

// Ruta raíz
app.get('/', (req, res) => {
  res.send('Servidor funcionando ✅');
});

// Ruta que convierte el PHP en JSON
app.get('/api/consumo', async (req, res) => {
  try {
    const response = await axios.get('https://adminmoviles.infinityfreeapp.com/get_consumo.php');
    res.json(response.data); // Enviamos el JSON directamente
  } catch (error) {
    console.error('❌ Error al obtener datos del PHP remoto:', error.message);
    res.status(500).json({ error: 'No se pudo obtener el archivo PHP remoto' });
  }
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
