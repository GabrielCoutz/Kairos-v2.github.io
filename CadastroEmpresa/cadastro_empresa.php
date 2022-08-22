<!DOCTYPE html>
<html lang="pt-BR">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="description" content="Kairos | Cadastro da Empresa">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="shortcut icon" href="../assets/img/favicon.ico" type="image/x-icon">
    <link rel="stylesheet" href="../assets/css/style.css">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link
        href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;500;700&family=Poppins:wght@400;500;700&display=swap"
        rel="stylesheet">
    <link href="https://cdn.lineicons.com/3.0/lineicons.css" rel="stylesheet">
    <title>Cadastro da Empresa</title>
    <?php
        session_start();
        error_reporting(E_ERROR | E_PARSE);
        if(!isset($_SESSION['email']) && !strpos($protocol . $_SERVER['HTTP_HOST'] . $_SERVER['REQUEST_URI'],md5('erro=true'))){
            header("Refresh:0; url=cadastro_empresa".'?'.md5('erro=true'));
            exit;
        }
	?>
</head>

<body class="body-form">

    <header class="header container">
        <div class="header-logo">
            <a href="../index"><img src="../assets/img/logo/airos.png" alt="Kairos Logo"></a>
        </div>
    </header>

    <div class="fundo-form container">
        <div class="form-holder">
            <form method="POST" action="assets/php/cadastrar" class="formulario empresa" onsubmit="return false">
                <h1 class="titulo">Cadastre sua empresa</h1>
                <div class="form-caixa">
                    <label for="nome_empresa">Nome da empresa</label>
                    <i class="gg-organisation"></i>
                    <input type="text" name="nome_empresa" id="nome_empresa" placeholder="Nome da empresa"
                        aria-controls="nome_empresaAlert" maxlength="50">
                    <span class="underline"></span>
                    <div id="nome_empresaAlert"></div>
                </div>
                <div class="form-caixa">
                    <label for="nome_fantasia">Nome Fantasia</label>
                    <i class="gg-organisation"></i>
                    <input type="text" name="nome_fantasia" id="nome_fantasia" placeholder="Nome Fantasia"
                        aria-controls="nome_fantasiaAlert" maxlength="50">
                    <span class="underline"></span>
                    <div id="nome_fantasiaAlert"></div>
                </div>
                <div class="form-caixa">
                    <label for="cnpj">CNPJ</label>
                    <i class="gg-organisation"></i>
                    <input type="tel" name="cnpj" id="cnpj" placeholder="CNPJ" aria-controls="cnpjAlert"
                        onkeypress="$(this).mask('00.000.000/0000-00')">
                    <span class="underline"></span>
                    <div id="cnpjAlert"></div>
                </div>
                <div class="form-caixa">
                    <label for="ramo">Ramo</label>
                    <i class="gg-organisation"></i>
                    <select name="ramo" id="ramo" aria-controls="ramoAlert">
                        <option value disabled selected>Selecione o Ramo</option>
                        <option>Alimentação</option>
                        <option>Saúde</option>
                        <option>Serviços</option>
                        <option>Tecnologia</option>
                        <option>Moda</option>
                    </select>
                    <div id="ramoAlert"></div>
                </div>
                <div class="form-caixa">
                    <label for="cep_empresa">CEP</label>
                    <i class="gg-pin"></i>
                    <input type="tel" name="cep_empresa" id="cep_empresa" placeholder="CEP"
                        aria-controls="cep_empresaAlert" onkeypress="$(this).mask('00.000-000')" onkeyup="lerCEP(this)">
                    <span class="underline"></span>
                    <div id="cep_empresaAlert"></div>
                </div>
                <div class="form-caixa">
                    <label for="numero_empresa">Número</label>
                    <i class="gg-pin"></i>
                    <input type="tel" name="numero_empresa" id="numero_empresa" placeholder="Número"
                        aria-controls="numero_empresaAlert">
                    <span class="underline"></span>
                    <div id="numero_empresaAlert"></div>
                </div>
                <div id='endereco' class="none"></div>
                <input type="text" class="none" id="rua_empresa" name="rua_empresa">
                <input type="text" class="none" id="bairro_empresa" name="bairro_empresa">
                <input type="text" class="none" id="cidade_empresa" name="cidade_empresa">
                <input type="text" class="none" id="estado_empresa" name="estado_empresa">

                <button type="button" id="butao" class="btn primario" onclick="validar()">Registrar</button>
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