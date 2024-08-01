<?php
require_once("conexao.php");

print_r($_REQUEST);
$request = (object) $_REQUEST;

try {
    $stmt = $conn->prepare("UPDATE cliente SET nome = :nome, email = :email WHERE codigo = :codigo");
    $stmt->execute($_REQUEST);
    $results = $stmt->fetchAll(PDO::FETCH_ASSOC);
    $json = json_encode($results);
} catch (Exception $e) {
    echo "Error: " . $e->getMessage();
}
?>