<!DOCTYPE html>
<html lang="pt-BR">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="Kairos | Resultados">
    <link rel="shortcut icon" href="../assets/img/favicon.ico" type="image/x-icon">
    <link rel="stylesheet" href="../assets/css/style.min.css">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link
        href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;500;700&family=Poppins:wght@400;500;700&display=swap"
        rel="stylesheet">
    <title>Seus resultados</title>
    <?php
        error_reporting(E_ERROR | E_PARSE);
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
        $email=$_SESSION['email'];
        $select_swot=mysqli_query($conec, "SELECT * FROM analise_swot WHERE email_usuario = '$email'")->fetch_assoc();
        $select_4ps=mysqli_query($conec, "SELECT * FROM analise_4ps WHERE email_usuario = '$email'")->fetch_assoc();

        switch (true) {
            case !isset($_SESSION['email']) && !strpos($protocol . $_SERVER['HTTP_HOST'] . $_SERVER['REQUEST_URI'],hash("sha512", 'erro=true')):
                header("Refresh:0; url=resultado".'?'.hash("sha512", 'erro=true'));
                exit;
                break;
                
                case !$select_swot && !$select_4ps && !strpos($protocol . $_SERVER['HTTP_HOST'] . $_SERVER['REQUEST_URI'],hash("sha512", 'analise=false')) && !strpos($protocol . $_SERVER['HTTP_HOST'] . $_SERVER['REQUEST_URI'],hash("sha512", 'sucesso=false')) && !strpos($protocol . $_SERVER['HTTP_HOST'] . $_SERVER['REQUEST_URI'],hash("sha512", 'erro=true')):
                    header("Refresh:0; url=resultado".'?'.hash("sha512", 'analise=false'));
                exit;
                break;
        }
    ?>
</head>

<body class="body-perfil resultado">
    <div class="fundo-barra-lateral">
        <div class="barra-lateral">
            <nav aria-label="Navegação Lateral">
                <ul class="nav-lateral">
                    <li><svg width="24" height="24" viewBox="0 0 24 24" fill="#ffffff"
                            xmlns="http://www.w3.org/2000/svg">
                            <path d="M17 15H19V17H17V15Z" fill="#ffffff" />
                            <path d="M19 11H17V13H19V11Z" fill="#ffffff" />
                            <path fill-rule="evenodd" clip-rule="evenodd"
                                d="M13 7H23V21H1V3H13V7ZM8 5H11V7H8V5ZM11 19V17H8V19H11ZM11 15V13H8V15H11ZM11 11V9H8V11H11ZM21 19V9H13V11H15V13H13V15H15V17H13V19H21ZM3 19V17H6V19H3ZM3 15H6V13H3V15ZM6 11V9H3V11H6ZM3 7H6V5H3V7Z"
                                fill="#ffffff" />
                        </svg><a href="../Perfil/PerfilEmpresa/empresa">Perfil da Empresa</a></li>
                    <li class='nav-lateral-ativo'><svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                            xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M12.552 8C11.9997 8 11.552 8.44772 11.552 9C11.552 9.55228 11.9997 10 12.552 10H16.552C17.1043 10 17.552 9.55228 17.552 9C17.552 8.44772 17.1043 8 16.552 8H12.552Z"
                                fill="#ffffff" fill-opacity="0.5" />
                            <path
                                d="M12.552 17C11.9997 17 11.552 17.4477 11.552 18C11.552 18.5523 11.9997 19 12.552 19H16.552C17.1043 19 17.552 18.5523 17.552 18C17.552 17.4477 17.1043 17 16.552 17H12.552Z"
                                fill="#ffffff" fill-opacity="0.5" />
                            <path
                                d="M12.552 5C11.9997 5 11.552 5.44772 11.552 6C11.552 6.55228 11.9997 7 12.552 7H20.552C21.1043 7 21.552 6.55228 21.552 6C21.552 5.44772 21.1043 5 20.552 5H12.552Z"
                                fill="#ffffff" fill-opacity="0.8" />
                            <path
                                d="M12.552 14C11.9997 14 11.552 14.4477 11.552 15C11.552 15.5523 11.9997 16 12.552 16H20.552C21.1043 16 21.552 15.5523 21.552 15C21.552 14.4477 21.1043 14 20.552 14H12.552Z"
                                fill="#ffffff" fill-opacity="0.8" />
                            <path
                                d="M3.448 4.00208C2.89571 4.00208 2.448 4.44979 2.448 5.00208V10.0021C2.448 10.5544 2.89571 11.0021 3.448 11.0021H8.448C9.00028 11.0021 9.448 10.5544 9.448 10.0021V5.00208C9.448 4.44979 9.00028 4.00208 8.448 4.00208H3.448Z"
                                fill="#ffffff" />
                            <path
                                d="M3.448 12.9979C2.89571 12.9979 2.448 13.4456 2.448 13.9979V18.9979C2.448 19.5502 2.89571 19.9979 3.448 19.9979H8.448C9.00028 19.9979 9.448 19.5502 9.448 18.9979V13.9979C9.448 13.4456 9.00028 12.9979 8.448 12.9979H3.448Z"
                                fill="#ffffff" />
                        </svg><a href="resultado">Análise de Marketing</a></li>
                    <li><i aria-hidden="true" class="gg-credit-card"></i>
                        <a href="../Assinaturas/assinaturas">Minha assinatura</a>
                    </li>
                    <li><i aria-hidden="true" class="gg-user"></i>
                        <a href="../Perfil/usuario">Perfil</a>
                    </li>
                    <a href="../index" class="btn secundario menu-btn">Sair</a>
                </ul>
                <div class="hamburguer">
                    <span class="bar"></span>
                    <span class="bar"></span>
                    <span class="bar"></span>
                </div>
            </nav>
        </div>
    </div>
    <div class="principal">
        <header>
            <a href="../index" class="btn secundario">Sair</a>
        </header>
        <div class="perfil">
            <div class="bloco-metodologia">
                <div class="SWOT">
                    <div class="swot-caixa">
                        <h1 class="titulo-metodo">Forças</h1>
                        <span>
                            <?= $select_swot['forcas']; ?>
                        </span>
                    </div>
                    <div class="swot-caixa">
                        <h1 class="titulo-metodo">Fraquezas</h1>
                        <span>
                            <?= $select_swot['fraquezas']; ?>
                        </span>
                    </div>
                    <div class="swot-caixa">
                        <h1 class="titulo-metodo">Oportunidades</h1>
                        <span>
                            <?= $select_swot['oportunidades']; ?>
                        </span>
                    </div>
                    <div class="swot-caixa">
                        <h1 class="titulo-metodo">Ameaças</h1>
                        <span>
                            <?= $select_swot['ameacas']; ?>
                        </span>
                    </div>
                </div>
                <div class="orientacoes-swot">
                    <h1>Agora sim podemos começar!</h1>
                    <span>
                        <p>Utilize estes resultados a fim de basear estratégias benéficas para a administração em sua
                            empresa.</p>
                        <p>Imaginamos que você está pensando "Como faço isso?", certo?</p>
                        <p>Sem stress! Precisa fazer as relações de cada item da matriz. Separamos algumas perguntas
                            para ajudá-lo nessa:</p>
                    </span>
                    <ul>
                        <li>
                            <h1>Forças + Oportunidades</h1>Quais pontos fortes podem ser potencializados para maximizar
                            as oportunidades?
                        </li>
                        <li>
                            <h1>Forças + Ameaças</h1>Quais pontos fortes podem ser estudados para minimizar o impacto
                            das ameaças?
                        </li>
                        <li>
                            <h1>Fraquezas + Oportunidades</h1>Quais pontos fracos podem ser corrigidos para aproveitar
                            as oportunidades?
                        </li>
                        <li>
                            <h1>Fraquezas + Ameaças</h1>Quais pontos fracos podem ser resolvidos para minimizar o efeito
                            das ameaças?
                        </li>
                    </ul>
                </div>
            </div>
            <div class="bloco-metodologia">
                <div class="compostoMK">
                    <div class="composto-caixa">
                        <h1 class="titulo-metodo">Produto</h1>
                        <span>
                            <?= $select_4ps['produto']; ?>
                        </span>
                    </div>
                    <div class="composto-caixa">
                        <h1 class="titulo-metodo">Preço</h1>
                        <span>
                            <?= $select_4ps['preco']; ?>
                        </span>
                    </div>
                    <div class="composto-caixa">
                        <h1 class="titulo-metodo">Praça</h1>
                        <span>
                            <?= $select_4ps['praca']; ?>
                        </span>
                    </div>
                    <div class="composto-caixa">
                        <h1 class="titulo-metodo">Promoção</h1>
                        <span>
                            <?= $select_4ps['promocao']; ?>
                        </span>
                    </div>
                </div>
                <div class="orientacoes-composto">
                    <h1>Sua estratégia pode ser mais que competitiva, pode ser imbatível.</h1>
                    <span>
                        <p>É o alinhamento desses itens que irá compor toda a estratégia de marketing da sua empresa.
                        </p>
                        <p>Pense neles como peças de um quebra-cabeça que irão se encaixar para formar o todo.</p>
                        <p>Portanto, você comunicará aos seus consumidores o posicionamento da sua marca e irá promover o desejo de compra no seu público-alvo.</p>
                        <p>
                            Com todos estes itens, foque em como mostrar à seus clientes o motivo, de maneira clara e
                            objetiva, de:<br>
                        </p>
                    </span>
                    <ul>
                        <li>
                            <h1>Produto</h1>Todos benefícios que podem obter.
                        </li>
                        <li>
                            <h1>Preço</h1>Pagar pelo valor agregado no que você oferece.
                        </li>
                    </ul>
                    <h1>E vá além.</h1>
                    <span>
                        <p>Explore o seu mercado:</p>
                    </span>
                    <ul>
                        <li>
                            <h1>Praça</h1> Investique os melhores canais de distribuição e logística.
                        </li>
                        <li>
                            <h1>Promoção</h1> Valor da marca e do ofertado em relação ao mercado.
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</body>
<script src="https://cdnjs.cloudflare.com/ajax/libs/crypto-js/4.1.1/crypto-js.min.js" integrity="sha512-E8QSvWZ0eCLGk4km3hxSsNmGWbLtSCSUcewDQPQWZF6pEU8GlT8a5fF32wOl1i8ftdMhssTrF/OhyGWwonTcXA==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>

<script src="https://code.jquery.com/jquery-3.2.1.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery.mask/1.14.15/jquery.mask.min.js"></script>
<script src="https://cdn.lordicon.com/lusqsztk.js"></script>
<script src="https://cdn.jsdelivr.net/npm/js-cookie@2/src/js.cookie.min.js"></script>

<script src="../assets/js/globals.js"></script>
<script src="../assets/js/formulario.js"></script>
<script src="../assets/js/popup.js"></script>

<script src="assets/js/script.js"></script>

</html>