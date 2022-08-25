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
$senha=md5($_POST['senha']);

// $select=mysqli_query($conec, "SELECT email, senha FROM usuario WHERE email ='$email'")->fetch_assoc();

$query="SELECT email, senha FROM usuario WHERE email=?";
$exec=$conec->prepare($query);
$exec->bind_param("s", $email);
$exec->execute();
$result=$exec->get_result()->fetch_assoc();

if($result){
    if($result['email'] == $email && $result['senha'] == $senha){
        $_SESSION['email']=$_POST['email'];
        header('Location: ../../../Perfil/usuario');
        exit;
    }
}

header('Location: ../../login?'.md5('login=false'));
exit;

?>
<script type="text/javascript" src='https://cdnjs.cloudflare.com/ajax/libs/blueimp-md5/2.12.0/js/md5.min.js'></script>