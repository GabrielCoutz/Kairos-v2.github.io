<?php
session_start();
require ('../../../../assets/php/globals.php');

$senha_nova = hash("sha512", $_POST['senha_nova']);
$email = $_SESSION['email'];

$query="UPDATE usuario SET senha=? WHERE email=?";
$exec=$conec->prepare($query);
$exec->bind_param("ss", $senha_nova, $email);
$exec->execute();
$result=$exec->get_result();
verificarOperacao($result, '../../mudar');

header('Location: ../../../../Login/login?'.hash("sha512", 'sucesso_senha=true'));
exit;
?>