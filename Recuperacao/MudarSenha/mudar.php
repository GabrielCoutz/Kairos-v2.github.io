<!DOCTYPE html>
<html lang="pt-BR">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="description" content="Kairos | Recuperação de conta - final">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="shortcut icon" href="../../assets/img/favicon.ico" type="image/x-icon">
    <link rel="stylesheet" href="../../assets/css/style.min.css">

    <title>Recuperação de conta</title>
    <?php
        session_start();
        error_reporting(E_ERROR | E_PARSE);
        if (!isset($_SESSION['email']) && !strpos($protocol . $_SERVER['HTTP_HOST'] . $_SERVER['REQUEST_URI'],hash("sha512", 'erro=true'))){
            header("Refresh:0; url=mudar".'?'.hash("sha512", 'erro=true'));
            exit;
        }
    ?>
</head>

<body class="body-form recuperar-senha">

    <header class="header container">
        <div class="header-logo">
            <a href="../../index"><img src="../../assets/img/logo/Logo.svg" alt="Kairos Logo"></a>
        </div>
    </header>

    <div class="fundo-form container">
        <div class="form-holder">
            <form action="assets/php/mudar_senha" method="POST" class="formulario recuperacao" onsubmit="return false">
                <a href="../../index" id="link-home"><i class="gg-home"></i></a>
                <h1 class="titulo">Etapa final</h1>
                <div class="form-caixa senha-2">
                    <label aria-hidden="true" for="senha_nova">Nova senha</label>
                    <i class="gg-lock" aria-hidden="true"></i>
                    <input type="password" required name="senha_nova" id="senha_nova" placeholder="Nova senha"
                        aria-controls="senha_novaAlert">
                    <button type="button" title="Esconder senha" class="gg-eye" aria-controls="senha_nova"></button>
                    <span class="underline" aria-hidden="true"></span>
                    <div id="senha_novaAlert" role="alert"></div>
                </div>
                <div class="form-caixa senha-2">
                    <label aria-hidden="true" for="senha_nova_dup">Digite novamente</label>
                    <i class="gg-lock" aria-hidden="true"></i>
                    <input type="password" required name="senha_nova_dup" id="senha_nova_dup"
                        placeholder="Digite novamente" aria-controls="senha_nova_dupAlert">
                    <button type="button" title="Esconder senha" class="gg-eye" aria-controls="senha_nova_dup"></button>
                    <span class="underline" aria-hidden="true"></span>
                    <div id="senha_nova_dupAlert" role="alert"></div>
                </div>
                <button type="submit" class="btn primario" onclick="validar()">Atualizar senha</button>
            </form>
        </div>


    </div>
</body>
<script src="https://cdnjs.cloudflare.com/ajax/libs/crypto-js/4.1.1/crypto-js.min.js"
    integrity="sha512-E8QSvWZ0eCLGk4km3hxSsNmGWbLtSCSUcewDQPQWZF6pEU8GlT8a5fF32wOl1i8ftdMhssTrF/OhyGWwonTcXA=="
    crossorigin="anonymous" referrerpolicy="no-referrer"></script>

<script src="https://code.jquery.com/jquery-3.2.1.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery.mask/1.14.15/jquery.mask.min.js"></script>
<script src="https://cdn.lordicon.com/lusqsztk.js"></script>
<script src="https://cdn.jsdelivr.net/npm/js-cookie@2/src/js.cookie.min.js"></script>

<script src="../../assets/js/globals.js"></script>
<script src="../../assets/js/formulario.js"></script>
<script src="../../assets/js/popup.js"></script>

<script src="assets/js/script.js"></script>

</html>