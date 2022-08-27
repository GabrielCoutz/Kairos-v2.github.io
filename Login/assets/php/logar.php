<?php
session_start();
$dbHost     = 'localhost';
$dbUname = 'root';
$dbPass = '';
$dbName     = 'kairos';

$conec=new mysqli($dbHost,$dbUname,$dbPass,$dbName,"3306");

if($conec->connect_error){ // se não for localhost, usa a conexão do banco no site
    $dbHost = 'sql309.epizy.com';
    $dbUname = 'epiz_31926454';
    $dbPass = 'VOjqZcbwH38iVo';
    $dbName = 'epiz_31926454_Banco_Kairos';
    $conec=new mysqli($dbHost,$dbUname,$dbPass,$dbName,"3306");
}

$email=$_POST['email'];
$senha=hash("sha512", $_POST['senha']);

$query="SELECT email, senha FROM usuario WHERE email=?";
$exec=$conec->prepare($query);
$exec->bind_param("s", $email);
$exec->execute();
$result=$exec->get_result()->fetch_assoc();

if($result && $result['email'] == $email && $result['senha'] == $senha){
    $_SESSION['email']=$_POST['email'];
    header('Location: ../../../Perfil/usuario');
    exit;
}

header('Location: ../../login?'.hash("sha512", 'login=false'));
exit;

?>