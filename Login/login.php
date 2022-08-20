<!DOCTYPE html>
<html lang="pt-BR">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="description" content="Kairos | Login">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="shortcut icon" href="../assets/img/favicon.ico" type="image/x-icon">
    <link rel="stylesheet" href="../assets/css/style.css">
    <title>Login</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link
        href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;500;700&family=Poppins:wght@400;500;700&display=swap"
        rel="stylesheet">
    <link href="https://cdn.lineicons.com/3.0/lineicons.css" rel="stylesheet">
    <?php
        session_start();
    ?>
</head>

<body class="body-form">

    <header class="header container" id="header-cadastroUsuario">
        <div class="header-logo">
            <a href="../index"><img src="../assets/img/logo/airos.png" alt="Kairos Logo"></a>
        </div>
    </header>

    <div class="fundo-form container">
        <div class="form-holder">
            <form action="assets/php/logar" method="POST" class="formulario login" onsubmit="return false">
                <h1 class="titulo">Login</h1>
                <div class="form-caixa">
                    <label for="email">Email</label>
                    <i class="gg-mail"></i>
                    <input type="email" name="email" id="email" placeholder="Email" aria-controls="emailAlert">
                    <span class="underline"></span>
                    <div id="emailAlert"></div>
                </div>
                <div class="form-caixa">
                    <label for="senha">Senha</label>
                    <i class="gg-lock"></i>
                    <input type="password" name="senha" id="senha" placeholder="Senha" aria-controls="senhaAlert">
                    <i class="gg-eye" aria-controls="senha"></i>
                    <span class="underline"></span>
                    <div id="senhaAlert"></div>
                </div>
                <button type="button" class="btn secundario" onclick="validar()" id="butao">Entrar</button>
                <a href="../CadastroUsuario/cadastro_usuario.php" class="btn primario">Registrar-se</a>
                <a href="../Recuperacao/recuperacao.php" class="btn terciario">Esqueci a senha</a>
            </form>
        </div>


    </div>
</body>
<script type="text/javascript" src='https://cdnjs.cloudflare.com/ajax/libs/blueimp-md5/2.12.0/js/md5.min.js'></script>

<script src="https://code.jquery.com/jquery-3.2.1.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery.mask/1.14.15/jquery.mask.min.js"></script>
<script src="https://cdn.lordicon.com/lusqsztk.js"></script>

<script src="../assets/js/globals.js"></script>
<script src="../assets/js/formulario.js"></script>
<script src="../assets/js/popup.js"></script>

<script src="assets/js/script.js"></script>

</html>