<?php
$cliente = json_decode(file_get_contents('php://input'));
$filename = "txt/clientes2.csv";

$file = fopen($filename, "a");

if($file) {
   $linha = "$cliente->codigo; $cliente->nome; $cliente->email\n";
   fwrite($file, $linha);
   fclose($file);
}
?>