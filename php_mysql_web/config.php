<?php
$host = "8.tcp.ngrok.io";       // Host ngrok que expone tu MySQL
$puerto = 19927;                 // Puerto que muestra ngrok
$usuario = "juan";               // Usuario MySQL que creaste
$password = "juan22";            // Contraseña de ese usuario
$basedatos = "libro";            // Tu base de datos

// Crear conexión
$conn = new mysqli($host, $usuario, $password, $basedatos, $puerto);

// Verificar conexión
if ($conn->connect_error) {
    die("Conexión fallida: " . $conn->connect_error);
}

echo "Conexión exitosa a la base de datos";
?>
