window.onload = function () {
    window.setTimeout(fadeout, 500);
}

function fadeout() {
    document.querySelector('.preloader').style.opacity = '0';
    document.querySelector('.preloader').style.display = 'none';
}

const nome_empresa = document.getElementById('nome_empresa')
const nome_fantasia = document.getElementById('nome_fantasia')
const ramo_empresa = document.getElementById('ramo')
const cep_empresa = document.getElementById('cep_empresa')
const numero_empresa = document.getElementById('numero_empresa')
const endereco_empresa = document.getElementById('endereco_empresa')

const conteudo_nome_empresa = document.getElementById('nome_empresa').value
const conteudo_ramo = document.getElementById('ramo_select').innerText
const conteudo_nome_fantasia = document.getElementById('nome_fantasia').value
const conteudo_cep_empresa = document.getElementById('cep_empresa').value
const conteudo_numero_empresa = document.getElementById('numero_empresa').value
const conteudo_endereco = document.getElementById('endereco_empresa').innerText

const salvarbtn = document.getElementById('salvarbtn')
const cancelarbtn = document.getElementById('cancelarbtn')

const IniciarCadastroEmpresa = function(){
    let popup = function(){
        abrirjanela('blue','Tudo bem, redirecionando para página de cadastro','Empresa não encontrada', 'carregar')
        document.getElementById('asdf_cancelar').style.display = 'none'
    }
    let redirecionar = function(){
        window.location.href = "assets/php/enviar_empresa?cadastrar=true"
    }
    setTimeout(popup, 1500)
    setTimeout(redirecionar, 3000)
}

const limpar_inputs = function(){
    let elementos = document.getElementsByTagName('input')
    for(let i = 0; i < elementos.length ; i++){
        elementos[i].classList.remove('vermei')
    }
    limpar_alertas()
}

const limpar_alertas = function(){
    let alerta = document.getElementsByClassName('alerta')
    for(let i = 0; i < alerta.length ; i++){
        if (!alerta[i].classList.contains('none')){
            alerta[i].classList.toggle('none')
        }
    }
}

const cancelarCadastroEmpresa = function(){
    let popup = function(){
        abrirjanela('blue','Tudo bem, redirecionando para página do usuário','Empresa não encontrada', 'carregar')
        document.getElementById('asdf_cancelar').style.display = 'none'
    }
    let redirecionar = function(){
        window.location.href = "../usuario"
    }

    setTimeout(popup, 1500)

    setTimeout(redirecionar, 6000)
}

function abrirEmpresa(){
    janelaPopUp.abre( "asdf", "p" + " "  + 'blue' + ' ' + 'confirm',  'Empresa Não encontrada' , 'Parece que você não tem uma empresa cadastrada. Gostaria de cadastrá-la agora?')

    document.getElementById('asdf_enviar').innerHTML = 'Não, talvez mais tarde'
    document.getElementById('asdf_enviar').addEventListener('click', cancelarCadastroEmpresa)

    document.getElementById('asdf_cancelar').addEventListener('click', IniciarCadastroEmpresa)
    document.getElementById('asdf_cancelar').innerHTML = 'Sim, gostaria'
}

if(conteudo_ramo != ''){
    console.log(conteudo_ramo)
    ramo_empresa.value = conteudo_ramo
}

function erro(){
    document.getElementById('asdf_cancelar').addEventListener('click', function(){
        window.location.href = "../../Login/login"
    })
    document.getElementById('asdf_cancelar').click()
}

function limparURL(url){ // tira o disparador de popup da url, limpando-a
    let nextURL = window.location.href.replace(url,'').replace('?','');
    let nextState = { additionalInformation: 'Updated the URL with JS' };
    window.history.replaceState(nextState, 'Perfil', nextURL);
}

let alerta = ''

switch (true) {
    case window.location.href.includes(md5('erro=true')):
        abrirjanela('red','Erro inesperado!<br>Por favor, faça login novamente.', 'Conta não sincronizada', 'falha')
        document.getElementsByClassName('content')[0].style.display = 'none'
        document.getElementById('asdf_cancelar').style.display = 'none'
        setTimeout(erro , 3000)
        limparURL(md5('erro=true'))
        break;
        
    case window.location.href.includes(md5('dados_empresa=false')):
        abrirEmpresa()
        limparURL(md5('dados_empresa=false'))
        break;

    case window.location.href.includes(md5('nome_empresa_duplicado=true')):
        document.getElementById('editarbtn').click()
        document.getElementById("nome_empresa").classList.add('vermei')
        alerta+='Nome para Empresa já cadastrado!<br>'
        limparURL(md5('nome_empresa_duplicado=true'))
        break;

    case window.location.href.includes(md5('nome_fantasia_duplicado=true')):
        document.getElementById('editarbtn').click()
        document.getElementById("nome_fantasia").classList.add('vermei')
        alerta+='Nome Fantasia já cadastrado!<br>'
        limparURL(md5('nome_fantasia_duplicado=true'))
        break;

    case window.location.href.includes(md5('sucesso=true')):
        abrirjanela('green','Dados alterados com êxito.', 'Alteração realizada com sucesso', 'sucesso')
        limparURL(md5('sucesso=true'))
        break;

    case window.location.href.includes(md5('cadastro=true')):
        abrirjanela('green','Dados registrados com êxito.', 'Cadastro realizado com sucesso', 'sucesso')
        limparURL(md5('cadastro=true'))
        break;

    case window.location.href.includes(md5('sucesso=false')):
        abrirjanela('red','Não foi possível realizar a operação solicitada. Por favor, tente novamente ou entre em contato conosco.', 'Erro inesperado', 'falha')
        limparURL(md5('sucesso=false'))
        break;
}

$('select').on('change', function() {
    if (this.value == conteudo_ramo) {
        salvarbtn.disabled = true
        cancelarbtn.disabled = true
    } else {
      salvarbtn.disabled = false
      cancelarbtn.disabled = false
    }
}).change();


if(!vazio(alerta)){
    abrirjanela('red',alerta, 'Alteração Inválida', 'falha')
}

$(document).keypress(
    function(event){
      if (event.which == '13') {
        event.preventDefault();
      }
});

function nada(){
    document.getElementById('asdf_cancelar').addEventListener('click', function(){
        document.getElementById("dados_empresa").submit();
    })
    document.getElementById('asdf_cancelar').click()
}

function vazio(item){ // verifica se o valor passado está vazio
    return item == ''
}


function ler_cep(cep){ // preenche o endereço automaticamente da empresa usando o cep
    if(cep.value.length == 10){
        $.ajax({
            url: 'https://viacep.com.br/ws/'+cep.value.replace(/-/, '').replace('.', '')+'/json/',
            dataType: 'json',
            success: function(resposta){
                if(resposta.logradouro == undefined || resposta.bairro == undefined || resposta.localidade == undefined || resposta.uf == undefined){
                    alertaDeErro(cep.id, 'CEP inválido!')
                    cep_empresa.focus()
                    salvarbtn.disabled = true
                    cancelarbtn.disabled = false
                    return
                    
                } else {
                    document.getElementsByName('rua_empresa')[0].value = resposta.logradouro
                    document.getElementsByName('bairro_empresa')[0].value = resposta.bairro
                    document.getElementsByName('cidade_empresa')[0].value = resposta.localidade
                    document.getElementsByName('estado_empresa')[0].value = resposta.uf
                    endereco_empresa.innerHTML = resposta.logradouro + ', ' + resposta.bairro + ', ' + resposta.localidade + ', ' + resposta.uf
                    numero_empresa.focus()
                    Cookies.set('endereco_empresa',1)
                }
                limpar_inputs()
            }
        })
    }
}

document.querySelectorAll('input').forEach(item => {
    item.addEventListener('keyup', function(){
        switch (this.id) {
            
            case 'nome_empresa':
                switch (true) {
                    case this.value == conteudo_nome_empresa:
                        salvarbtn.disabled = true
                        cancelarbtn.disabled = true
                        break;
                    
                    case this.value.length < 2:
                        salvarbtn.disabled = true
                        cancelarbtn.disabled = false
                        alertaDeErro(this.id, 'O nome deve ter no mínimo 2 letras!')
                        break;
                        
                        default:
                            limpar_inputs()
                            salvarbtn.disabled = false
                            cancelarbtn.disabled = false
                }
                break;

            case 'nome_fantasia':
                switch (true) {
                    case this.value == conteudo_nome_fantasia:
                        salvarbtn.disabled = true
                        cancelarbtn.disabled = true
                        break;

                    default:
                        limpar_inputs()
                        salvarbtn.disabled = false
                        cancelarbtn.disabled = false
                }
                break;

            case 'cep_empresa':
                switch (true) {
                    case this.value == conteudo_cep_empresa:
                        salvarbtn.disabled = true
                        cancelarbtn.disabled = true
                        break;

                    case this.value.length < 10:
                        salvarbtn.disabled = true
                        cancelarbtn.disabled = false
                        alertaDeErro(this.id, 'Complete o CEP!')
                        break;

                    default:
                        limpar_inputs()
                        salvarbtn.disabled = false
                        cancelarbtn.disabled = false
                }
                break;

            case 'numero_empresa':
                switch (true) {
                    case this.value == conteudo_numero_empresa:
                        salvarbtn.disabled = true
                        cancelarbtn.disabled = true
                        break;

                    case vazio(this.value):
                        salvarbtn.disabled = true
                        cancelarbtn.disabled = false
                        alertaDeErro(this.id, 'Preencha o número!')
                        break;

                    default:
                        limpar_inputs()
                        salvarbtn.disabled = false
                        cancelarbtn.disabled = false
                }
                break;
        }
    })
  })

function alertaDeErro(elemento, mensagem){
    if(!document.getElementById(elemento).classList.contains('vermei')){
        document.getElementById(elemento).classList.add('vermei')
        document.getElementById(elemento+'Alert').innerHTML = mensagem
        document.getElementById(elemento+'Alert').classList.toggle('none')
    }
}

function cancelar(){
    limpar_inputs()

    nome_empresa.value = conteudo_nome_empresa
    nome_fantasia.value = conteudo_nome_fantasia
    cep_empresa.value = conteudo_cep_empresa
    numero_empresa.value = conteudo_numero_empresa
    ramo.value = conteudo_ramo
    endereco_empresa.innerHTML = conteudo_endereco
    salvarbtn.disabled = true
    cancelarbtn.disabled = true
}

function salvar(){
    limpar_inputs()
    if(!vazio(cep_empresa.value) && cep_empresa.value.length <= 10 && vazio(numero_empresa.value)){
        alertaDeErro(cep_empresa.id, 'Complete o endereço!')
        numero_empresa.classList.add('vermei')

    } else {
        Cookies.set('empresa',1)
        abrirjanela('blue','Verificando dados','Validando Alteração', 'carregar')
        document.getElementById('asdf_cancelar').style.display = 'none'
        setTimeout(nada , 3000)
    }
}

function sair(){
    window.location.href= '../../index'
    localStorage.clear()
}

function fechar_menu(){
    document.getElementsByTagName('html')[0].classList.remove('nav-open')
}

function abrir_menu(){
    if(!document.getElementsByTagName('html')[0].classList.contains('nav-open')){
        document.getElementsByTagName('html')[0].classList.add('nav-open')
    }
}