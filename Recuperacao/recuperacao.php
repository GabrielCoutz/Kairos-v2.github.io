<!DOCTYPE html>
<html lang="pt-BR">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="description" content="Kairos | Recuperação de conta">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="shortcut icon" href="../assets/img/favicon.ico" type="image/x-icon">
    <link rel="stylesheet" href="../assets/css/style.css">
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
            <a href="../index.php"><img src="../assets/img/logo/airos.png" alt="Kairos Logo"></a>
        </div>
    </header>

    <div class="fundo-form container">
        <div class="form-holder">
            <form action="#" method="POST" class="formulario recuperacao">
                <h1 class="titulo" onsubmit="return false">Recuperação de conta</h1>
                <p>Não tem problema se esqueceu sua senha, para recuperá-la basta inserir os dados cadastrados da conta
                    abaixo.</p>
                <div class="form-caixa">
                    <label for="nome">Nome completo</label>
                    <i class="gg-user"></i>
                    <input type="text" name="nome" id="nome" placeholder="Nome Completo" onkeyup="apenasLetras(this)">
                    <span class="underline"></span>
                </div>
                <div class="form-caixa">
                    <label for="email">Email</label>
                    <i class="gg-mail"></i>
                    <input type="email" name="email" id="email" placeholder="Email">
                    <span class="underline"></span>
                </div>
                <button type="submit" class="btn secundario" onclick="validar()">Verificar</button>
            </form>
        </div>


    </div>
</body>
<script type="text/javascript" src='https://cdnjs.cloudflare.com/ajax/libs/blueimp-md5/2.12.0/js/md5.min.js'></script>
<script src="https://code.jquery.com/jquery-3.2.1.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery.mask/1.14.15/jquery.mask.min.js"></script>
<script src="../assets/js/formulario.js"></script>
<!-- <script src="assets/js/script.js"></script> -->

</html>