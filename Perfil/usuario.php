<!DOCTYPE html>
<html lang="pt-BR">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="Kairos | Perfil">
    <link rel="shortcut icon" href="../assets/img/favicon.ico" type="image/x-icon">
    <link rel="stylesheet" href="../assets/css/style.css">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link
        href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;500;700&family=Poppins:wght@400;500;700&display=swap"
        rel="stylesheet">
    <title>Perfil</title>
</head>

<body class="body-perfil">
    <div class="fundo-barra-lateral">
        <div class="barra-lateral">
            <nav aria-label="Navegação Lateral">
                <ul class="nav-lateral">
                    <li><svg width="24" height="24" viewBox="0 0 24 24" fill="#ffffff"
                            xmlns="http://www.w3.org/2000/svg">
                            <path d="M17 15H19V17H17V15Z" fill="#ffffff" />
                            <path d="M19 11H17V13H19V11Z" fill="#ffffff" />
                            <path fill-rule="evenodd" clip-rule="evenodd"
                                d="M13 7H23V21H1V3H13V7ZM8 5H11V7H8V5ZM11 19V17H8V19H11ZM11 15V13H8V15H11ZM11 11V9H8V11H11ZM21 19V9H13V11H15V13H13V15H15V17H13V19H21ZM3 19V17H6V19H3ZM3 15H6V13H3V15ZM6 11V9H3V11H6ZM3 7H6V5H3V7Z"
                                fill="#ffffff" />
                        </svg><a href="PerfilEmpresa/empresa.php">Perfil da Empresa</a></li>
                    <li><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M12.552 8C11.9997 8 11.552 8.44772 11.552 9C11.552 9.55228 11.9997 10 12.552 10H16.552C17.1043 10 17.552 9.55228 17.552 9C17.552 8.44772 17.1043 8 16.552 8H12.552Z"
                                fill="#ffffff" fill-opacity="0.5" />
                            <path
                                d="M12.552 17C11.9997 17 11.552 17.4477 11.552 18C11.552 18.5523 11.9997 19 12.552 19H16.552C17.1043 19 17.552 18.5523 17.552 18C17.552 17.4477 17.1043 17 16.552 17H12.552Z"
                                fill="#ffffff" fill-opacity="0.5" />
                            <path
                                d="M12.552 5C11.9997 5 11.552 5.44772 11.552 6C11.552 6.55228 11.9997 7 12.552 7H20.552C21.1043 7 21.552 6.55228 21.552 6C21.552 5.44772 21.1043 5 20.552 5H12.552Z"
                                fill="#ffffff" fill-opacity="0.8" />
                            <path
                                d="M12.552 14C11.9997 14 11.552 14.4477 11.552 15C11.552 15.5523 11.9997 16 12.552 16H20.552C21.1043 16 21.552 15.5523 21.552 15C21.552 14.4477 21.1043 14 20.552 14H12.552Z"
                                fill="#ffffff" fill-opacity="0.8" />
                            <path
                                d="M3.448 4.00208C2.89571 4.00208 2.448 4.44979 2.448 5.00208V10.0021C2.448 10.5544 2.89571 11.0021 3.448 11.0021H8.448C9.00028 11.0021 9.448 10.5544 9.448 10.0021V5.00208C9.448 4.44979 9.00028 4.00208 8.448 4.00208H3.448Z"
                                fill="#ffffff" />
                            <path
                                d="M3.448 12.9979C2.89571 12.9979 2.448 13.4456 2.448 13.9979V18.9979C2.448 19.5502 2.89571 19.9979 3.448 19.9979H8.448C9.00028 19.9979 9.448 19.5502 9.448 18.9979V13.9979C9.448 13.4456 9.00028 12.9979 8.448 12.9979H3.448Z"
                                fill="#ffffff" />
                        </svg><a href="#">Análise de Marketing</a></li>
                    <li><i aria-hidden="true" class="gg-credit-card"></i>
                        <a href="#">Minha assinatura</a>
                    </li>
                    <a href="../index.php" class="btn secundario menu-btn">Sair</a>
                </ul>
                <div class="hamburguer">
                    <span class="bar"></span>
                    <span class="bar"></span>
                    <span class="bar"></span>
                </div>
            </nav>
        </div>
    </div>
    <div class="principal">
        <header>
            <a href="../index.php" class="btn secundario">Sair</a>
        </header>
        <div class="perfil">
            <h1 class="titulo">Olá, Gabriel</h1>
            <form action="" class="container perfil">
                <div class="fundo-dados">
                    <div class="form-caixa">
                        <label for="nome">Nome</label>
                        <input type="text" name="nome" id="nome" onkeyup="apenasLetras(this)" maxlength="50"
                            placeholder="Texto de texto" aria-controls="nomeAlert" value="gabriel">
                        <div id="nomeAlert"></div>
                    </div>
                    <div class="form-caixa">
                        <label>CPF</label>
                        <a class="desativado">000.000.000-00</a>
                    </div>
                    <div class="form-caixa">
                        <label>Email</label>
                        <a class="desativado">exemplo@gmail.com</a>
                    </div>
                </div>
                <div class="fundo-dados info-2">
                    <div class="dados-coluna">
                        <div class="form-caixa">
                            <label for="cep">CEP</label>
                            <input type="tel" name="cep" id="cep" placeholder="Texto de texto" aria-controls="cepAlert"
                                onkeypress="$(this).mask('00.000-000')" onkeyup="lerCEP(this)">
                            <div id="cepAlert"></div>
                        </div>
                        <div class="form-caixa">
                            <label for="numero">Número</label>
                            <input type="tel" name="numero" id="numero" placeholder="Texto de texto"
                                aria-controls="numeroAlert">
                            <div id="numeroAlert"></div>
                        </div>
                        <div class="form-caixa">
                            <input type="text" class="none" id="rua" name="rua">
                            <input type="text" class="none" id="bairro" name="bairro">
                            <input type="text" class="none" id="cidade" name="cidade">
                            <input type="text" class="none" id="estado" name="estado">
                            <label>Endereço</label>
                            <p class="desativado" id="endereco"></p>
                        </div>
                    </div>
                    <div class="dados-coluna telefone">
                        <label>Telefone</label>
                        <div class="form-caixa telefone">
                            <p class="desativado numeros">11 11111-1111</p>
                            <p class="desativado numeros">11 22222-2222</p>
                            <p class="desativado numeros">11 33333-3333</p>
                            <p class="desativado numeros">11 44444-4444</p>
                            <p class="desativado numeros">11 55555-5555</p>
                            <p class="desativado numeros">11 66666-6666</p>
                        </div>
                    </div>
                    <div class="dados-coluna" id="manipularNumeros">
                        <button class="btn terciario" id='add_tel' type="button">Adicionar
                            telefone</button>
                        <div id="telefoneAlert">Preencha o número por completo!</div>
                        <button class="btn terciario" id='del_tel' type="button">Excluir
                            telefone</button>
                    </div>
                </div>
                <div class="fundo-dados info-3">
                    <div class="form-caixa">
                        <label>Senha</label>
                        <div class="caixa-senhas">
                            <label for="senha_antiga">Senha Antiga</label>
                            <div class="senha-holder">
                                <input type="password" name="senha_antiga" id="senha_antiga" aria-controls="senhaAlert">
                                <i class="gg-eye" aria-controls="senha_antiga"></i>
                            </div>
                            <label for="senha_nova">Senha Nova</label>
                            <div class="senha-holder">
                                <input type="password" name="senha_nova" id="senha_nova">
                                <i class="gg-eye" aria-controls="senha_nova"></i>
                            </div>
                            <label for="senha_nova_dup">Digite Novamente</label>
                            <div class="senha-holder">
                                <input type="password" name="senha_nova_dup" id="senha_nova_dup">
                                <i class="gg-eye" aria-controls="senha_nova_dup"></i>
                            </div>
                            <div id="senhaAlert"></div>


                        </div>
                        <button type="button" class="btn terciario" aria-controls="caixa-senhas"
                            onclick="alterarSenha()" id="alterarsenha">Alterar
                            senha</button>
                    </div>
                </div>
                <div class="botoes">
                    <button class="btn primario" type="button" id="salvarbtn" disabled="true"
                        onclick="salvar()">Salvar</button>
                    <button class="btn secundario" type="reset" id="cancelarbtn" onclick="cancelar()"
                        disabled="true">Cancelar</button>
                </div>
            </form>
        </div>
    </div>
</body>
<script type="text/javascript" src='https://cdnjs.cloudflare.com/ajax/libs/blueimp-md5/2.12.0/js/md5.min.js'></script>

<script src="https://code.jquery.com/jquery-3.2.1.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery.mask/1.14.15/jquery.mask.min.js"></script>
<script src="https://cdn.lordicon.com/lusqsztk.js"></script>
<script src="https://cdn.jsdelivr.net/npm/js-cookie@2/src/js.cookie.min.js"></script>

<script src="../assets/js/globals.js"></script>
<script src="../assets/js/formulario.js"></script>
<script src="../assets/js/popup.js"></script>

<script src="assets/js/telefone.js"></script>
<script src="assets/js/script.js"></script>

</html>