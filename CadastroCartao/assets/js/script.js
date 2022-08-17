const num = function () {
  return document.getElementById("cardNumber");
};
const nome = function () {
  return document.getElementById("cardName");
};
const mes = function () {
  return document.getElementById("cardMonth");
};
const ano = function () {
  return document.getElementById("cardYear");
};
const cvv = function () {
  return document.getElementById("cardCvv");
};
const cpf = document.getElementById("cpf");
const rua = document.getElementById("rua");
const numero = document.getElementById("numero");
const bairro = document.getElementById("bairro");
const cidade = document.getElementById("cidade");
const estado = document.getElementById("estado");
const endereco = document.getElementById("endereco");

switch (true) {
  case window.location.href.includes(md5("erro=true")): // erro de cadastro
    abrirjanela(
      "red",
      "<br>Não foi possível realizar o cadastro!",
      "Conta não sincronizada",
      "falha"
    );

    document.getElementById("asdf_cancelar").style.display = "none";
    setTimeout(nada, 4000);
    document
      .getElementById("asdf_cancelar")
      .addEventListener("click", function () {
        window.location.href = "../index";
      });
    limparURL(md5("erro=true"));
    break;

  case window.location.href.includes(md5("cpf=false")):
    limparURL(md5("cpf=false"));
    abrirjanela("red", "CPF já utilizado!", "Dados Duplicados", "falha");
    cpf.classList.add("vermei");
    break;

  case window.location.href.includes(md5("sucesso=false")):
    abrirjanela(
      "red",
      "Não foi possível realizar a operação solicitada. Por favor, tente novamente ou entre em contato conosco.",
      "Erro inesperado",
      "falha"
    );
    limparURL(md5("sucesso=false"));
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

function evento_cpf(cpf) {
  if (cpf.value.length == 14) {
    if (validar_cpf(cpf.value) == 1) {
      alertaDeErro(cpf.id, "Por favor, insira um CPF válido!");
      cpf.focus();
      cpf.classList.add("vermei");
      document.getElementById("butao").disabled = true;
    } else {
      document.getElementById(cpf.id + "Alert").classList.add("none");
      cpf.classList.remove("vermei");
      document.getElementById("butao").disabled = false;
    }
  }
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

const dispararEvento = function (elemento, evento, stringCondicao) {
  //dispara um evento de confirmação para o input no qual o valor inserido é inválido ou insatisfatório

  var condicao; // função usada para validação

  switch (
    stringCondicao // seta a função de acordo com a stringCondicao, usada para saber qual validação será usada para tratar o erro
  ) {
    case "condicaoNum":
      var condicao = function () {
        return num().value.length == 19;
      };
      break;
    case "condicaoNome":
      var condicao = function () {
        return nome().value.length > 5;
      };
      break;
    case "condicaoMes":
      var condicao = function () {
        return !vazio(mes().value);
      };
      break;
    case "condicaoAno":
      var condicao = function () {
        return !vazio(ano().value);
      };
      break;
    case "condicaoCvv":
      var condicao = function () {
        return cvv().value.length == 3;
      };
      break;
    case "condicaoNumero":
      var condicao = function () {
        return !$("#numero").val() == "";
      };
      break;
    case "condicaoCep":
      var condicao = function () {
        return cep.value.length >= 10;
      };
      break;
  }
  let funcao = function () {
    // verifica se a validação é satisfeita, assim retira o eventListener, remove os avisos e libera o usuario para registrar-se
    if (condicao()) {
      elemento.classList.remove("vermei");
      document.getElementById(elemento.id + "Alert").classList.add("none");
      elemento.removeEventListener(evento, funcao);
      document.getElementById("butao").disabled = false;
    }
  };

  // Já sabendo qual condição deve ser utilizada, é adicionado ao elemento seu evento (keydown ou keyup) e chamada da função, no qual fará uso da condicao setada pelo switch
  document.getElementById("butao").disabled = true;
  elemento.addEventListener(evento, funcao);
};

function validar() {
  limpar_inputs();

  if (num().value.length != 19) {
    alertaDeErro(num().id, "Preencha o número do cartão!");
    dispararEvento(num(), "keyup", "condicaoNum");
    num().focus();
    num().classList.add("vermei");
  } else if (nome().value.length < 5) {
    alertaDeErro(nome().id, "Preencha o nome do titular!");
    dispararEvento(nome(), "keyup", "condicaoNome");
    nome().focus();
    nome().classList.add("vermei");
  } else if (vazio(mes().value)) {
    alertaDeErro(mes().id, "Selecione o mês!");
    dispararEvento(mes(), "change", "condicaoMes");
    mes().focus();
    mes().classList.add("vermei");
  } else if (vazio(ano().value)) {
    alertaDeErro(ano().id, "Selecione o ano!");
    dispararEvento(ano(), "change", "condicaoAno");
    ano().focus();
    ano().classList.add("vermei");
  } else if (cvv().value.length < 3) {
    alertaDeErro(cvv().id, "Preencha o CVV do cartão!");
    dispararEvento(cvv(), "keyup", "condicaoCvv");
    cvv().focus();
    cvv().classList.add("vermei");
  } else if ($("#cpf").val().length < 14) {
    alertaDeErro(cpf.id, "Preencha o CPF!");
    cpf.focus();
    $("#cpf").addClass("vermei");
  } else if ($("#cep").val().length < 10) {
    dispararEvento(cep, "keyup", "condicaoCep");
    alertaDeErro(cep.id, "Preencha o CEP!");
    cep.focus();
    cep.classList.add("vermei");
  } else if (vazio($("#numero").val())) {
    dispararEvento(
      document.getElementById("numero"),
      "keyup",
      "condicaoNumero"
    );
    alertaDeErro(numero.id, "Preencha o Número!");
    numero.focus();
    $("#numero").addClass("vermei");
  } else {
    localStorage.setItem(cep.id, cep.value);
    localStorage.setItem(numero.id, numero.value);
    abrirjanela("blue", "Validando Dados", "Cadastrando Cartão", "carregar");
    document.getElementById("asdf_cancelar").style.display = "none";
    setTimeout(nada, 4000);
    document
      .getElementById("asdf_cancelar")
      .addEventListener("click", function () {
        document.getElementById("cadastro_cartao").submit();
      });
  }
}
