<!DOCTYPE html>
<html lang="pt-BR">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="description" content="Kairos | Cadastro">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="shortcut icon" href="../assets/img/favicon.ico" type="image/x-icon">
    <link rel="stylesheet" href="../assets/css/style.min.css">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link
        href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;500;700&family=Poppins:wght@400;500;700&display=swap"
        rel="stylesheet">
    
    <title>Cadastro</title>
    <?php
        session_start();
    ?>
</head>

<body class="body-form cadastro">

    <header class="header container">
        <div class="header-logo">
            <a href="../index"><img src="../assets/img/logo/airos.png" alt="Kairos Logo"></a>
        </div>
    </header>

    <div class="fundo-form container">
        <div class="form-holder">
            <form action="assets/php/cadastrar" method="POST" class="formulario" onsubmit="return false">
            <a href="../index" id="link-home"><i class="gg-home"></i></a>
                <h1 class="titulo">Cadastro</h1>
                <div class="form-caixa">
                    <label aria-hidden="true" for="nome">Nome completo</label>
                    <i class="gg-user" aria-hidden="true"></i>
                    <input type="text" required name="nome" id="nome" placeholder="Nome Completo" onkeyup="apenasLetras(this)"
                        aria-controls="nomeAlert">
                    <span class="underline" aria-hidden="true"></span>
                    <div id="nomeAlert" role="alert"></div>
                </div>
                <div class="form-caixa">
                    <label aria-hidden="true" for="email">Email</label>
                    <i class="gg-mail" aria-hidden="true"></i>
                    <input type="email" required name="email" id="email" placeholder="Email" aria-controls="emailAlert">
                    <span class="underline" aria-hidden="true"></span>
                    <div id="emailAlert" role="alert"></div>
                </div>
                <div class="form-caixa senha-1">
                    <label aria-hidden="true" for="senha">Senha</label>
                    <i class="gg-lock" aria-hidden="true"></i>
                    <input type="password" required name="senha" id="senha" placeholder="Senha" aria-controls="senhaAlert">
                    <button type="button" id="gerar-senha" title="Gerar senha forte aleatória" class="btn terciario" aria-label="Gerar senha forte aleatória">Gerar</button>
                    <button class="gg-eye" type="button" aria-controls="senha" title="Mostrar senha" aria-pressed="false"></button>
                    <span class="underline" aria-hidden="true"></span>
                    <div class="progress-bar" aria-hidden="true">
                        <div></div>
                    </div>
                    <div id="senhaAlert" role="alert"></div>
                </div>
                <div class="form-caixa senha-2">
                    <label aria-hidden="true" for="confirm_senha">Confirmar senha</label>
                    <i class="gg-lock" aria-hidden="true"></i>
                    <input type="password" required name="confirm_senha" id="confirm_senha" placeholder="Confirmar senha">
                    <button class="gg-eye" type="button" aria-controls="confirm_senha" title="Mostrar senha" aria-pressed="false"></button>
                    <span class="underline" aria-hidden="true"></span>
                </div>
                <button type="button" id="butao" class="btn primario" onclick="validar()">Registrar</button>
                <a href="../Login/login" class="btn terciario">Fazer login</a>
            </form>
        </div>


    </div>
</body>
<script src="https://cdnjs.cloudflare.com/ajax/libs/crypto-js/4.1.1/crypto-js.min.js" integrity="sha512-E8QSvWZ0eCLGk4km3hxSsNmGWbLtSCSUcewDQPQWZF6pEU8GlT8a5fF32wOl1i8ftdMhssTrF/OhyGWwonTcXA==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>

<script src="https://code.jquery.com/jquery-3.2.1.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery.mask/1.14.15/jquery.mask.min.js"></script>

<script src="https://cdn.lordicon.com/xdjxvujz.js"></script>
<script src="../assets/js/globals.js"></script>
<script src="../assets/js/formulario.js"></script>
<script src="../assets/js/popup.js"></script>

<script src="assets/js/lslstrength.js"></script>
<script src="assets/js/script.js"></script>

</html>