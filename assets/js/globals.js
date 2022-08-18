// window.onload = function () {
//   window.setTimeout(fadeout, 500);
// };

// function fadeout() {
//   document.querySelector(".preloader").style.opacity = "0";
//   document.querySelector(".preloader").style.display = "none";
// }

function enviar() {
  janelaPopUp.fecha("asdf");
  document.querySelector("form").submit();
}

function paginaInicial() {
  window.location.href = "../index";
}

function verificarURL(parametro) {
  //procura o parametro passado na URL, retornando booleano
  let verificarURL = new URLSearchParams(window.location.search);
  return verificarURL.has(parametro);
}

const limpar_inputs = function () {
  document.querySelectorAll("input").forEach((input) => {
    input.classList.remove("vermei");
  });

  limpar_alertas();
};

const limpar_alertas = function () {
  document.querySelectorAll(".alerta-ativo").forEach((alerta) => {
    alerta.classList.toggle("alerta-ativo");
  });
};

function limparURL(url) {
  // tira o disparador de popup da url, limpando-a
  let nextURL = window.location.href.replace(url, "").replace("?", "");
  let nextState = { additionalInformation: "Updated the URL with JS" };
  window.history.replaceState(nextState, "Cadastro", nextURL);
}

function alertaDeErro(elemento, mensagem) {
  elemento.focus();
  let caixa = document.getElementById(elemento.getAttribute("aria-controls"));
  document.getElementById(elemento.id).classList.add("vermei");
  caixa.id === "valor"
    ? caixa.classList.toggle("alerta-ativo")
    : caixa.classList.add("alerta-ativo");
  caixa.innerHTML = mensagem;
}

function vazio(item) {
  // verifica se o valor passado está vazio
  return item.trim() == "";
}

function validarEmail(email) {
  // auto-explicativo
  if (!vazio(email)) {
    return /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/gi.test(
      email
    );
  } else {
    return false;
  }
}

function apenasLetras(event) {
  // deixa apenas letras com ou sem acento serem digitadas
  if (event.value != undefined) {
    let limpo = event.value
      .replace(/[^\w\s-zÀ-ÖØ-öø-ÿ]/gi, "")
      .replace(/[0-9]/g, "");
    event.value = limpo.replace("-", "").replace("_", "");
  }
}

$(document).keypress(
  // desativa tecla ENTER
  function (event) {
    if (event.which == "13") {
      event.preventDefault();
    }
  }
);

function lerCEP(cep) {
  if (cep.value.length == 10) {
    $.ajax({
      url:
        "https://viacep.com.br/ws/" +
        cep.value.replace(/-/, "").replace(".", "") +
        "/json/",
      dataType: "json",
      success: function (resposta) {
        if (
          resposta.logradouro == undefined ||
          resposta.bairro == undefined ||
          resposta.localidade == undefined ||
          resposta.uf == undefined
        ) {
          abrirjanela(
            "red",
            "CEP inválido! Por favor, verifique os números e tente novamente.",
            "Dados Inválidos",
            "falha"
          );

          if (window.location.href.includes("cadastro")) {
            alertaDeErro(
              document.querySelector('input[id^="cep"]'),
              "CEP inválido!"
            );
            dispararEvento(
              document.querySelector('input[id^="cep"]'),
              "keyup",
              "condicaoCep"
            );
          } else {
            salvarbtn.disabled = true;
            cancelarbtn.disabled = false;
          }
          return;
        } else {
          cep.classList.remove("vermei");
          document.querySelector('input[id^="rua"]').value =
            resposta.logradouro;
          document.querySelector('input[id^="bairro"]').value = resposta.bairro;
          document.querySelector('input[id^="cidade"]').value =
            resposta.localidade;
          document.querySelector('input[id^="estado"]').value = resposta.uf;
          document.querySelector('div[id^="endereco"').classList.remove("none");
          document.querySelector('div[id^="endereco"').innerHTML =
            resposta.logradouro +
            ", " +
            resposta.bairro +
            ", " +
            resposta.localidade +
            ", " +
            resposta.uf;
          document.querySelector('input[id^="numero"').focus();
        }
      },
    });
  }
}

function validarCNPJ(valor) {
  valor = valor.replace(/[^\d]+/g, "");

  if (valor === "") return false;
  if (valor.length != 14) return false;

  // Elimina CNPJs invalidos conhecidos
  if (
    valor == "00000000000000" ||
    valor == "11111111111111" ||
    valor == "22222222222222" ||
    valor == "33333333333333" ||
    valor == "44444444444444" ||
    valor == "55555555555555" ||
    valor == "66666666666666" ||
    valor == "77777777777777" ||
    valor == "88888888888888" ||
    valor == "99999999999999"
  )
    return false;

  // Valida DVs
  tamanho = valor.length - 2;
  numeros = valor.substring(0, tamanho);
  digitos = valor.substring(tamanho);
  soma = 0;
  pos = tamanho - 7;
  for (i = tamanho; i >= 1; i--) {
    soma += numeros.charAt(tamanho - i) * pos--;
    if (pos < 2) pos = 9;
  }
  resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);
  if (resultado != digitos.charAt(0)) return false;

  tamanho = tamanho + 1;
  numeros = valor.substring(0, tamanho);
  soma = 0;
  pos = tamanho - 7;
  for (i = tamanho; i >= 1; i--) {
    soma += numeros.charAt(tamanho - i) * pos--;
    if (pos < 2) pos = 9;
  }
  resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);
  if (resultado != digitos.charAt(1)) return false;

  return true;
}

function dispararEvento(elemento, evento, stringCondicao) {
  //dispara um evento de confirmação para o input no qual o valor inserido é inválido ou insatisfatório

  var condicao; // função usada para validação

  switch (
    stringCondicao // seta a função de acordo com a stringCondicao, usada para saber qual validação será usada para tratar o erro
  ) {
    case "condicaoVazio":
      var condicao = function () {
        return vazio(elemento.value);
      };
      break;
    case "condicaoEmail":
      var condicao = function () {
        return !validarEmail(email.value);
      };
      break;
    case "condicaoSenha":
      var condicao = function () {
        if (vazio(senha.value) || vazio(confirm_senha.value)) {
          return true;
        } else {
          return false;
        }
      };
      break;
    case "condicaoCNPJ":
      var condicao = function () {
        return !validarCNPJ(elemento.value);
      };
      break;
    case "condicaoCPF":
      var condicao = function () {
        return validar_cpf(cpf.value) == 1;
      };
      break;
    case "condicaoCep":
      var condicao = function () {
        return elemento.value.length != 10;
      };
      break;
    case "condicaoNum":
      var condicao = function () {
        return num.value.length != 19;
      };
      break;
    case "condicaoSelect":
      var condicao = function () {
        return vazio(elemento.value);
      };
      break;
    case "condicaoCvv":
      var condicao = function () {
        return cvv.value.length < 3;
      };
  }

  let funcao = function () {
    // verifica se a validação é satisfeita, assim retira o eventListener, remove os avisos e libera o usuario para registrar-se
    if (!condicao()) {
      elemento.classList.remove("vermei");
      document
        .getElementById(elemento.getAttribute("aria-controls"))
        .classList.remove("alerta-ativo");
      if (elemento.id === "senha") {
        window.remove(evento, funcao);
        confirm_senha.classList.remove("vermei");
      }
      elemento.removeEventListener(evento, funcao);
      document.getElementById("butao").disabled = false;
    }
  };

  // Já sabendo qual condição deve ser utilizada, é adicionado ao elemento seu evento (keydown ou keyup) e chamada da função, no qual fará uso da condicao setada pelo switch
  document.getElementById("butao").disabled = true;
  if (elemento.id === "senha") {
    window.addEventListener(evento, funcao);
  }
  elemento.addEventListener(evento, funcao);
}
