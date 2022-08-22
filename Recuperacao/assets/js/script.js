window.onload = function () {
    window.setTimeout(fadeout, 500);
}
function fadeout() {
    document.querySelector('.preloader').style.opacity = '0';
    document.querySelector('.preloader').style.display = 'none';
}

function nada(){
    document.getElementById('asdf_cancelar').click()
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
    let underline = document.getElementsByClassName('underline')

    for(let i = 0; i < alerta.length ; i++){
        if (!alerta[i].classList.contains('none')){
            alerta[i].classList.toggle('none')
        }
    }

    for(let i = 0; i < underline.length ; i++){
        if (underline[i].style.background == 'rgb(255, 0, 0)'){
            underline[i].style.background = '#4e6ef1a6'
        }
    }
}

function nada(){
    document.getElementById('asdf_cancelar').click()
}

const nome = document.getElementById('nome')
const email = document.getElementById('email')
const captcha = document.getElementById('captcha')

function limparURL(url){ // tira o disparador de popup da url, limpando-a
    let nextURL = window.location.href.replace(url,'').replace('?','');
    let nextState = { additionalInformation: 'Updated the URL with JS' };
    window.history.replaceState(nextState, 'Recuperação', nextURL);
}


function alertaDeErro(elemento, mensagem){
    document.getElementById(elemento).classList.add('vermei')
    document.getElementById(elemento+'Alert').innerHTML = mensagem
    document.getElementById(elemento+'Alert').classList.toggle('none')
    if(elemento != captcha.id){
        document.getElementById(elemento+'underline').style.background = '#ff0000'
    }
}

if (window.location.href.includes(md5('erro=true'))){ //erro no captcha
    abrirjanela('red','Possível Fraude detectada!<br>Por favor, insira as informações novamente.','Erro no CAPTCHA', 'falha')
    limparURL(md5('erro=true'))
}

if (window.location.href.includes(md5('sucesso=false'))) { // dados incorretos ou conta não existe
    abrirjanela('red','Sua conta não foi localizada!<br>Por favor, verifique se os dados estão escritos corretamente.', 'Recuperação de Conta', 'falha')
    limparURL(md5('sucesso=false'))

    nome.classList.add('vermei')
    email.classList.add('vermei')
}

$(document).keypress( // desativa tecla ENTER
    function(event){
      if (event.which == '13') {
        event.preventDefault();
      }
});

function vazio(item){ // verifica se o valor passado está vazio
    return item.trim() == ''
}

function apenasLetras(event) { // deixa apenas letras com ou sem acento serem digitadas
    if(event.value != undefined){
        let limpo = event.value.replace(/[^\w\s-zÀ-ÖØ-öø-ÿ]/gi, '').replace(/[0-9]/g,'')
        event.value = limpo.replace('-','').replace('_','')
    }
}

$("#recuperacao").submit(function(e) {
        e.preventDefault();
});

function validarEmail(email){ // auto-explicativo
    if (!vazio(email)){
        return /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/gi.test(email)
    } else {
        return false
    }
}

const dispararEvento = function(elemento, evento, stringCondicao){  //dispara um evento de confirmação para o input no qual o valor inserido é inválido ou insatisfatório

    var condicao // função usada para validação

    switch(stringCondicao){ // seta a função de acordo com a stringCondicao, usada para saber qual validação será usada para tratar o erro
        case 'condicaoNome': var condicao = function(){ return vazio(nome.value)}; break;
        case 'condicaoEmail': var condicao = function(){ return !validarEmail(email.value)}; break;
        case 'condicaoCaptcha': var condicao = function(){ return grecaptcha.getResponse() == ""}; break;
    }

    let funcao = function(){ // verifica se a validação é satisfeita, assim retira o eventListener, remove os avisos e libera o usuario para registrar-se
        if(!condicao()){
            elemento.classList.remove('vermei')
            document.getElementById(elemento.id+'Alert').classList.add('none')
            elemento.removeEventListener(evento,funcao)
            document.getElementById('butao').disabled = false
            if (elemento != captcha){
                document.getElementById(elemento.id+'underline').style.background = '#4e6ef1a6'
            }
        }
    }

    // Já sabendo qual condição deve ser utilizada, é adicionado ao elemento seu evento (keydown ou keyup) e chamada da função, no qual fará uso da condicao setada pelo switch
    document.getElementById('butao').disabled = true
    elemento.addEventListener(evento,funcao)
}

function validar(){
    if(vazio(nome.value)){
        alertaDeErro(nome.id, "Por favor, insira um nome válido!")
        dispararEvento(nome, 'keyup', 'condicaoNome')
        nome.focus()

    } else if (!validarEmail(email.value)){
        dispararEvento(email, 'keyup', 'condicaoEmail')
        alertaDeErro(email.id, "Por favor, insira um email válido!")
        email.focus()

    } else if (grecaptcha.getResponse() == ""){
        dispararEvento(captcha, 'keyup', 'condicaoCaptcha')
        alertaDeErro(captcha.id, 'Por favor, preencha o CAPTCHA!')

    } else {
        abrirjanela('blue','Validando Dados','Recuperação de Conta', 'carregar')
        document.getElementById('asdf_cancelar').style.display = 'none'
        setTimeout(nada , 4000)
        document.getElementById('asdf_cancelar').addEventListener('click',function(){
                document.getElementById('recuperacao').submit()
            })
    }
}

function paginaInicial(){
    window.location.href = "../index";
}