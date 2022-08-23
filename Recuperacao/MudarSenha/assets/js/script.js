window.onload = function () {
  window.setTimeout(fadeout, 500);
};
function fadeout() {
  document.querySelector(".preloader").style.opacity = "0";
  document.querySelector(".preloader").style.display = "none";
}

function nada() {
  document.getElementById("asdf_cancelar").click();
}

const limpar_inputs = function () {
  let elementos = document.getElementsByTagName("input");
  for (let i = 0; i < elementos.length; i++) {
    elementos[i].classList.remove("vermei");
  }

  limpar_alertas();
};

const limpar_alertas = function () {
  let alerta = document.getElementsByClassName("alerta");
  let underline = document.getElementsByClassName("underline");

  for (let i = 0; i < alerta.length; i++) {
    if (!alerta[i].classList.contains("none")) {
      alerta[i].classList.toggle("none");
    }
  }

  for (let i = 0; i < underline.length; i++) {
    if (underline[i].style.background == "rgb(255, 0, 0)") {
      underline[i].style.background = "#4e6ef1a6";
    }
  }
};

function limparURL(url) {
  // tira o disparador de popup da url, limpando-a
  let nextURL = window.location.href.replace(url, "").replace("?", "");
  let nextState = { additionalInformation: "Updated the URL with JS" };
  window.history.replaceState(nextState, "Cadastro", nextURL);
}

function mudar_senha(botao, elemento) {
  let togglePassword = document.querySelector("#" + botao);
  let password = document.querySelector("#" + elemento);

  togglePassword.addEventListener("click", function (e) {
    let type =
      password.getAttribute("type") === "password" ? "text" : "password";
    password.setAttribute("type", type);
    this.classList.toggle("gg-eye");
    this.classList.toggle("gg-eye-alt");
  });
}

mudar_senha("togglePassword", "senha_nova");
mudar_senha("togglePassword_dup", "senha_nova_dup");

function alertaDeErro(elemento, mensagem) {
  senha_nova_dup.classList.add("vermei");
  document.getElementById(elemento).classList.add("vermei");
  document.getElementById(elemento + "Alert").innerHTML = mensagem;
  document.getElementById(elemento + "Alert").classList.toggle("none");
  document.getElementById(elemento + "underline").style.background = "#ff0000";
}

switch (true) {
  case window.location.href.includes(md5("conta_encontrada=true")):
    abrirjanela(
      "green",
      "Sua conta foi localizada com sucesso!<br>Agora basta inserir sua nova senha.",
      "Recuperação de Conta",
      "encontrado"
    );
    limparURL(md5("conta_encontrada=true"));
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

  case window.location.href.includes(md5("erro=true")):
    abrirjanela(
      "red",
      "<br>Não foi possível realizar a alteração de senha!",
      "Conta não sincronizada",
      "falha"
    );
    limparURL(md5("erro=true"));
    document.getElementById("asdf_cancelar").style.display = "none";
    setTimeout(nada, 4000);
    document
      .getElementById("asdf_cancelar")
      .addEventListener("click", function () {
        window.location.href = "../../index";
      });
    break;
}

const senha_nova = document.getElementById("senha_nova");
const senha_nova_dup = document.getElementById("senha_nova_dup");

function vazio(item) {
  // verifica se o valor passado está vazio
  return item.trim() == "";
}

$("#mudar").submit(function (e) {
  e.preventDefault();
});

function validar() {
  limpar_inputs();
  if (vazio(senha_nova.value) || vazio(senha_nova_dup.value)) {
    alertaDeErro(senha_nova.id, "Por favor, preencha as senhas!");
    senha_nova.focus();
    senha_nova.classList.add("vermei");
  } else if (senha_nova.value != senha_nova_dup.value) {
    alertaDeErro(
      senha_nova.id,
      "Senhas não coincidem! Verifique-as e tente novamente"
    );
    senha_nova.classList.add("vermei");
  } else {
    document.getElementById("mudar").submit();
  }
}

function paginaInicial() {
  window.location.href = "../../index";
}
