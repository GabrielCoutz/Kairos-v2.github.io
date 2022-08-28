<meta charset="UTF-8">
<?php
session_start();
require('../../../../assets/php/globals.php');

$local='../../empresa';
$email = $_SESSION['email_padrao'];

if($_POST['ramo'] != $_SESSION['ramo_padrao']){ // alteração de ramo
    $ramo=$_POST['ramo'];
    $query="UPDATE empresa SET ramo=? WHERE email_usuario=?";
    $exec=$conec->prepare($query);
    $exec->bind_param('ss', $ramo, $email);
    $exec->execute();
    $result=$exec->get_result();
    verificarOperacao($result, $local);
}

if(isset($_COOKIE['endereco'])){ // alteração do endereco da empresa

    $cep_empresa = $_POST['cep_empresa'];
    $numero_empresa = $_POST['numero_empresa'];
    $rua_empresa = $_POST['rua_empresa'];
    $bairro_empresa = $_POST['bairro_empresa'];
    $cidade_empresa = $_POST['cidade_empresa'];
    $estado_empresa = $_POST['estado_empresa'];
    $cnpj_padrao=$_SESSION['cnpj_padrao'];

    $query="UPDATE endereco_empresa SET cep=?, rua=?, numero=?, bairro=?, cidade=?, estado=? WHERE cnpj_empresa=?";
    $exec=$conec->prepare($query);
    $exec->bind_param("sssssss", $cep_empresa, $rua_empresa, $numero_empresa, $bairro_empresa, $cidade_empresa, $estado_empresa, $cnpj_padrao);
    $exec->execute();
    $result=$exec->get_result();
    verificarOperacao($result, $local);

    setcookie('endereco', '', time() - 3600, '/');
}

if(isset($_COOKIE['empresa'])) { // alteração de dados empresa

    if($_POST['nome_empresa'] != $_SESSION['nome_empresa_padrao']){ // verificação se o nome já é utilizado
        $nome_empresa = $_POST['nome_empresa'];
        $query="SELECT id FROM empresa WHERE nome=?";
        $exec=$conec->prepare($query);
        $exec->bind_param("s", $nome_empresa);
        $exec->execute();
        $result=$exec->get_result()->fetch_assoc()['nome'];
        
        if($result === $nome_empresa){ //sinalização de duplicação
            $local=$local.'?'.hash("sha512", ('nome_empresa_duplicado=true'));
            $duplicado=true;
        }
    }

    if($_POST['nome_fantasia'] != $_SESSION['nome_fantasia_padrao']){ // verificação se o nome já é utilizado
        $nome_fantasia = $_POST['nome_fantasia'];
        $query="SELECT id FROM empresa WHERE nome_fantasia =?";
        $exec=$conec->prepare($query);
        $exec->bind_param("s", $nome_fantasia);
        $exec->execute();
        $result=$exec->get_result()->fetch_assoc()['nome_fantasia'];

        if($result === $nome_fantasia){ //sinalização de duplicação
            $local=$local.'?'.hash("sha512", ('nome_fantasia_duplicado=true'));
            $duplicado=true;
        }
    }

    if($duplicado){ //retorno da verificação
        header('Location: '.$local);
        exit;
    }

    if(isset($nome_empresa)){
        $query="UPDATE empresa SET nome=? WHERE email_usuario=?";
        $exec=$conec->prepare($query);
        $exec->bind_param("ss", $nome_empresa, $email);
        $exec->execute();
        $result=$exec->get_result();
        verificarOperacao($result, $local);
    }
    
    if(isset($nome_fantasia)){
        $query="UPDATE empresa SET nome_fantasia=? WHERE email_usuario=?";
        $exec=$conec->prepare($query);
        $exec->bind_param("ss", $nome_fantasia, $email);
        $exec->execute();
        $result=$exec->get_result();
        verificarOperacao($result, $local);
    }
    
    setcookie('empresa', '', time() - 3600, '/');
    header('Location:'.$local.'?'.hash("sha512", 'sucesso=true'));
    exit;
}

?>