const num = document.getElementById("cardNumber");
const nome = document.getElementById("cardName");
const mes = document.getElementById("cardMonth");
const ano = document.getElementById("cardYear");
const cvv = document.getElementById("cardCvv");

const cpf = document.getElementById("cpf");
const rua = document.getElementById("rua");
const numero = document.getElementById("numero");
const bairro = document.getElementById("bairro");
const cidade = document.getElementById("cidade");
const estado = document.getElementById("estado");
const endereco = document.getElementById("endereco");

switch (true) {
  case verificarURL(md5("erro=true")):
    erroSincronizacao("../../Login/login");
    limparURL(md5("erro=true"));
    break;

  case verificarURL(md5("cpf=false")):
    limparURL(md5("cpf=false"));
    abrirjanela({
      cor: "red",
      corpo: "CPF já utilizado!",
      titulo: "Dados Duplicados",
      icone: "falha",
    });
    cpf.classList.add("vermei");
    break;
}

function validar_cpf(cpf) {
  let Soma = 0;
  let Resto;
  cpf = String(cpf).replace(".", "").replace("-", "").replace(".", "");
  if (
    cpf == "00000000000" ||
    cpf == "11111111111" ||
    cpf == "22222222222" ||
    cpf == "33333333333" ||
    cpf == "44444444444" ||
    cpf == "55555555555" ||
    cpf == "66666666666" ||
    cpf == "77777777777" ||
    cpf == "88888888888" ||
    cpf == "99999999999"
  )
    return 1;

  for (i = 1; i <= 9; i++)
    Soma = Soma + parseInt(cpf.substring(i - 1, i)) * (11 - i);
  Resto = (Soma * 10) % 11;

  if (Resto == 10 || Resto == 11) Resto = 0;
  if (Resto != parseInt(cpf.substring(9, 10))) return 1;

  Soma = 0;
  for (i = 1; i <= 10; i++)
    Soma = Soma + parseInt(cpf.substring(i - 1, i)) * (12 - i);
  Resto = (Soma * 10) % 11;

  if (Resto == 10 || Resto == 11) Resto = 0;
  if (Resto != parseInt(cpf.substring(10, 11))) return 1;
  return 0;
}

$(document).ready(function () {
  // desabilita CTRL+V por motivos de incompatibilidade de máscara
  $("#cpf").on("cut copy paste", function (e) {
    e.preventDefault();
  });
  $("#numero").on("cut copy paste", function (e) {
    e.preventDefault();
  });
  $("#cep").on("cut copy paste", function (e) {
    e.preventDefault();
  });
});

function cancelar() {
  abrirjanela({
    cor: "blue",
    titulo: "Cancelando",
    corpo: "Pena que mudou de ideia =(",
    icone: "carregar",
    semBotoes: true,
  });
  setTimeout(() => {
    window.location.href = "../Perfil/usuario";
  }, 3000);
}

function validar() {
  let validarNumero;

  !vazio(num.value) &&
  document.body.contains(document.getElementById("imagem")) &&
  document.getElementById("imagem").getAttribute("src").includes("amex")
    ? (validarNumero = 17)
    : (validarNumero = 19);

  limpar_inputs();

  if (num.value.length != validarNumero) {
    alertaDeErro(num, "Preencha o número do cartão!");
    dispararEvento(num, "keyup", "condicaoNum");
    num.classList.add("vermei");
  } else if (vazio(nome.value)) {
    alertaDeErro(nome, "Preencha o nome do titular!");
    dispararEvento(nome, "keyup", "condicaoVazio");
    nome.classList.add("vermei");
  } else if (vazio(mes.value)) {
    alertaDeErro(mes, "Selecione o mês!");
    dispararEvento(mes, "change", "condicaoSelect");
    mes.classList.add("vermei");
  } else if (vazio(ano.value)) {
    alertaDeErro(ano, "Selecione o ano!");
    dispararEvento(ano, "change", "condicaoSelect");
    ano.classList.add("vermei");
  } else if (cvv.value.length < 3) {
    alertaDeErro(cvv, "Preencha o CVV do cartão!");
    dispararEvento(cvv, "keyup", "condicaoCvv");
    cvv.classList.add("vermei");
  } else if (validar_cpf(cpf.value) === 1) {
    alertaDeErro(cpf, "Insira um CPF válido");
    dispararEvento(cpf, "keyup", "condicaoCPF");
  } else if (cep.value.length < 10) {
    dispararEvento(cep, "keyup", "condicaoCep");
    alertaDeErro(cep, "Preencha o CEP!");
  } else if (vazio(numero.value)) {
    dispararEvento(numero, "keyup", "condicaoVazio");
    alertaDeErro(numero, "Preencha o Número!");
  } else {
    abrirjanela({
      cor: "blue",
      corpo: "Validando Dados",
      titulo: "Cadastrando Cartão",
      icone: "carregar",
      semBotoes: true,
    });
    setTimeout(enviar, 3000);
  }
}
