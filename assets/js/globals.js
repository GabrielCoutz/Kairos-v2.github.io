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
  let caixa = document.getElementById(elemento.getAttribute("aria-controls"));
  document.getElementById(elemento.id).classList.add("vermei");
  caixa.id === "cnpj"
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
            "CEP inválido!<br>Por favor, verifique os números e tente novamente.",
            "Dados Inválidos",
            "falha"
          );

          if (window.location.href.includes("cadastro")) {
            cep_empresa.classList.add("vermei");
            cep_empresa.focus();
          } else {
            salvarbtn.disabled = true;
            cancelarbtn.disabled = false;
          }

          return;
        } else {
          cep_empresa.classList.remove("vermei");
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
          numero_empresa.focus();
        }
      },
    });
  }
}

function dispararEvento(elemento, evento, stringCondicao) {
  //dispara um evento de confirmação para o input no qual o valor inserido é inválido ou insatisfatório

  var condicao; // função usada para validação

  switch (
    stringCondicao // seta a função de acordo com a stringCondicao, usada para saber qual validação será usada para tratar o erro
  ) {
    case "condicaoNome":
      var condicao = function () {
        return vazio(nome.value);
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
        return validarCNPJ(cnpj.value) == 1;
      };
      break;
    case "condicaoCep":
      var condicao = function () {
        return cep.value.length != 10;
      };
      break;
    case "condicaoNumero":
      var condicao = function () {
        return vazio(numero.value);
      };
      break;
  }

  let funcao = function () {
    // verifica se a validação é satisfeita, assim retira o eventListener, remove os avisos e libera o usuario para registrar-se
    if (!condicao()) {
      elemento.classList.remove("vermei");
      document
        .getElementById(elemento.getAttribute("aria-controls"))
        .classList.remove("alerta-ativo");
      if (elemento == senha) {
        window.remove(evento, funcao);
        confirm_senha.classList.remove("vermei");
      }
      elemento.removeEventListener(evento, funcao);
      document.getElementById("butao").disabled = false;
    }
  };

  // Já sabendo qual condição deve ser utilizada, é adicionado ao elemento seu evento (keydown ou keyup) e chamada da função, no qual fará uso da condicao setada pelo switch
  document.getElementById("butao").disabled = true;
  if (elemento.id == senha) {
    window.addEventListener(evento, funcao);
  }
  elemento.addEventListener(evento, funcao);
}
