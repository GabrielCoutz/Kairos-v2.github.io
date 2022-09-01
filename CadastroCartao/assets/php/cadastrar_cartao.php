<meta charset="UTF-8">
<?php
session_start();
require_once('../../../assets/php/globals.php');

$plano = $_SESSION['plano'];
$email = $_SESSION['email'];
$local='../../cadastro_cartao';

if(isset($_GET['alterar_plano'])){ // alteração de plano
    $query="UPDATE cartao SET assinatura=? WHERE email_usuario=?";
    $exec=$conec->prepare($query);
    $exec->bind_param("ss", $plano, $email);
    $exec->execute();
    $result=$exec->get_result();
    verificarOperacao($result, $local);

    header('Location: ../../../Perfil/usuario?'.hash("sha512", 'sucesso=true'));
    exit;
}

$num_cartao = $_POST['num_cartao'];
$titular = $_POST['nome_cartao'];
$cvv_cartao = hash("sha512", $_POST['cvv_cartao']);
$validade = $_POST['mes_cartao'].'/'.$_POST['ano_cartao'];
$cpf=$_POST['cpf'];
$cep=$_POST['cep'];
$rua=$_POST['rua'];
$numero=$_POST['numero'];
$bairro=$_POST['bairro'];
$cidade=$_POST['cidade'];
$estado=$_POST['estado'];

// verificar se o CPF já foi registrado
$query="SELECT cpf FROM usuario WHERE email=?";
$exec=$conec->prepare($query);
$exec->bind_param("s", $email);
$exec->execute();
$result=$exec->get_result()->fetch_assoc()['cpf'];

if ($result === $cpf){
    $local=$local.'?'.hash("sha512", 'cpf=false').'&plano='.$plano;
    header("Refresh:0; url="."$local");
    exit;
}

// insere os dados do cartão
$query="INSERT INTO cartao(email_usuario, titular, numero, validade, cvv, assinatura)  VALUES((SELECT email FROM usuario WHERE email=?), ?, ?, ?, ?, ?)";
$exec=$conec->prepare($query);
$exec->bind_param("ssssis", $email, $titular, $num_cartao, $validade, $cvv_cartao, $plano);
$exec->execute();
$result=$exec->get_result();
verificarOperacao($result, $local);

// atualiza o usuario, adicionando seu CPF
$query="UPDATE usuario SET cpf=? WHERE email=?";
$exec=$conec->prepare($query);
$exec->bind_param("ss", $cpf, $email);
$exec->execute();
$result_usuario=$exec->get_result();
verificarOperacao($result_usuario, $local);

$query="SELECT estado FROM endereco WHERE email_usuario=?";
$exec=$conec->prepare($query);
$exec->bind_param("s", $email);
$exec->execute();
$result_endereco=$exec->get_result()->fetch_assoc()['estado'];

if (empty($result_endereco)) { // se não tiver endereço, então todos os dados são cadastrados
    $query="INSERT INTO endereco(email_usuario, cep, rua, numero, bairro, cidade, estado) VALUES(?, ?, ?, ?, ?, ?, ?)";
    $exec=$conec->prepare($query);
    $exec->bind_param("sssssss",$email, $cep, $rua, $numero, $bairro, $cidade, $estado);
    $exec->execute();
    $result=$exec->get_result();
    verificarOperacao($result, $local);

} else { // senão é realizado apenas a alteração
        $query="UPDATE endereco SET cep=?, rua=?, numero=?, bairro=?, cidade=?, estado=? WHERE email_usuario=?";
        $exec=$conec->prepare($query);
        $exec->bind_param("sssssss", $cep, $rua, $numero, $bairro, $cidade, $estado, $email);
        $exec->execute();
        $result=$exec->get_result();
        verificarOperacao($result, $local);
}

header('Location: ../../../Perfil/usuario?'.hash("sha512", 'sucesso=true'));
exit;
?>