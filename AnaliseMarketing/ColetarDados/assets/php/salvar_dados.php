<meta charset="UTF-8">
<?php
    session_start();
    require ("../../../../assets/php/globals.php");

    // SWOT
    $forcas = '';
    $fraquezas = '';
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

        if (is_int(strpos($chave, 'SWOT'))){ // análise SWOT
        switch (true) {
            case is_int(strpos($chave,'forças')):
                $forcas .= $valor.', ';
                break;
            case is_int(strpos($chave, 'fraquezas')):
                $fraquezas .= $valor.', ';
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

    $query="INSERT INTO analise_swot(email_usuario, forcas, fraquezas, oportunidades, ameacas) VALUES(?, ?, ?, ?, ?)";
    $exec=$conec->prepare($query);
    $exec->bind_param("sssss", $email, $forcas, $fraquezas, $oportunidades, $ameacas);
    $exec->execute();
    $result_swot=$exec->get_result();
    verificarOperacao($result_swot, '../../../resultado');

    $query="INSERT INTO analise_4ps(email_usuario, produto, preco, praca, promocao, incentivo) VALUES(?, ?, ?, ?, ?, ?)";
    $exec=$conec->prepare($query);
    $exec->bind_param("ssssss", $email, $produto, $preco, $praca, $promocao, $incentivo);
    $exec->execute();
    $result_4ps=$exec->get_result();
    verificarOperacao($result_4ps, '../../../resultado');

    // ver erro --> or die(mysqli_error($conec) ou printf("Errormessage: %s\n", $conec->error);;

    if($result_4ps && $result_swot){
        header('Location: ../../../resultado?'.hash("sha512", 'sucesso=true'));
        exit;
    }
    header('Location: ../../../resultado?'.hash("sha512", 'sucesso=false'));
    exit;
?>