<?php
include 'config.php';

$result = $conn->query("SHOW TABLES");

echo "<h1>Conexión exitosa a la base de datos 'libro'</h1>";
echo "<ul>";
while ($row = $result->fetch_array()) {
    echo "<li>" . $row[0] . "</li>";
}
echo "</ul>";

$conn->close();
?>
