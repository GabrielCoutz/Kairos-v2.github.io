<!DOCTYPE html>
<html lang="pt-BR">

<head>
    <meta name="theme-color" content="#4466ff">
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="description" content="Kairos | Recuperação de conta">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="shortcut icon" href="../assets/img/favicon.ico" type="image/x-icon">
    <link rel="stylesheet preload" as="style" href="../assets/css/style.min.css">

    <title>Recuperação de conta</title>
</head>

<body class="body-form recuperacao">

    <header class="header container">
        <div class="header-logo">
            <a href="../index" aria-label="Voltar à página inicial"><img src="../assets/img/logo/Logo.svg" aria-hidden="true" alt="" width="740" height="210"></a>
        </div>
    </header>

    <div class="fundo-form container">
        <div class="form-holder">
            <form action="assets/php/validarDados" method="POST" class="formulario recuperacao" onsubmit="return false">
                <a href="../index" id="link-home"><i class="gg-home"></i></a>
                <h1 class="titulo">Recuperação de conta</h1>
                <p>Não tem problema se esqueceu sua senha, para recuperá-la basta inserir os dados cadastrados da conta
                    abaixo.</p>
                <div class="form-caixa">
                    <label aria-hidden="true" for="nome">Nome completo</label>
                    <i class="gg-user" aria-hidden="true"></i>
                    <input type="text" required name="nome" id="nome" placeholder="Nome Completo"
                        onkeyup="apenasLetras(this)" aria-controls="nomeAlert">
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
                <button type="submit" id='butao' class="btn secundario" onclick="validar()">Verificar</button>
            </form>
        </div>
    </div>
</body>
<script src="https://cdnjs.cloudflare.com/ajax/libs/crypto-js/4.1.1/crypto-js.min.js"
    integrity="sha512-E8QSvWZ0eCLGk4km3hxSsNmGWbLtSCSUcewDQPQWZF6pEU8GlT8a5fF32wOl1i8ftdMhssTrF/OhyGWwonTcXA=="
    crossorigin="anonymous" referrerpolicy="no-referrer"></script>

<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.6.1/jquery.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery.mask/1.14.15/jquery.mask.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/js-cookie@2/src/js.cookie.min.js"></script>

<script src="../assets/js/scriptPopUp.js"></script>
<script src="../assets/js/globals.js"></script>
<script src="../assets/js/formulario.js"></script>
<script src="../assets/js/popup.js"></script>

<script src="assets/js/script.js"></script>

</html>