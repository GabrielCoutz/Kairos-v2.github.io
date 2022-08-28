<!DOCTYPE html>
<html lang="pt-BR">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="description"
        content="Kairos, Uma plataforma pensada e desenvolvida para Você. Mais que uma ferramenta, um meio para alcançar seu sucesso no mercado.">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="shortcut icon" href="assets/img/favicon.ico" type="image/x-icon">
    <link rel="stylesheet" href="assets/css/style.min.css">
    <title>Kairos</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link
        href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;500;700&family=Poppins:wght@400;500;700&display=swap"
        rel="stylesheet">
    <link href="https://cdn.lineicons.com/3.0/lineicons.css" rel="stylesheet">
    <title>Kairos</title>
    <?php
        error_reporting(E_ERROR | E_PARSE);
        session_start();
        session_unset();
        session_destroy();
        session_write_close();
        setcookie(session_name(),'',0,'/');
        session_regenerate_id(true);
    ?>
</head>

<body>
    <header class="fundo-header">
        <div class="header container">
            <div class="header-logo">
                <a href="index"><img src="assets/img/logo/airos.png" alt="Kairos Logo" width="740" height="210"></a>
            </div>
            <nav aria-label="Navegação Primária" class="navbar">
                <ul class="header-nav">
                    <li><a href="#sobre" class="page-scroll">Sobre</a></li>
                    <li><a href="#planos" class="page-scroll">Planos</a></li>
                    <li><a href="Login/login">Login</a></li>
                </ul>
                <div class="hamburguer">
                    <span class="bar"></span>
                    <span class="bar"></span>
                    <span class="bar"></span>
                </div>
            </nav>
        </div>

    </header>
    <main class="intro container">
        <div class="intro-info">
            <span>Bem vindo ao Kairos</span>
            <h1>Uma plataforma pensada e desenvolvida para Você</h1>
            <p class="texto">Mais que uma ferramenta, um meio para alcançar seu sucesso no mercado.</p>
            <a href="CadastroUsuario/cadastro_usuario" class="btn primario btn-hover">Começar Agora</a>
        </div>
        <div class="intro-img">
            <img src="assets/img/hero/equipe.png" alt="" aria-hidden="true">
        </div>
    </main>

    <section class="sobre container" id="sobre" aria-labelledby="sobre-titulo">
        <div class="sobre-img">
            <img src="assets/img/about/sobre.png" alt="" aria-hidden="true">
        </div>
        <div class="sobre-info">
            <h1 class="titulo" id="sobre-titulo">Conheça um pouco sobre nós</h1>
            <p class="texto">Utilizamos táticas de marketing para auxiliar na criação e desenvolimento de negócios,
                apoiando startups,
                micro e pequenas empresas a entenderem seu público alvo e personas, bem como posicionar serviços e
                produtos, que não só atendam mas superem as expectativas de seus clientes.</p>
            <ul class="sobre-lista">
                <li>
                    <button aria-controls="pergunta1" aria-expanded="false">Quais serviços oferecemos?</button>
                    <p id="pergunta1" class="texto">Ofertamos serviços análise de mercado e entendimento amplo sobre a
                        àrea de atuação
                        da empresa contratada, por meio de estratégias e conceitos do Marketing.</p>
                </li>
                <li>
                    <button aria-controls="pergunta2" aria-expanded="false">Preciso de algo para iniciar um
                        projeto?</button>
                    <p id="pergunta2" class="texto">Apenas uma ideia ou noção de o que deseja, o resto pode deixar com a
                        gente.</p>
                </li>
                <li>
                    <button aria-controls="pergunta3" aria-expanded="false">Qual nossa política de trabalho?</button>
                    <p id="pergunta3" class="texto">Com nossas análises de Marketing e tratamento de dados, nos
                        certificamos que cada
                        projeto seja único, pontual, consistente e principalmente, personalizado para cada cliente.</p>
                </li>
            </ul>
        </div>
    </section>

    <section class="metodos container" aria-labelledby="metodos-titulo">
        <h1 class="titulo" id="metodos-titulo">Nossos Métodos</h1>
        <p class="texto">Assim como cada pessoa, nossos projetos são únicos, especiais e sempre desenvolvidos com muito
            carinho e
            atenção.</p>
        <div class="metodos-cards">
            <div class="metodos-item">
                <div class="icone swot" aria-hidden="true">
                    <i class="lni lni-grid-alt"></i>
                </div>
                <span class="titulo">Análise SWOT/FOFA</span>
                <p class="texto">Pesquisas sobre Strengths/Forças, Weaknesses/Fraquezas, Opportunities/Oportunidades e
                    Threats/Ameaças.
                </p>
            </div>
            <div class="metodos-item">
                <div class="icone composto" aria-hidden="true">
                    <i class="lni lni-target-revenue"></i>
                </div>
                <span class="titulo">Composto de Marketing</span>
                <p class="texto">Explorar os 4P's do marketing, Produto, Preço, Praça e Promoção
                </p>
            </div>
            <div class="metodos-item">
                <div class="icone mkd" aria-hidden="true">
                    <i class="lni lni-graph"></i>
                </div>
                <span class="titulo">Marketing Digital</span>
                <p class="texto">Aplicação e Validação das informações obtidas.</p>
            </div>
        </div>
        <a href="CadastroUsuario/cadastro_usuario" class="btn primario">Porque não começar hoje?</a>
    </section>

    <section class="planos container" id="planos" aria-labelledby="plano-sec-titulo">
        <h1 class="titulo" id="plano-sec-titulo">Planos de Serviço</h1>
        <p class="texto">Seu negócio, suas regras</p>
        <div class="planos-cards">
            <div class="planos-item">
                <span class="planos-titulo titulo">Básico</span>
                <span class="planos-preco texto">R$ 19,00</span>
                <ul class="planos-beneficios" aria-label="Benefícios do plano">
                    <li>Análise de Marketing</li>
                    <li>Atendimento seg á sex</li>
                    <li>Suporte 08:00 às 18:00</li>
                    <li>1 Visita presencial p/mês</li>
                </ul>
                <a href="CadastroUsuario/cadastro_usuario" class="btn secundario btn-plano">Escolher plano</a>
            </div>
            <div class="planos-item">
                <span class="planos-titulo titulo">Médio</span>
                <span class="planos-preco texto">R$ 35,00</span>
                <ul class="planos-beneficios" aria-label="Benefícios do plano">
                    <li>Análise de Marketing</li>
                    <li>Atendimento seg á sex</li>
                    <li>Suporte 24h</li>
                    <li>3 Visita presencial p/mês</li>
                    <li>Consultoria de Marketing</li>
                </ul>
                <a href="CadastroUsuario/cadastro_usuario" class="btn primario btn-plano-ativo">Escolher plano</a>
            </div>
            <div class="planos-item">
                <span class="planos-titulo titulo">Premium</span>
                <span class="planos-preco texto">R$ 45,00</span>
                <ul class="planos-beneficios" aria-label="Benefícios do plano">
                    <li>Análise de Marketing</li>
                    <li>Atendimento 24/7 premium</li>
                    <li>Suporte 24h premium</li>
                    <li>5 Visita presencial p/mês</li>
                    <li>Consultoria de Marketing</li>
                    <li>Plano de Negócios</li>
                    <li>Análise de Resultados</li>
                </ul>
                <a href="CadastroUsuario/cadastro_usuario" class="btn secundario btn-plano">Escolher plano</a>
            </div>
        </div>
    </section>

    <section class="captacao container" aria-hidden="true">
        <h1 class="titulo">Já tem um projeto em mente?<br>Maravilha!<br>
            Vamos começar agora mesmo!</h1>
        <a href="CadastroUsuario/cadastro_usuario" class="btn primario">Por aqui</a>
    </section>

    <footer class="container">
        <div class="footer-itens">
            <span class="titulo">Links</span>
            <nav aria-label="Navegação Secundária">
                <ul class="links-lista">
                    <li class="texto"><a href="index">Início</a></li>
                    <li class="texto"><a href="#sobre">Sobre</a></li>
                    <li class="texto"><a href="#planos">Planos</a></li>
                    <li class="texto"><a href="Contato/contato">Contato</a></li>
                </ul>
            </nav>
        </div>
        <div class="footer-itens" aria-label="Metodologias que utilizamos em nossas análises">
            <span class="titulo">Metodologias</span>
            <ul class="links-lista">
                <li class="texto">Análise SWOT</li>
                <li class="texto">4P's do Marketing</li>
                <li class="texto">Marketing Digital</li>
            </ul>
        </div>
        <div class="footer-itens" aria-labelledby="contato-titulo">
            <span class="titulo" id="contato-titulo">Contato</span>
            <ul class="links-lista">
                <li class="texto">kairozprojeto@gmail.com</li>
            </ul>
        </div>
    </footer>
</body>
<script src="assets/js/script.js"></script>
<script src="assets/js/globals.js"></script>

</html>