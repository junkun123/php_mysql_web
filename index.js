const express = require('express');
const mysql = require('mysql2');
const app = express();
const port = process.env.PORT || 3000;

// Conexión a MySQL
const db = mysql.createConnection({
  host: process.env.DB_HOST || '127.0.0.1',
  user: process.env.DB_USER || 'jun',
  password: process.env.DB_PASS || 'juan22',
  database: process.env.DB_NAME || 'libro',
  port: process.env.DB_PORT || 3306
});

db.connect(err => {
  if (err) {
    console.error('❌ Error al conectar con MySQL:', err.message);
    process.exit(1);
  } else {
    console.log('✅ Conectado correctamente a MySQL');
  }
});

// Ruta principal: mostrar bases de datos y tablas de 'libro'
app.get('/', async (req, res) => {
  try {
    db.query('SHOW DATABASES', (err, dbs) => {
      if (err) {
        return res.status(500).send(`Error al listar bases de datos: ${err.message}`);
      }

      db.query('SHOW TABLES', (err, tables) => {
        if (err) {
          return res.status(500).send(`Error al listar tablas: ${err.message}`);
        }

        let html = `
          <h1>🔍 Diagnóstico de MySQL</h1>
          <h2>📂 Bases de datos disponibles:</h2>
          <ul>
            ${dbs.map(row => `<li>${row.Database}</li>`).join('')}
          </ul>

          <h2>📄 Tablas en la base de datos actual (${process.env.DB_NAME || 'libro'}):</h2>
          ${tables.length > 0 ? `
            <ul>
              ${tables.map(row => {
                const tableName = Object.values(row)[0];
                return `<li>${tableName}</li>`;
              }).join('')}
            </ul>
          ` : '<p><i>No hay tablas en esta base de datos.</i></p>'}
        `;

        res.send(html);
      });
    });
  } catch (err) {
    console.error(err);
    res.status(500).send(`Error inesperado: ${err.message}`);
  }
});

app.listen(port, () => {
  console.log(`Servidor ejecutándose en http://localhost:${port}`);
});
