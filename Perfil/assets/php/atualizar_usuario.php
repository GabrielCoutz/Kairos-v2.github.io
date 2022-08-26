<?php
session_start();


function conec(){
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
    }

    return $conec=new mysqli($dbHost,$dbUname,$dbPass,$dbName,"3306");
}

$local='../../usuario';
$duplicado=false;
$email_padrao=$_SESSION['email_padrao'];

function verificarOperacao($query, $url){ // retorna uma sinalização de erro
    if(!$query){ // se a operação não tiver retorno, não foi feita. Então manda uma sinalização de erro mostrando que houve falha.
        header('Location:'.$url.'?'.hash("sha512", 'sucesso=false'));
        exit;
        return;
    }
}

if(isset($_COOKIE['endereco'])){ // alteração do endereco

    $cep = $_POST['cep'];
    $numero = $_POST['numero'];
    $rua = $_POST['rua'];
    $bairro = $_POST['bairro'];
    $cidade = $_POST['cidade'];
    $estado = $_POST['estado'];
    $conec = conec();
    $select_endereco=mysqli_query($conec, "SELECT * FROM endereco WHERE email_usuario='$email_padrao'")->fetch_assoc();
    mysqli_close($conec);

    if(empty($select_endereco['email_usuario'])){ // se não tiver endereço, então todos os dados são cadastrados
        $conec = conec();
        $result_endereco=mysqli_query($conec, "INSERT INTO endereco(email_usuario, cep, rua, numero, bairro, cidade, estado) VALUES('$email_padrao', '$cep', '$rua', '$numero', '$bairro', '$cidade', '$estado')") or die(mysqli_error($conec)."inserindoEndereco");
        mysqli_close($conec);

    } else { // senão é realizado apenas a alteração
        $conec = conec();
        $result_endereco=mysqli_multi_query($conec,"UPDATE endereco SET cep='$cep' WHERE email_usuario='$email_padrao';
        UPDATE endereco SET rua='$rua' WHERE email_usuario='$email_padrao';
        UPDATE endereco SET numero='$numero' WHERE email_usuario='$email_padrao';
        UPDATE endereco SET bairro='$bairro' WHERE email_usuario='$email_padrao';
        UPDATE endereco SET cidade='$cidade' WHERE email_usuario='$email_padrao';
        UPDATE endereco SET estado='$estado' WHERE email_usuario='$email_padrao';") or die(mysqli_error($conec)."alterandoEndereco");
        mysqli_close($conec);
    }
    
    setcookie('endereco', '', time() - 3600, '/');
    verificarOperacao($result_endereco, $local);
}

if(isset($_COOKIE['senha'])){ // alterar senha
    $senha_antiga = hash("sha512", $_POST['senha_antiga']);
    $senha_nova = hash("sha512", $_POST['senha_nova']);
    $senha_nova_dup = hash("sha512", $_POST['senha_nova_dup']);
    $conec = conec();
    $select_senha=mysqli_query($conec, "SELECT senha FROM usuario WHERE email ='$email_padrao'")->fetch_assoc()['senha'];
    mysqli_close($conec);
    if($select_senha != $senha_antiga){ 
        setcookie('senha', '', time() - 3600, '/');
        header('Location:'.$local.'?'.hash("sha512", 'senha=false'));
        exit;

    } else {
        $conec = conec();
        $result_senha=mysqli_query($conec,"UPDATE usuario SET senha = '$senha_nova' WHERE email = '$email_padrao'") or die(mysqli_error($conec)."senha");
        mysqli_close($conec);

        setcookie('senha', '', time() - 3600, '/');
        verificarOperacao($result_senha, $local);

        header('Location:'.$local.'?'.hash("sha512", 'sucesso=true'));
        exit;
        }
}

if(isset($_COOKIE['usuario'])){ // alteração de dados usuário
    $nome = $_POST['nome'];

    if($nome != $_SESSION['nome_padrao']){
        $conec = conec();
        $result=mysqli_query($conec,"UPDATE usuario SET nome='$nome' WHERE email = '$email_padrao'") or die(mysqli_error($conec)."nome");
        mysqli_close($conec);
        verificarOperacao($result, $local);
    }

    $i = 0;
    while (isset($_COOKIE['adicionar'.$i])) { // adiciona numeros
        $tel = $_COOKIE['adicionar'.$i];
        $conec = conec();
        $result=mysqli_query($conec,"INSERT INTO telefone(email_usuario,tel) VALUES('$email_padrao','$tel')") or die(mysqli_error($conec)."addTel");
        mysqli_close($conec);
        verificarOperacao($result, $local);

        setcookie('adicionar'.$i, '', time() - 3600, '/');
        $i++;
    }
    
    $i = 0;
    while (isset($_COOKIE['deletar'.$i])) { // deleta numeros
        $tel = $_COOKIE['deletar'.$i];
        $conec = conec();

        $query="DELETE FROM telefone WHERE tel=?";
        $exec=$conec->prepare($query);
        $exec->bind_param("s", $tel);
        $exec->execute();
        $result=$exec->get_result();

        // $result=mysqli_query($conec,"DELETE FROM telefone WHERE tel='$tel'") or die(mysqli_error($conec)."delTel");
        // mysqli_close($conec);

        setcookie('deletar'.$i, '', time() - 3600, '/');
        $i++;
    }

    setcookie('usuario', '', time() - 3600, '/');
    header('Location:'.$local.'?'.hash("sha512", 'sucesso=true'));
    exit;
}
?>

<script src="https://cdnjs.cloudflare.com/ajax/libs/crypto-js/4.1.1/crypto-js.min.js" integrity="sha512-E8QSvWZ0eCLGk4km3hxSsNmGWbLtSCSUcewDQPQWZF6pEU8GlT8a5fF32wOl1i8ftdMhssTrF/OhyGWwonTcXA==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>