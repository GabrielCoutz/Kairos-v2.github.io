<?php
session_start();
require('../../../assets/php/globals.php');

$email=$_POST['email'];
$senha=hash("sha512", $_POST['senha']);

$query="SELECT email, senha FROM usuario WHERE email=?";
$exec=$conec->prepare($query);
$exec->bind_param("s", $email);
$exec->execute();
$result=$exec->get_result()->fetch_assoc();

if($result['email'] === $email && $result['senha'] === $senha){
    $_SESSION['email']=$_POST['email'];
    header('Location: ../../../Perfil/usuario');
    exit;
}

header('Location: ../../login?'.hash("sha512", 'login=false'));
exit;

?>