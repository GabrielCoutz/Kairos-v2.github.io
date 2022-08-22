function CriarAnalise() {
  // captura a resposta do usuario sobre a realização da análise e responde de acordo
  janelaPopUp.abre(
    "asdf",
    "p" + " " + "blue" + " " + "confirm",
    "Análise não realizada",
    "Parece que você não fez nenhuma análise ainda. Gostaria de iniciá-la agora?"
  );

  document.getElementById("asdf_cancelar").innerHTML = "Sim, gostaria";

  document.getElementById("asdf_enviar").innerHTML = "Não, talvez depois";

  document.getElementsByClassName("content")[0].classList.add("none");
  document
    .getElementById("asdf_cancelar")
    .addEventListener("click", IniciarAnalise);
  document
    .getElementById("asdf_enviar")
    .addEventListener("click", CancelarAnalise);
}

const forcas = document.getElementById("forcas");
const fraquezas = document.getElementById("fraquezas");
const oportunidades = document.getElementById("oportunidades");
const ameacas = document.getElementById("ameacas");

document
  .getElementById("orientacao-fxf")
  .addEventListener("mouseenter", function () {
    forcas.style.boxShadow = "0px 0px 7px -1px rgb(0 0 0 / 20%)";
    forcas.style.borderRadius = "10px";
    forcas.style.transform = "perspective(1000px) scale(1.02)";
    forcas.style.marginBottom = "5px";
    fraquezas.style.opacity = "0.4";
    ameacas.style.opacity = "0.4";

    oportunidades.style.boxShadow = "0px 0px 7px -1px rgb(0 0 0 / 20%)";
    oportunidades.style.transform = "perspective(1000px) scale(1.02)";
    oportunidades.style.marginTop = "5px";
    oportunidades.style.borderRadius = "10px";
  });

document
  .getElementById("orientacao-fxf")
  .addEventListener("mouseout", function () {
    forcas.style.boxShadow = "none";
    forcas.style.borderRadius = "0px";
    forcas.style.transform = "perspective(1000px) scale(1)";
    forcas.style.marginBottom = "0px";
    fraquezas.style.opacity = "1";
    ameacas.style.opacity = "1";

    oportunidades.style.boxShadow = "none";
    oportunidades.style.marginTop = "0px";
    oportunidades.style.transform = "perspective(1000px) scale(1)";
    oportunidades.style.borderRadius = "0px";
  });
//---------------------------------------------------------------------------------------------------------
document
  .getElementById("orientacao-fxa")
  .addEventListener("mouseenter", function () {
    forcas.style.boxShadow = "0px 0px 7px -1px rgb(0 0 0 / 20%)";
    forcas.style.borderRadius = "10px";
    forcas.style.transform = "perspective(1000px) scale(1.02)";
    forcas.style.marginBottom = "5px";
    fraquezas.style.opacity = "0.4";
    oportunidades.style.opacity = "0.4";

    ameacas.style.boxShadow = "0px 0px 7px -1px rgb(0 0 0 / 20%)";
    ameacas.style.transform = "perspective(1000px) scale(1.02)";
    ameacas.style.marginTop = "5px";
    ameacas.style.borderRadius = "10px";
  });

document
  .getElementById("orientacao-fxa")
  .addEventListener("mouseout", function () {
    forcas.style.boxShadow = "none";
    forcas.style.borderRadius = "0px";
    forcas.style.transform = "perspective(1000px) scale(1)";
    forcas.style.marginBottom = "0px";
    fraquezas.style.opacity = "1";
    oportunidades.style.opacity = "1";

    ameacas.style.boxShadow = "none";
    ameacas.style.transform = "perspective(1000px) scale(1)";
    ameacas.style.marginTop = "0px";
    ameacas.style.borderRadius = "0px";
  });
//---------------------------------------------------------------------------------------------------------
document
  .getElementById("orientacao-fzxo")
  .addEventListener("mouseenter", function () {
    fraquezas.style.boxShadow = "0px 0px 7px -1px rgb(0 0 0 / 20%)";
    fraquezas.style.borderRadius = "10px";
    fraquezas.style.transform = "perspective(1000px) scale(1.02)";
    fraquezas.style.marginBottom = "5px";
    forcas.style.opacity = "0.4";
    ameacas.style.opacity = "0.4";

    oportunidades.style.boxShadow = "0px 0px 7px -1px rgb(0 0 0 / 20%)";
    oportunidades.style.borderRadius = "10px";
    oportunidades.style.transform = "perspective(1000px) scale(1.02)";
    oportunidades.style.marginTop = "5px";
  });

document
  .getElementById("orientacao-fzxo")
  .addEventListener("mouseout", function () {
    fraquezas.style.boxShadow = "none";
    fraquezas.style.borderRadius = "0px";
    fraquezas.style.transform = "perspective(1000px) scale(1)";
    fraquezas.style.marginBottom = "0px";
    forcas.style.opacity = "1";
    ameacas.style.opacity = "1";

    oportunidades.style.boxShadow = "none";
    oportunidades.style.borderRadius = "0px";
    oportunidades.style.transform = "perspective(1000px) scale(1)";
    oportunidades.style.marginTop = "0px";
  });
//---------------------------------------------------------------------------------------------------------
document
  .getElementById("orientacao-fzxa")
  .addEventListener("mouseenter", function () {
    fraquezas.style.boxShadow = "0px 0px 7px -1px rgb(0 0 0 / 20%)";
    fraquezas.style.borderRadius = "10px";
    fraquezas.style.transform = "perspective(1000px) scale(1.02)";
    fraquezas.style.marginBottom = "5px";
    forcas.style.opacity = "0.4";
    oportunidades.style.opacity = "0.4";

    ameacas.style.boxShadow = "0px 0px 7px -1px rgb(0 0 0 / 20%)";
    ameacas.style.borderRadius = "10px";
    ameacas.style.transform = "perspective(1000px) scale(1.02)";
    ameacas.style.marginTop = "5px";
  });

document
  .getElementById("orientacao-fzxa")
  .addEventListener("mouseout", function () {
    fraquezas.style.boxShadow = "none";
    fraquezas.style.borderRadius = "0px";
    fraquezas.style.transform = "perspective(1000px) scale(1)";
    fraquezas.style.marginBottom = "0px";
    forcas.style.opacity = "1";
    oportunidades.style.opacity = "1";

    ameacas.style.boxShadow = "none";
    ameacas.style.borderRadius = "0px";
    ameacas.style.transform = "perspective(1000px) scale(1)";
    ameacas.style.marginTop = "0px";
  });

const IniciarAnalise = function () {
  // redireciona o usuario para página de analise
  let popup = function () {
    abrirjanela(
      "blue",
      "Tudo bem, redirecionando para página de análise",
      "Análise não realizada",
      "carregar"
    );
    document.getElementById("asdf_cancelar").style.display = "none";
  };
  let redirecionar = function () {
    window.location.href = "assets/php/enviar?analise=true";
  };

  setTimeout(popup, 1500);

  setTimeout(redirecionar, 6000);
};

const CancelarAnalise = function () {
  // redireciona o usuario para página inicial
  let popup = function () {
    abrirjanela(
      "blue",
      "Redirecionando para página do usuário",
      "Análise não realizada",
      "carregar"
    );
    document.getElementById("asdf_cancelar").style.display = "none";
  };
  let redirecionar = function () {
    window.location.href = "../usuario";
  };

  setTimeout(popup, 1500);
  setTimeout(redirecionar, 6000);
};

function erro() {
  // leva o usuario para página de login devido ao erro de sincronização
  document
    .getElementById("asdf_cancelar")
    .addEventListener("click", function () {
      window.location.href = "../../Login/login";
    });
  document.getElementById("asdf_cancelar").click();
}

function limparURL(url) {
  // tira o disparador de popup da url, limpando-a
  let nextURL = window.location.href.replace(url, "").replace("?", "");
  let nextState = { additionalInformation: "Updated the URL with JS" };
  window.history.replaceState(nextState, "Perfil", nextURL);
}

switch (true) {
  case window.location.href.includes(md5("erro=true")): // erro de conta
    abrirjanela(
      "red",
      "Erro inesperado!<br>Por favor, faça login novamente.",
      "Conta não sincronizada",
      "falha"
    );
    document.getElementsByClassName("content")[0].style.display = "none";
    document.getElementById("asdf_cancelar").style.display = "none";
    setTimeout(erro, 3000);
    limparURL(md5("erro=true"));
    break;

  case window.location.href.includes(md5("sucesso=true")):
    abrirjanela(
      "green",
      "Dados alterados com êxito.",
      "Alteração realizada com sucesso",
      "sucesso"
    );
    limparURL(md5("sucesso=true"));
    break;

  case window.location.href.includes(md5("sucesso=false")): // janela de erro na realização da análise
    abrirjanela(
      "red",
      "Parece que houve um erro durante o processamento de dados.<br>Por favor, tente novamente mais tarde ou entre em contato conosco.",
      "Análise não concluída",
      "falha"
    );
    document
      .getElementById("asdf_cancelar")
      .addEventListener("click", CancelarAnalise);
    limparURL(md5("sucesso=false"));
    break;

  case window.location.href.includes(md5("analise=false")): // pergunta ao usuário se deseja iniciar a análise ou se prefere fazer depois
    CriarAnalise();
    limparURL(md5("analise=false"));
    break;
}

function sair() {
  localStorage.clear();
  window.location.href = "../../index";
}

function fechar_menu() {
  document.getElementsByTagName("html")[0].classList.remove("nav-open");
  document.getElementsByClassName("close-layer")[0].classList.add("none");
}
