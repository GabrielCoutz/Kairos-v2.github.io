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

$local='../../empresa';
$email = $_SESSION['email_padrao'];

function verificarOperacao($query, $url){ // retorna uma sinalização de erro
    if(!$query){ // se a operação não tiver retorno, não foi feita. Então manda uma sinalização de erro mostrando que houve falha.
        header('Location:'.$url.'?'.md5('sucesso=false'));
        exit;
        return;
    }
}

if($_POST['ramo'] != $_SESSION['ramo_padrao']){ // alteração de ramo
    $ramo=$_POST['ramo'];
    $conec = conec();
    $result_ramo=mysqli_query($conec,"UPDATE empresa SET ramo='$ramo' WHERE email_usuario='$email'");
    mysqli_close($conec);
    verificarOperacao($result_ramo, $local);
}

if(isset($_COOKIE['endereco'])){ // alteração do endereco da empresa

    $cep_empresa = $_POST['cep_empresa'];
    $numero_empresa = $_POST['numero_empresa'];
    $rua_empresa = $_POST['rua_empresa'];
    $bairro_empresa = $_POST['bairro_empresa'];
    $cidade_empresa = $_POST['cidade_empresa'];
    $estado_empresa = $_POST['estado_empresa'];
    $cnpj_padrao=$_SESSION['cnpj_padrao'];

    $conec = conec();
    $result_endereco_empresa=mysqli_multi_query($conec,"UPDATE endereco_empresa SET cep='$cep_empresa' WHERE cnpj_empresa='$cnpj_padrao';
    UPDATE endereco_empresa SET rua='$rua_empresa' WHERE cnpj_empresa='$cnpj_padrao';
    UPDATE endereco_empresa SET numero='$numero_empresa' WHERE cnpj_empresa='$cnpj_padrao';
    UPDATE endereco_empresa SET bairro='$bairro_empresa' WHERE cnpj_empresa='$cnpj_padrao';
    UPDATE endereco_empresa SET cidade='$cidade_empresa' WHERE cnpj_empresa='$cnpj_padrao';
    UPDATE endereco_empresa SET estado='$estado_empresa' WHERE cnpj_empresa='$cnpj_padrao';");
    mysqli_close($conec);

    setcookie('endereco', '', time() - 3600, '/');

    verificarOperacao($result_endereco_empresa, $local); // verifica se a operação foi feita com sucesso
}

if(isset($_COOKIE['empresa'])) { // alteração de dados empresa
    $duplicado = false;

    if($_POST['nome_empresa'] != $_SESSION['nome_empresa_padrao']){ // verificação se o nome já é utilizado
        $nome_empresa = $_POST['nome_empresa'];
        $conec = conec();
        $select_nome_empresa=mysqli_query($conec, "SELECT * FROM empresa WHERE nome ='$nome_empresa'");
        mysqli_close($conec);
        
        if($select_nome_empresa === $nome_empresa){ //sinalização de duplicação
            $local=$local.'?'.md5(('nome_empresa_duplicado=true'));
            $duplicado=true;
        }
    }

    if($_POST['nome_fantasia'] != $_SESSION['nome_fantasia_padrao']){ // verificação se o nome já é utilizado
        $nome_fantasia = $_POST['nome_fantasia'];
        $conec = conec();
        $select_nome_fantasia=mysqli_query($conec, "SELECT * FROM empresa WHERE nome_fantasia ='$nome_fantasia'");
        mysqli_close($conec);

        if($select_nome_fantasia === $nome_fantasia){ //sinalização de duplicação
            $local=$local.'?'.md5(('nome_fantasia_duplicado=true'));
            $duplicado=true;
        }
    }

    if($duplicado){ //retorno da verificação
        header('Location: '.$local);
        exit;
    }

    // se não, atualiza os nomes digitados
    
    if(isset($nome_empresa)){
        $conec = conec();
        $result_nome_empresa=mysqli_query($conec,"UPDATE empresa SET nome='$nome_empresa' WHERE email_usuario='$email'");
        mysqli_close($conec);
        verificarOperacao($result_nome_empresa, $local);
    }
    
    if(isset($nome_fantasia)){
        $conec = conec();
        $result_nome_fantasia=mysqli_query($conec,"UPDATE empresa SET nome_fantasia='$nome_fantasia' WHERE email_usuario='$email'");
        mysqli_close($conec);
        verificarOperacao($result_nome_fantasia, $local);
    }
    
    setcookie('empresa', '', time() - 3600, '/');
    header('Location:'.$local.'?'.md5('sucesso=true'));
    exit;
}

?>