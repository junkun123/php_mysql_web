const express = require('express');
const mysql = require('mysql2');
const app = express();

// Usa el puerto que Render asigna en la variable de entorno PORT
const port = process.env.PORT || 3000;

const pool = mysql.createPool({
  host: process.env.DB_HOST || '127.0.0.1',
  user: process.env.DB_USER || 'jun',
  password: process.env.DB_PASS || 'juan22',
  database: process.env.DB_NAME || 'libro',
  port: process.env.DB_PORT || 3306,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

app.get('/', (req, res) => {
  pool.query('SHOW DATABASES', (err, dbs) => {
    if (err) {
      return res.status(500).send(`Error al listar bases de datos: ${err.message}`);
    }

    pool.query('SHOW TABLES', (err, tables) => {
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
});

app.listen(port, '0.0.0.0', () => {
  console.log(`Servidor ejecutándose en http://0.0.0.0:${port}`);
});
