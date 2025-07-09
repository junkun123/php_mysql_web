const express = require('express');
const mysql = require('mysql2');
const app = express();
const port = process.env.PORT || 3000;

// Conexión a MySQL usando variables de entorno con valores por defecto
const db = mysql.createConnection({
  host: process.env.DB_HOST || '127.0.0.1',
  user: process.env.DB_USER || 'jun',
  password: process.env.DB_PASS || 'juan22',
  database: process.env.DB_NAME || 'libro',
  port: process.env.DB_PORT || 3306
});

// Intentar conectar a la base de datos
db.connect(err => {
  if (err) {
    console.error('❌ Error al conectar con MySQL:', err.message);
    process.exit(1);
  } else {
    console.log('✅ Conectado correctamente a MySQL');
  }
});

// Ruta principal
app.get('/', (req, res) => {
  db.query('SELECT NOW() AS ahora', (err, results) => {
    if (err) {
      return res.status(500).send('Error en la consulta');
    }
    // Aquí corregí las comillas para enviar bien el string
    res.send(`¡Hola desde Node.js! Hora del servidor: ${results[0].ahora}`);
  });
});

// Iniciar servidor
app.listen(port, () => {
  console.log(`Servidor ejecutándose en http://localhost:${port}`);
});
