<?php
$host = getenv("DB_HOST");
$port = getenv("DB_PORT");
$user = getenv("DB_USER");
$pass = getenv("DB_PASSWORD");
$dbname = getenv("DB_NAME");

$conn = new mysqli($host, $user, $pass, $dbname, (int)$port);
if ($conn->connect_error) {
    die("Error de conexión: " . $conn->connect_error);
}
?>
