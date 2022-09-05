<meta charset="UTF-8">
<?php
session_start();
require_once ('../../../assets/php/globals.php');

$local='../../cadastro_empresa';
$cnpj=$_POST['cnpj'];

$query="SELECT id FROM empresa WHERE cnpj=?";
$exec=$conec->prepare($query);
$exec->bind_param("s", $cnpj);
$exec->execute();
$result=$exec->get_result()->fetch_assoc();

if(isset($result['id'])){ //cnpj já usado
    $local=$local.'?'.hash("sha512", 'cnpj=false');
    header("Refresh:0; url="."$local");
    exit;
}

$email=$_SESSION['email'];
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
verificarOperacao($result_empresa, $local);

// registra o endereço da empresa
$query="INSERT INTO endereco_empresa(cnpj_empresa, cep, rua, numero, bairro, cidade, estado) VALUES((SELECT cnpj FROM empresa WHERE cnpj=?), ?, ?, ?, ?, ?, ?)";
$exec=$conec->prepare($query);
$exec->bind_param("sssssss", $cnpj, $cep_empresa, $rua_empresa, $numero_empresa, $bairro_empresa, $cidade_empresa, $estado_empresa);
$exec->execute();
$result_endereco=$exec->get_result();
verificarOperacao($result_endereco, $local);

if($result_empresa || $result_endereco){ // insert não feito
    header('Location: ../../../Login/login?'.hash("sha512", 'sucesso=false'));
    exit;
}

header('Location: ../../../Perfil/PerfilEmpresa/empresa?'.hash("sha512", 'cadastro=true'));
exit;
?>
