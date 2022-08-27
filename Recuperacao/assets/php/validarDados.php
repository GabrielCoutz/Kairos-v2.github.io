<?php

session_start();
error_reporting(E_ERROR | E_PARSE);

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

if(isset($_POST['g-recaptcha-response']) && $_POST['g-recaptcha-response'] != ""){
    $url='https://www.google.com/recaptcha/api/siteverify';
    $secret = '6Ld5L3oeAAAAAF7ExJjjJbY9EnWGQSyjCin5aGRL';
    $response = $_POST['g-recaptcha-response'];
    $variaveis = "secret=".$secret."&response=".$response;

    $ch = curl_init($url);
    curl_setopt($ch, CURLOPT_POST, 1);
    curl_setopt($ch, CURLOPT_POSTFIELDS, $variaveis);
    curl_setopt($ch, CURLOPT_FOLLOWLOCATION, 1);
    curl_setopt($ch, CURLOPT_HEADER, 0);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
    $resp = json_decode(curl_exec($ch));

    if ($resp->success != 1){
        header('Location: ../../recuperacao?'.hash("sha512", 'captcha=false'));
        exit;
    }
}

$email=trim($_POST['email']);
$nome=trim(strtolower($_POST['nome']));

$query="SELECT email, nome FROM usuario WHERE email=?";
$exec=$conec->prepare($query);
$exec->bind_param("s", $email);
$exec->execute();
$result=$exec->get_result()->fetch_assoc();

if($email === $result['email'] && $nome === strtolower($result['nome'])){ // dados corretos
    $_SESSION['email'] = $email;
    header('Location: ../../MudarSenha/mudar?'.hash("sha512", 'conta_encontrada=true'));
    exit;
}

header('Location: ../../recuperacao?'.hash("sha512", 'conta=false'));
exit;

?>