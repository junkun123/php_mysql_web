const mysql = require('mysql2');

const pool = mysql.createPool({
  host: '190.62.85.241',
  user: 'jun',
  password: 'juan22',
  database: 'libro',
  port: 3306
});

pool.getConnection((err, conn) => {
  if (err) {
    console.error('Error conectando a MySQL:', err.message);
  } else {
    console.log('Conexión a MySQL exitosa');
    conn.release();
  }
  process.exit(0);
});
