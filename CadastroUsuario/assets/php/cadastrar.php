<meta charset="UTF-8">
<?php
session_start();
require_once( '../../../assets/php/globals.php' );

$email = $_POST['email'];
$local = '../../cadastro_usuario';

$query = "SELECT email FROM usuario WHERE email=?";
$exec = $conec->prepare( $query );
$exec->bind_param( "s", $email );
$exec->execute();
$result = $exec->get_result()->fetch_assoc()['email'];

if ( $result ) { // email já utilizado
	$local = $local . '?' . hash( "sha512", 'email=false' );
	header( "Refresh:0; url=" . "$local" );
	exit;
}

$nome = $_POST['nome'];
$senha = hash( "sha512", $_POST['senha'] );

$query = "INSERT INTO usuario(nome, email, senha)  VALUES(?, ?, ?)";
$exec = $conec->prepare( $query );
$exec->bind_param( "sss", $nome, $email, $senha );
$exec->execute();
$result = $exec->get_result();
verificarOperacao( $result, $local );

header( 'Location: ../../../Login/login?' . hash( "sha512", 'cadastro=true' ) );
exit;
?>