<!DOCTYPE html>
<html lang="pt-BR">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="description" content="Kairos | Login">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="shortcut icon" href="../assets/img/favicon.ico" type="image/x-icon">
    <link rel="stylesheet" href="../assets/css/style.min.css">
    <title>Login</title>
    

    <?php
        error_reporting(E_ERROR | E_PARSE);
        session_start();
        session_unset();
        session_destroy();
        session_write_close();
        setcookie(session_name(), '', 0, '/', NULL, true, true);
        session_regenerate_id(true);
    ?>
</head>

<body class="body-form">

    <header class="header container" aria-label="Voltar para a página inicial">
        <div class="header-logo">
            <a href="../index"><img src="../assets/img/logo/airos.png" alt="Kairos Logo"></a>
        </div>
    </header>

    <div class="fundo-form container" aria-label="Formulário de login">
        <div class="form-holder">
            <form action="assets/php/logar" method="POST" class="formulario login" onsubmit="return false"
                contenteditable="false">
                <a href="../index" id="link-home"><i class="gg-home"></i></a>
                <h1 class="titulo" id="login-titulo">Login</h1>
                <div class="form-caixa">
                    <label aria-hidden="true" for="email" aria-label="Email">Email</label>
                    <i class="gg-mail" aria-hidden="true"></i>
                    <input type="email" required name="email" id="email" placeholder="Email" aria-controls="emailAlert">
                    <span class="underline" aria-hidden="true"></span>
                    <div id="emailAlert" role="alert"></div>
                </div>
                <div class="form-caixa senha-2">
                    <label aria-hidden="true" for="senha" aria-label="Senha">Senha</label>
                    <i class="gg-lock" aria-hidden="true"></i>
                    <input type="password" required name="senha" id="senha" placeholder="Senha"
                        aria-controls="senhaAlert">
                    <button class="gg-eye" type="button" aria-controls="senha" title="Mostrar senha"
                        aria-pressed="false"></button>
                    <span class="underline" aria-hidden="true"></span>
                    <div id="senhaAlert" role="alert"></div>
                </div>
                <button type="submit" class="btn secundario" onclick="validar()" id="butao">Entrar</button>
                <a href="../CadastroUsuario/cadastro_usuario" class="btn primario">Registrar-se</a>
                <a href="../Recuperacao/recuperacao" class="btn terciario">Esqueci a senha</a>
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

<script src="../assets/js/globals.js"></script>
<script src="../assets/js/formulario.js"></script>
<script src="../assets/js/popup.js"></script>

<script src="assets/js/script.js"></script>

</html>