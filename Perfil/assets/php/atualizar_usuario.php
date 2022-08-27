<?php

session_start();
require('../../../assets/php/globals.php');

$local='../../usuario';
$email_padrao=$_SESSION['email_padrao'];

if(isset($_COOKIE['endereco'])){ // alteração do endereco

    $cep = $_POST['cep'];
    $numero = $_POST['numero'];
    $rua = $_POST['rua'];
    $bairro = $_POST['bairro'];
    $cidade = $_POST['cidade'];
    $estado = $_POST['estado'];
    $query="SELECT id FROM endereco WHERE email_usuario=?";
    $exec=$conec->prepare($query);
    $exec->bind_param("s", $email_padrao);
    $exec->execute();
    $result=$exec->get_result()->fetch_assoc()['id'];

    if(empty($result)){ // se não tiver endereço, então todos os dados são cadastrados
        $query="INSERT INTO endereco(email_usuario, cep, rua, numero, bairro, cidade, estado) VALUES(?, ?, ?, ?, ?, ?, ?)";
        $exec=$conec->prepare($query);
        $exec->bind_param("sssssss",$email_padrao, $cep, $rua, $numero, $bairro, $cidade, $estado);
        $exec->execute();
        $result=$exec->get_result();
        verificarOperacao($result, $local);
    } else { // senão é realizado apenas a alteração
        $query="UPDATE endereco SET cep=?, rua=?, numero=?, bairro=?, cidade=?, estado=? WHERE email_usuario=?";
        $exec=$conec->prepare($query);
        $exec->bind_param("sssssss", $cep, $rua, $numero, $bairro, $cidade, $estado, $email_padrao);
        $exec->execute();
        $result=$exec->get_result();
        verificarOperacao($result, $local);
    }
    
    setcookie('endereco', '', time() - 3600, '/');
    verificarOperacao($result_endereco, $local);
}

// if(isset($_COOKIE['senha'])){ // alterar senha
//     $senha_antiga = hash("sha512", $_POST['senha_antiga']);
//     $senha_nova = hash("sha512", $_POST['senha_nova']);
//     $senha_nova_dup = hash("sha512", $_POST['senha_nova_dup']);
    
//     $select_senha=mysqli_query($conec, "SELECT senha FROM usuario WHERE email ='$email_padrao'")->fetch_assoc()['senha'];
    
//     if($select_senha != $senha_antiga){ 
//         setcookie('senha', '', time() - 3600, '/');
//         header('Location:'.$local.'?'.hash("sha512", 'senha=false'));
//         exit;

//     } else {
        
//         $result_senha=mysqli_query($conec,"UPDATE usuario SET senha = '$senha_nova' WHERE email = '$email_padrao'") or die(mysqli_error($conec)."senha");
        

//         setcookie('senha', '', time() - 3600, '/');
//         verificarOperacao($result_senha, $local);

//         header('Location:'.$local.'?'.hash("sha512", 'sucesso=true'));
//         exit;
//         }
// }

if(isset($_COOKIE['usuario'])){ // alteração de dados usuário
    $nome = $_POST['nome'];

    if($nome != $_SESSION['nome_padrao']){
        $query="UPDATE usuario SET nome=? WHERE email=?";
        $exec=$conec->prepare($query);
        $exec->bind_param('ss', $nome, $email_padrao);
        $exec->execute();
        $result=$exec->get_result();
        verificarOperacao($result, $local);
    }

    $i = 0;
    while (isset($_COOKIE['adicionar'.$i])) { // adiciona numeros
        $tel = $_COOKIE['adicionar'.$i];

        $query="INSERT INTO telefone(email_usuario, tel) VALUES(?, ?)";
        $exec=$conec->prepare($query);
        $exec->bind_param('ss', $email_padrao, $tel);
        $exec->execute();
        $result=$exec->get_result();
        verificarOperacao($result, $local);

        setcookie('adicionar'.$i, '', time() - 3600, '/');
        $i++;
    }
    
    $i = 0;
    while (isset($_COOKIE['deletar'.$i])) { // deleta numeros
        $tel = $_COOKIE['deletar'.$i];

        $query="DELETE FROM telefone WHERE tel=?";
        $exec=$conec->prepare($query);
        $exec->bind_param("s", $tel);
        $exec->execute();
        $result=$exec->get_result();
        verificarOperacao($result, $local);

        setcookie('deletar'.$i, '', time() - 3600, '/');
        $i++;
    }

    setcookie('usuario', '', time() - 3600, '/');
    header('Location:'.$local.'?'.hash("sha512", 'sucesso=true'));
    exit;
}
?>