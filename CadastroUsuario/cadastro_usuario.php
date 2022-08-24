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
    <link href="https://cdn.lineicons.com/3.0/lineicons.css" rel="stylesheet">
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
                    <label for="nome">Nome completo</label>
                    <i class="gg-user"></i>
                    <input type="text" name="nome" id="nome" placeholder="Nome Completo" onkeyup="apenasLetras(this)"
                        aria-controls="nomeAlert">
                    <span class="underline"></span>
                    <div id="nomeAlert"></div>
                </div>
                <div class="form-caixa">
                    <label for="email">Email</label>
                    <i class="gg-mail"></i>
                    <input type="email" name="email" id="email" placeholder="Email" aria-controls="emailAlert">
                    <span class="underline"></span>
                    <div id="emailAlert"></div>
                </div>
                <div class="form-caixa senha-1">
                    <label for="senha">Senha</label>
                    <i class="gg-lock"></i>
                    <input type="password" name="senha" id="senha" placeholder="Senha" aria-controls="senhaAlert">
                    <i class="gg-eye" aria-controls="senha"></i>
                    <div id="gerar-senha">Gerar</div>
                    <span class="underline"></span>
                    <div class="progress-bar">
                        <div></div>
                    </div>
                    <div id="senhaAlert"></div>
                </div>
                <div class="form-caixa senha-2">
                    <label for="confirm_senha">Confirmar senha</label>
                    <i class="gg-lock"></i>
                    <input type="password" name="confirm_senha" id="confirm_senha" placeholder="Confirmar senha">
                    <i class="gg-eye" aria-controls="confirm_senha"></i>
                    <span class="underline"></span>
                </div>
                <button type="button" id="butao" class="btn primario" onclick="validar()">Registrar</button>
                <a href="../Login/login" class="btn terciario">Fazer login</a>
            </form>
        </div>


    </div>
</body>
<script type="text/javascript" src='https://cdnjs.cloudflare.com/ajax/libs/blueimp-md5/2.12.0/js/md5.min.js'></script>

<script src="https://code.jquery.com/jquery-3.2.1.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery.mask/1.14.15/jquery.mask.min.js"></script>

<script src="https://cdn.lordicon.com/xdjxvujz.js"></script>
<script src="../assets/js/globals.js"></script>
<script src="../assets/js/formulario.js"></script>
<script src="../assets/js/popup.js"></script>

<script src="assets/js/lslstrength.js"></script>
<script src="assets/js/script.js"></script>

</html>