<!DOCTYPE html>
<html lang="pt-BR">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="description" content="Kairos | Recuperação de conta">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="shortcut icon" href="../../assets/img/favicon.ico" type="image/x-icon">
    <link rel="stylesheet" href="../../assets/css/style.css">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link
        href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;500;700&family=Poppins:wght@400;500;700&display=swap"
        rel="stylesheet">
    <link href="https://cdn.lineicons.com/3.0/lineicons.css" rel="stylesheet">
    <title>Recuperação de conta</title>
</head>

<body class="body-form">

    <header class="header container" id="header-cadastroUsuario">
        <div class="header-logo">
            <a href="../../index"><img src="../../assets/img/logo/airos.png" alt="Kairos Logo"></a>
        </div>
    </header>

    <div class="fundo-form container">
        <div class="form-holder">
            <form action="#" method="POST" class="formulario recuperacao">
                <h1 class="titulo" onsubmit="return false">Etapa final</h1>
                <div class="form-caixa">
                    <label for="senha_nova">Nova senha</label>
                    <i class="gg-lock"></i>
                    <input type="password" name="senha_nova" id="senha_nova" placeholder="Nova senha">
                    <i class="gg-eye" aria-controls="senha_nova"></i>
                    <span class="underline"></span>
                    <div id="senha_novaAlert"></div>
                </div>
                <div class="form-caixa">
                    <label for="senha_nova_dup">Digite novamente</label>
                    <i class="gg-lock"></i>
                    <input type="password" name="senha_nova_dup" id="senha_nova_dup" placeholder="Digite novamente">
                    <i class="gg-eye" aria-controls="senha_nova_dup"></i>
                    <span class="underline"></span>
                    <div id="senha_nova_dupAlert"></div>
                </div>
                <button type="submit" class="btn primario" onclick="validar()">Atualizar senha</button>
            </form>
        </div>


    </div>
</body>
<script type="text/javascript" src='https://cdnjs.cloudflare.com/ajax/libs/blueimp-md5/2.12.0/js/md5.min.js'></script>
<script src="https://code.jquery.com/jquery-3.2.1.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery.mask/1.14.15/jquery.mask.min.js"></script>
<script src="../../assets/js/formulario.js"></script>
<!-- <script src="assets/js/script.js"></script> -->

</html>