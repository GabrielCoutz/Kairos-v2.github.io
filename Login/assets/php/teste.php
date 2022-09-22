<?php 
header('Access-Control-Allow-Origin: *'); 
header("Content-Type: application/json; charset=UTF-8"); 

$dbHost     = 'localhost';
$dbUname = 'root';
$dbPass = '';
$dbName     = 'kairos';

$conec=new mysqli($dbHost,$dbUname,$dbPass,$dbName,"3306");
// $email_padrao = $_POST['email'];
$email_padrao = 'gabriel@gmail.com';
$query="SELECT * FROM telefone WHERE email_usuario=?";
$exec=$conec->prepare($query);
$exec->bind_param("s", $email_padrao);
$exec->execute();
$result=$exec->get_result();

$obj = Array();
while ($row = mysqli_fetch_assoc($result)) {
    $obj[] = $row;
}
echo json_encode($obj);

?>