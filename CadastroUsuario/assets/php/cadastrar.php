<meta charset="UTF-8">
<?php
session_start();
require_once('../../../assets/php/globals.php');

$email=$_POST['email'];
$local='../../cadastro_usuario';

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
        $local=$local.'?'.hash("sha512", 'erro=true');
        header("Refresh:0; url=".$local);
        exit;
    }
}

$query="SELECT email FROM usuario WHERE email=?";
$exec=$conec->prepare($query);
$exec->bind_param("s", $email);
$exec->execute();
$result=$exec->get_result()->fetch_assoc()['email'];

if($result){ // email já utilizado
    $local=$local.'?'.hash("sha512", 'email=false');
    header("Refresh:0; url="."$local");
    exit;
}

$nome=$_POST['nome'];
$senha=hash("sha512", $_POST['senha']);

$query="INSERT INTO usuario(nome, email, senha)  VALUES(?, ?, ?)";
$exec=$conec->prepare($query);
$exec->bind_param("sss", $nome, $email, $senha);
$exec->execute();
$result=$exec->get_result();
verificarOperacao($result, $local);

header('Location: ../../../Login/login?'.hash("sha512", 'sucesso=true'));
exit;
?>
