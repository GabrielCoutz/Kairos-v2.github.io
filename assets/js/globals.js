// window.onload = function () {
//   window.setTimeout(fadeout, 500);
// };

// function fadeout() {
//   document.querySelector(".preloader").style.opacity = "0";
//   document.querySelector(".preloader").style.display = "none";
// }

// function nada() {
//   document.getElementById("asdf_cancelar").click();
// }

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
  caixa.classList.toggle("alerta-ativo");
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
