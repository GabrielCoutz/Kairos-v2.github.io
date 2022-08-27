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

$local='../../cadastro_empresa';
$cnpj=$_POST['cnpj'];

$query="SELECT cnpj FROM empresa WHERE cnpj=?";
$exec=$conec->prepare($query);
$exec->bind_param("s", $cnpj);
$exec->execute();
$result=$exec->get_result()->fetch_assoc();

if(isset($result['cnpj'])){ //cnpj já usado
    $local=$local.'?'.hash("sha512", 'cnpj=false');
    header("Refresh:0; url="."$local");
    exit;
}

$email=$_SESSION['email_padrao'];
$nome_empresa=$_POST['nome_empresa'];
$nome_fantasia=$_POST['nome_fantasia'];
$ramo=$_POST['ramo'];
$cep_empresa=$_POST['cep_empresa'];
$rua_empresa=$_POST['rua_empresa'];
$numero_empresa=$_POST['numero_empresa'];
$bairro_empresa=$_POST['bairro_empresa'];
$cidade_empresa=$_POST['cidade_empresa'];
$estado_empresa=$_POST['estado_empresa'];

// registra a empresa
$query="INSERT INTO empresa(email_usuario, nome, nome_fantasia, cnpj, ramo) VALUES((SELECT email FROM usuario WHERE email=?), ?, ?, ?, ?)";
$exec=$conec->prepare($query);
$exec->bind_param("sssss", $email, $nome_empresa, $nome_fantasia, $cnpj, $ramo);
$exec->execute();
$result_empresa=$exec->get_result();

// registra o endereço da empresa
$query="INSERT INTO endereco_empresa(cnpj_empresa, cep, rua, numero, bairro, cidade, estado) VALUES((SELECT cnpj FROM empresa WHERE cnpj=?), ?, ?, ?, ?, ?, ?)";
$exec=$conec->prepare($query);
$exec->bind_param("sssssss", $cnpj, $cep_empresa, $rua_empresa, $numero_empresa, $bairro_empresa, $cidade_empresa, $estado_empresa);
$exec->execute();
$result_endereco=$exec->get_result();

if($result_empresa || $result_endereco){ // insert não feito
    header('Location: ../../../Login/login?'.hash("sha512", 'sucesso=false'));
    exit;
}

header('Location: ../../../Perfil/PerfilEmpresa/empresa?'.hash("sha512", 'cadastro=true'));
exit;
?>
