<meta charset="UTF-8">
<?php
    session_start();
    error_reporting(E_ALL);

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

    // SWOT
    $fortes = '';
    $fracos = '';
    $oportunidades = '';
    $ameacas = '';

    // 4Ps
    $produto = '';
    $preco = '';
    $praca = '';
    $promocao = '';
    $incentivo = '';

    foreach ($_GET as $chave => $valor) { 
        if(is_int(strpos($valor, '%3c'))){
            $valor = str_replace('%3c',', ',$valor);
            $valor = str_replace('%3e',', ',$valor);
        }
        if(is_int(strpos($valor, '<br>'))){
            $valor = str_replace('<br>',', ',$valor);
        }

        // echo $chave.' = '.$valor.'<br>';

        if (is_int(strpos($chave, 'SWOT'))){ // análise SWOT
        switch (true) {
            case is_int(strpos($chave,'forças')):
                $fortes .= $valor.', ';
                break;
            case is_int(strpos($chave, 'fraquezas')):
                $fracos .= $valor.', ';
                break;
            case is_int(strpos($chave, 'oportunidades')):
                $oportunidades .= $valor.', ';
                break;
            case is_int(strpos($chave, 'competidores')) && is_int(strpos($valor, 'Sim')):
                $ameacas .= 'Competição em Crescimento'.', ';
                break;
            case is_int(strpos($chave, 'visão')) && is_int(strpos($valor, 'Sim')):
                $ameacas .= 'Visão Negativa'.', ';
                break;
            case is_int(strpos($chave, 'custos')) && is_int(strpos($valor, 'Sim')):
                $ameacas .= 'Altos custos de matéria prima'.', ';
                break;
            }
        } else if (is_int(strpos($chave, '4PS'))){ // metodologia 4P's

            switch (true) {
                case is_int(strpos($chave,'produto')):
                    $produto .= $valor.', ';
                    break;
                case is_int(strpos($chave,'4PSpreço1')) && is_int(strpos($valor, 'Alto Custo')):
                    $preco .= 'Alto Preço de Produção'.', ';
                    break;
                case is_int(strpos($chave,'4PSpreço2')) && is_int(strpos($valor, 'Alto Custo')):
                    $preco .= 'Alto Preço Final'.', ';
                    break;
                case is_int(strpos($chave, '4PSpreçosensivel')) && is_int(strpos($valor, 'Sim')):
                    $ameacas .= 'Clientes Sensíveis ao Preço'.', ';
                    break;
                case is_int(strpos($chave,'4PSpraça2')):
                    if(is_int(strpos($valor, 'Orientar o cliente sobre uma decisão'))){
                        $incentivo.= 'Orientar na compra'.', ';
                    }
                    if(is_int(strpos($valor, 'Fazer com que o cliente sinta a necessidade do produto'))){
                        $incentivo.= 'Sensação de necessidade'.', ';
                    }
                    if(is_int(strpos($valor, 'Fazer com que o cliente deseje o produto'))){
                        $incentivo.= 'Desejo de compra';
                    }
                    break;
                case is_int(strpos($chave,'praça')):
                    $praca .= $valor.', ';
                    break;
                case is_int(strpos($chave,'promoção')):
                    $promocao .=$valor.', ';
                    break;
            }
        }
    }

    $email = $_SESSION['email'];

    $result_swot=mysqli_query($conec, "INSERT INTO analise_swot(email_usuario, forcas, fraquezas, oportunidades, ameacas) VALUES('$email', '$fortes', '$fracos', '$oportunidades', '$ameacas')");

    $result_4ps=mysqli_query($conec, "INSERT INTO analise_4ps(email_usuario, produto, preco, praca, promocao, incentivo) VALUES('$email', '$produto', '$preco', '$praca', '$promocao', '$incentivo' )");

    // ver erro --> or die(mysqli_error($conec) ou printf("Errormessage: %s\n", $conec->error);;

    if($result_4ps && $result_swot){
        header('Location: ../../../resultado?'.md5('sucesso=true'));
        exit;
    }
    header('Location: ../../../resultado?'.md5('sucesso=false'));
    exit;
?>
<script type="text/javascript" src='https://cdnjs.cloudflare.com/ajax/libs/blueimp-md5/2.12.0/js/md5.min.js'></script>