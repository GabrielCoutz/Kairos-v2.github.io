<?php

session_start();
error_reporting(E_ERROR | E_PARSE);

$dbHost     = 'localhost';
$dbUname = 'root';
$dbPass = '';
$dbName     = 'kairos';

$conec=new mysqli($dbHost,$dbUname,$dbPass,$dbName,"3306");

function verificarOperacao($query, $url){ // retorna uma sinalização de erro
    if(!$query){ // se a operação não tiver retorno, não foi feita. Então manda uma sinalização de erro mostrando que houve falha.
        header('Location:'.$url.'?'.md5('sucesso=false'));
        exit;
        return;
    }
}

if($conec->connect_error){ // se não for localhost, usa a conexão do banco no site
    $dbHost = 'sql309.epizy.com';
    $dbUname = 'epiz_31926454';
    $dbPass = 'VOjqZcbwH38iVo';
    $dbName = 'epiz_31926454_Banco_Kairos';
    $conec=new mysqli($dbHost,$dbUname,$dbPass,$dbName,"3306");
}

$senha_nova = md5($_POST['senha_nova']);
$email = $_SESSION['email'];

$result_senha=mysqli_query($conec,"UPDATE usuario SET senha = '$senha_nova' WHERE email = '$email'");
verificarOperacao($result_senha, '../../../../Login/login?');
header('Location: ../../../../Login/login?'.md5('sucesso_senha=true'));
exit;
?>
<script type="text/javascript" src='https://cdnjs.cloudflare.com/ajax/libs/blueimp-md5/2.12.0/js/md5.min.js'></script>