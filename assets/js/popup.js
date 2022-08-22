let janelaPopUp = new Object();
let colors = "colors= 'primary:#121331,secondary:#16c72e' ";
let src = "";

janelaPopUp.abre = function (param) {
  console.log(param);
  switch (
    true // determina qual ícone aparecerá no popup de acordo com a string passada no parametro icone
  ) {
    case param.icone === "plano":
      src = "https://cdn.lordicon.com/qhviklyi.json";
      break;
    case param.icone === "sucesso":
      src = "https://cdn.lordicon.com/lupuorrc.json";
      break;
    case param.icone === "falha":
      src = "https://cdn.lordicon.com/tdrtiskw.json";
      colors = "colors= 'primary:#c71f16,secondary:#000000' ";
      break;
    case param.icone === "carregar":
      src = "https://cdn.lordicon.com/dpinvufc.json";
      delay = "delay = '10' ";
      colors = "colors='primary:#4E6EF1,secondary:#4E6EF1' ";
      break;
    case param.icone === "encontrado":
      src = "https://cdn.lordicon.com/msoeawqm.json";
      break;
    case param.icone === "marketing":
      src = "https://cdn.lordicon.com/gqdnbnwt.json";
      break;
  }
  let popFundo2 = document.createElement("div");
  popFundo2.setAttribute("class", "popUpFundo " + param.cor);

  let janela2 = document.createElement("div");
  janela2.setAttribute("id", "popUp");
  janela2.setAttribute("class", "popUp " + param.cor);

  let h1 = document.createElement("h1");
  h1.append(param.titulo);
  janela2.append(h1);
  popFundo2.appendChild(janela2);

  let lord_icon = document.createElement("lord-icon");
  lord_icon.setAttribute("src", src);
  lord_icon.setAttribute("trigger", "loop");
  lord_icon.setAttribute("delay", "1000");
  lord_icon.setAttribute("colors", colors);
  lord_icon.setAttribute("style", "width:46px;height:46px");

  janela2.appendChild(lord_icon);

  let span = document.createElement("span");

  if (param.mudarPlanos === true) {
    let item1 = document.createElement("span");
    item1.innerHTML = param.planoAtual;

    let item2 = document.createElement("span");
    item2.innerHTML = param.planoMudanca;

    item1.setAttribute("class", "enfase-plano");
    item2.setAttribute("class", "enfase-plano");

    span.append("Você está prestes a mudar do plano ");
    span.append(item1);
    span.append(" para ");
    span.append(item2);
    param.corpo = "!";
  }

  span.append(param.corpo);

  janela2.appendChild(span);

  if (!param.semBotoes) {
    // se 'semBotoes' for true, esse bloco, que adiciona os botões, não é executado
    let botaoCancelar = document.createElement("button");
    botaoCancelar.setAttribute("id", "popUpEnviar");
    botaoCancelar.setAttribute("class", "secundario btn");
    botaoCancelar.append("Cancelar");

    let botaoOk = document.createElement("button");
    botaoOk.setAttribute("id", "popUpCancelar");
    botaoOk.setAttribute("class", "secundario btn");
    botaoOk.append("Ok");

    janela2.append(botaoCancelar);
    janela2.append(botaoOk);
  }

  $("body").append(popFundo2);
  $("body").append(janela2);

  $(".popUpFundo").fadeIn("fast");
  $("#popUp").addClass("popUpEntrada");

  if (param.cadastrarEmpresa === true) {
    esperar({
      url: "../../CadastroEmpresa/cadastro_empresa",
      delay: 3000,
    });
  } else if (param.cadastrarEmpresa === false) {
    esperar({
      url: "../usuario",
      delay: 3000,
    });
  }

  if (param.realizarAnalise === true) {
    esperar({
      url: "../ColetarDados/coletar",
      delay: 3000,
    });
  } else if (param.realizarAnalise === false) {
    esperar({
      url: "../Perfil/usuario",
      delay: 3000,
    });
  }

  if (param.abrirEmpresa) {
    document.getElementById("popUpEnviar").innerHTML = "Sim, gostaria";
    document.getElementById("popUpEnviar");
    document.getElementById("popUpEnviar").style.display = "block";
    document.getElementById("popUpEnviar").classList.remove("secundario");
    document.getElementById("popUpEnviar").classList.add("primario");

    document.getElementById("popUpCancelar").innerHTML =
      "Não, talvez mais tarde";
    document.getElementById("popUpCancelar").style.order = "2";

    document
      .getElementById("popUpEnviar")
      .addEventListener("click", function () {
        janelaPopUp.fecha();
        setTimeout(() => {
          abrirjanela({
            cor: "blue",
            corpo: "Tudo bem, redirecionando para página de cadastro",
            titulo: "Empresa não cadastrada",
            icone: "carregar",
            semBotoes: true,
            cadastrarEmpresa: true,
          });
        }, 2000);
      });

    document
      .getElementById("popUpCancelar")
      .addEventListener("click", function () {
        janelaPopUp.fecha();
        setTimeout(() => {
          abrirjanela({
            cor: "blue",
            corpo: "Tudo bem, estamos te tirando daqui",
            titulo: "Empresa não cadastrada",
            icone: "carregar",
            semBotoes: true,
            cadastrarEmpresa: false,
          });
        }, 2000);
      });
    return;
  }

  if (param.analise) {
    document.getElementById("popUpEnviar").innerHTML = "Sim, gostaria";
    document.getElementById("popUpEnviar").classList.remove("secundario");
    document.getElementById("popUpEnviar").classList.add("primario");
    document.getElementById("popUpCancelar").innerHTML = "Não, talvez depois";

    document
      .getElementById("popUpEnviar")
      .addEventListener("click", function () {
        janelaPopUp.fecha();
        setTimeout(() => {
          abrirjanela({
            cor: "blue",
            corpo: "Tudo bem, redirecionando para página de análise",
            titulo: "Análise não realizada",
            icone: "carregar",
            semBotoes: true,
            realizarAnalise: true,
          });
        }, 2000);
      });
    document
      .getElementById("popUpCancelar")
      .addEventListener("click", function () {
        janelaPopUp.fecha();
        setTimeout(() => {
          abrirjanela({
            cor: "blue",
            corpo: "Tudo bem, estamos te tirando daqui",
            titulo: "Análise não realizada",
            icone: "carregar",
            semBotoes: true,
            realizarAnalise: false,
          });
        }, 2000);
      });
    return;
  }

  $("#popUpCancelar").on("click", function () {
    janelaPopUp.fecha();
  });

  if (
    param.icone != "carregar" &&
    param.icone != "marketing" &&
    !param.cadastrarEmpresa
  ) {
    $(".popUpFundo").on("click", function () {
      janelaPopUp.fecha();
    });
  }

  $("#popUpEnviar").on("click", function () {
    janelaPopUp.fecha();
  });
};

janelaPopUp.fecha = function () {
  $(".popUp").removeClass("popUpEntrada").addClass("popUpSaida");

  $(".popUpFundo").fadeOut(1000, function () {
    $(".popUpFundo").remove();
    $("#popUp").remove();
  });
};

function abrirjanela(params) {
  janelaPopUp.abre(params);
}

function abrirJanelaMarketing() {
  img = ' <img src="assets/img/teste2.png" id="img"> ';
  janelaPopUp.abre(
    "asdf",
    "p" + " " + "blue" + " " + "alert",
    "Faça sua análise hoje mesmo!",
    "Sabia que você pode impulsionar sua gestão de marketing com alguns clicks?"
  );
  document.getElementById("asdf_cancelar").innerHTML = "Realizar Agora";
  $("#asdf").append(
    '<div id="esqueci" >' +
      '<a href="#" style="text-align: center;cursor: pointer; display: block; font-weight: bold; font-family: ' +
      "'San Francisco'" +
      ' !important; font-size: 15px; color: #4e6ef1 !important;"> Talvez, depois </a>' +
      "</div>"
  );
  document.getElementById("asdf").classList.add("marketing");
  Cookies.set(md5("analise"), md5("true"));

  document
    .getElementById("asdf_cancelar")
    .addEventListener("click", function () {
      //BTN - Realizar Agora
      window.location.href = "AnaliseMarketing/ColetarDados/ColetadeDados";
    });
  document.getElementById("esqueci").addEventListener("click", function () {
    //BTN - Talvez, depois
    janelaPopUp.fecha("asdf");
  });
}

function abrirJanelaPlanos(plano_mudanca, plano_atual) {
  abrirjanela({
    cor: "blue",
    titulo: "Mudança de Planos",
    mudarPlanos: true,
    planoAtual: plano_atual,
    planoMudanca: plano_mudanca,
    icone: "plano",
  });
  document.getElementById("popUpEnviar").innerHTML = "Sim, desejo mudar";
  document.getElementById("popUpEnviar").classList.remove("secundario");
  document.getElementById("popUpEnviar").classList.add("primario");
  document.getElementById("popUpCancelar").innerHTML = "Não, talvez depois";

  document.getElementById("popUpEnviar").addEventListener("click", function () {
    janelaPopUp.fecha();
    window.location.href =
      "../CadastroCartao/cadastro_cartao?plano=" +
      plano_mudanca +
      "&alterar-plano=true";
  });
}

if (verificarURL(md5("sucesso=false"))) {
  abrirjanela({
    cor: "red",
    corpo:
      "Não foi possível realizar a operação solicitada. Por favor, tente novamente ou entre em contato conosco.",
    titulo: "Erro inesperado",
    icone: "falha",
  });
  limparURL(md5("sucesso=false"));
}

function erroSincronizacao(url) {
  abrirjanela({
    cor: "red",
    corpo: "Erro inesperado! Por favor, faça login novamente.",
    titulo: "Conta não sincronizada",
    icone: "falha",
    semBotoes: true,
  });
  esperar({
    url: url,
    delay: 3000,
  });
}
