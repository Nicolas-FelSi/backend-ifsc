<?php
    require_once("conexao.php");


    try {
        if (empty($_REQUEST['expressaoBusca'])) {
            $stmt = $conn->prepare("SELECT * FROM cliente ORDER BY nome");
        } else {
            $e = $_REQUEST['expressaoBusca'];
            $stmt = $conn->prepare("SELECT * FROM cliente WHERE nome LIKE '%$e%' ORDER BY nome");
        } 

        $stmt->execute();
    
        $results = $stmt->fetchAll(PDO::FETCH_ASSOC);
        $json = json_encode($results);
        print($json);
    
    } catch(PDOException $e) {
        echo "Error: " . $e->getMessage();
    }
    
    $conn = null; 
?>


