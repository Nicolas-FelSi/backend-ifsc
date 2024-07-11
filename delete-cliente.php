<?php
    require_once("conexao.php");
    print_r($_REQUEST);
    $request = (object) $_REQUEST;

    try {
        $stmt = $conn->prepare("DELETE FROM cliente WHERE codigo = ?");
        $stmt->execute([$request->id]);
    
        // $results = $stmt->fetchAll(PDO::FETCH_ASSOC);
        // $json = json_encode($results);
        // print($json);
    
    } catch(PDOException $e) {
        echo "Error: " . $e->getMessage();
    }
    
    $conn = null; 
?>
