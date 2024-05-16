<?php
$servername = "localhost";
$username = "root";
$dbname = "meubanco";

try {
    $conn = new PDO("mysql:host=$servername;dbname=$dbname", $username);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $stmt = $conn->prepare("SELECT * FROM cliente");
    $stmt->execute();

    $results = $stmt->fetchAll(PDO::FETCH_ASSOC);
    $json = json_encode($results);
    print($json);

} catch(PDOException $e) {
    echo "Error: " . $e->getMessage();
}

$conn = null; 
?>

