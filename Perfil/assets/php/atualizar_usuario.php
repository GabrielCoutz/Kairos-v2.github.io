<meta charset="UTF-8">
<?php
session_start();
require_once('../../../assets/php/globals.php');

$local = '../../usuario';
$email_padrao = $_SESSION['email_padrao'];

if (isset($_COOKIE['endereco'])) { // alteração do endereco

    $cep = $_POST['cep'];
    $numero = $_POST['numero'];
    $rua = $_POST['rua'];
    $bairro = $_POST['bairro'];
    $cidade = $_POST['cidade'];
    $estado = $_POST['estado'];
    $complemento = $_POST['complemento'];
    if (empty($complemento)) {
        $complemento = null;
    };
    $query = "SELECT id FROM endereco WHERE email_usuario=?";
    $exec = $conec->prepare($query);
    $exec->bind_param("s", $email_padrao);
    $exec->execute();
    $result = $exec->get_result()->fetch_assoc()['id'];

    if (empty($result)) { // se não tiver endereço, então todos os dados são cadastrados
        $query = "INSERT INTO endereco(email_usuario, cep, complemento, rua, numero, bairro, cidade, estado) VALUES(?, ?, ?, ?, ?, ?, ?, ?)";
        $exec = $conec->prepare($query);
        $exec->bind_param("ssssssss", $email_padrao, $cep, $complemento, $rua, $numero, $bairro, $cidade, $estado);
        $exec->execute();
        $result = $exec->get_result();
        verificarOperacao($result, $local);
    } else { // senão é realizado apenas a alteração
        $query = "UPDATE endereco SET cep=?, complemento=?, rua=?, numero=?, bairro=?, cidade=?, estado=? WHERE email_usuario=?";
        $exec = $conec->prepare($query);
        $exec->bind_param("ssssssss", $cep, $complemento, $rua, $numero, $bairro, $cidade, $estado, $email_padrao);
        $exec->execute();
        $result = $exec->get_result();
        verificarOperacao($result, $local);
    }

    setcookie('endereco', '', time() - 3600, '/', NULL, true, true);
    verificarOperacao($result_endereco, $local);
}

if (isset($_COOKIE['senha'])) { // alterar senha
    $senha_antiga = hash("sha512", $_POST['senha_antiga']);
    $senha_nova = hash("sha512", $_POST['senha_nova']);

    $query = "SELECT senha FROM usuario WHERE email=?";
    $exec = $conec->prepare($query);
    $exec->bind_param("s", $email_padrao);
    $exec->execute();
    $result = $exec->get_result()->fetch_assoc()['senha'];

    if ($result !== $senha_antiga) {
        setcookie('senha', '', time() - 3600, '/', NULL, true, true);
        header('Location:' . $local . '?' . hash("sha512", 'senha=false'));
        exit;
    }

    $query = "UPDATE usuario SET senha=? WHERE email=?";
    $exec = $conec->prepare($query);
    $exec->bind_param("ss", $senha_nova, $email_padrao);
    $exec->execute();
    $result = $exec->get_result();

    setcookie('senha', '', time() - 3600, '/', NULL, true, true);
    verificarOperacao($result_senha, $local);

    header('Location:' . $local . '?' . hash("sha512", 'sucesso=true'));
    exit;
}

if (isset($_COOKIE['usuario'])) { // alteração de dados usuário
    $nome = $_POST['nome'];

    if ($nome !== $_SESSION['nome_padrao']) {
        $query = "UPDATE usuario SET nome=? WHERE email=?";
        $exec = $conec->prepare($query);
        $exec->bind_param('ss', $nome, $email_padrao);
        $exec->execute();
        $result = $exec->get_result();
        verificarOperacao($result, $local);
    }

    $i = 0;
    while (isset($_COOKIE['adicionar' . $i])) { // adiciona numeros
        $tel = $_COOKIE['adicionar' . $i];

        $query = "INSERT INTO telefone(email_usuario, tel) VALUES(?, ?)";
        $exec = $conec->prepare($query);
        $exec->bind_param('ss', $email_padrao, $tel);
        $exec->execute();
        $result = $exec->get_result();
        verificarOperacao($result, $local);

        setcookie('adicionar' . $i, '', time() - 3600, '/', NULL, true, true);
        $i++;
    }

    $i = 0;
    while (isset($_COOKIE['deletar' . $i])) { // deleta numeros
        $tel = $_COOKIE['deletar' . $i];

        $query = "DELETE FROM telefone WHERE tel=?";
        $exec = $conec->prepare($query);
        $exec->bind_param("s", $tel);
        $exec->execute();
        $result = $exec->get_result();
        verificarOperacao($result, $local);

        setcookie('deletar' . $i, '', time() - 3600, '/', NULL, true, true);
        $i++;
    }

    setcookie('usuario', '', time() - 3600, '/', NULL, true, true);
    header('Location:' . $local . '?' . hash("sha512", 'sucesso=true'));
    exit;
}
?>