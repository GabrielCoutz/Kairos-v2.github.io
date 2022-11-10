const janelaPopUp = {};
let colors = "primary:#121331,secondary:#16c72e";
let src;
let delay = "";

function abrirPopUp(params) {
  janelaPopUp.abre(params);
  document.getElementById("popUp").focus();
}

janelaPopUp.abre = (param) => {
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
      colors = "primary:#c71f16,secondary:#000000";
      break;
    case param.icone === "carregar":
      src = "https://cdn.lordicon.com/dpinvufc.json";
      delay = "10";
      colors = "primary:#4E6EF1,secondary:#4E6EF1";
      break;
    case param.icone === "encontrado":
      src = "https://cdn.lordicon.com/msoeawqm.json";
      delay = "1000";
      break;
    case param.icone === "marketing":
      src = "https://cdn.lordicon.com/gqdnbnwt.json";
      break;
    default:
      break;
  }
  const popFundo2 = document.createElement("div");
  popFundo2.setAttribute("class", `popUpFundo ${param.cor}`);

  const janela2 = document.createElement("div");
  janela2.setAttribute("id", "popUp");
  janela2.setAttribute("class", `popUp p ${param.cor}`);
  janela2.setAttribute("role", "alert");
  janela2.setAttribute("aria-labelledby", "popUp-titulo");
  janela2.setAttribute("tabindex", "0");

  const lordIcon = document.createElement("lord-icon");
  lordIcon.setAttribute("src", src);
  lordIcon.setAttribute("trigger", "loop");
  lordIcon.setAttribute("delay", delay);
  lordIcon.setAttribute("colors", colors);
  lordIcon.setAttribute("style", "width:82px;height:82px");

  const h1 = document.createElement("h1");

  !param.icone ? (h1.style.marginTop = "0px") : janela2.appendChild(lordIcon);

  h1.append(param.titulo);
  janela2.append(h1);
  popFundo2.appendChild(janela2);

  const span = document.createElement("span");

  if (param.mudarPlanos === true) {
    const item1 = document.createElement("span");
    item1.innerHTML = param.planoAtual;

    const item2 = document.createElement("span");
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
    const botaoCancelar = document.createElement("button");
    botaoCancelar.setAttribute("id", "popUpEnviar");
    botaoCancelar.setAttribute("class", "secundario btn");
    botaoCancelar.append("Cancelar");

    const botaoOk = document.createElement("button");
    botaoOk.setAttribute("id", "popUpCancelar");
    botaoOk.setAttribute("class", "secundario btn");
    botaoOk.append("Ok");

    janela2.append(botaoCancelar);
    janela2.append(botaoOk);
  }

  const elementoPai = document.querySelector("header");

  try {
    const container = document.body;
    container.insertBefore(popFundo2, elementoPai);
    container.insertBefore(janela2, elementoPai);
  } catch (error) {
    const container = document.querySelector(".principal");
    container.insertBefore(popFundo2, elementoPai);
    container.insertBefore(janela2, elementoPai);
  }

  $(".popUpFundo").fadeIn("fast");
  $("#popUp").addClass("popUpEntrada");

  if (param.marketing === true) {
    document.getElementById("popUpEnviar").innerText = "Impulsionar Agora";
    document
      .getElementById("popUpEnviar")
      .classList.replace("secundario", "primario");
    document.getElementById("popUpCancelar").innerText = "Talvez depois";

    document.getElementById("popUpEnviar").addEventListener("click", () => {
      janelaPopUp.fecha();
      setTimeout(() => {
        abrirPopUp({
          cor: "blue",
          titulo: "Análise de Marketing",
          corpo:
            "Boa escolha! Te levaremos para realizar uma análise agora mesmo.",
          icone: "marketing",
          semBotoes: true,
          bgFechar: false,
        });
        esperar({
          url: "../AnaliseMarketing/ColetarDados/coletar",
          delay: 3000,
        });
      }, 2000);
    });
  }

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
      url: "../AnaliseMarketing/ColetarDados/coletar",
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
    document
      .getElementById("popUpEnviar")
      .classList.replace("secundario", "primario");

    document.getElementById("popUpCancelar").innerHTML =
      "Não, talvez mais tarde";
    document.getElementById("popUpCancelar").style.order = "2";

    document.getElementById("popUpEnviar").addEventListener("click", () => {
      janelaPopUp.fecha();
      setTimeout(() => {
        abrirPopUp({
          cor: "blue",
          corpo: "Tudo bem, redirecionando para página de cadastro",
          titulo: "Empresa não cadastrada",
          icone: "carregar",
          semBotoes: true,
          cadastrarEmpresa: true,
          bgFechar: false,
        });
      }, 2000);
    });

    document.getElementById("popUpCancelar").addEventListener("click", () => {
      janelaPopUp.fecha();
      setTimeout(() => {
        abrirPopUp({
          cor: "blue",
          corpo: "Tudo bem, estamos te tirando daqui",
          titulo: "Empresa não cadastrada",
          icone: "carregar",
          semBotoes: true,
          cadastrarEmpresa: false,
          bgFechar: false,
        });
      }, 2000);
    });
    return;
  }

  if (param.analise) {
    document.getElementById("popUpEnviar").innerText = "Sim, gostaria";
    document
      .getElementById("popUpEnviar")
      .classList.replace("secundario", "primario");
    document.querySelector("#popUp").style.maxHeight = "290px";
    document.getElementById("popUpCancelar").innerText = "Não, talvez depois";

    document.getElementById("popUpEnviar").addEventListener("click", () => {
      janelaPopUp.fecha();
      setTimeout(() => {
        abrirPopUp({
          cor: "blue",
          corpo: "Tudo bem, redirecionando para página de análise",
          titulo: "Análise não realizada",
          icone: "carregar",
          semBotoes: true,
          realizarAnalise: true,
          bgFechar: false,
        });
      }, 2000);
    });
    document.getElementById("popUpCancelar").addEventListener("click", () => {
      janelaPopUp.fecha();
      setTimeout(() => {
        abrirPopUp({
          cor: "blue",
          corpo: "Tudo bem, estamos te tirando daqui",
          titulo: "Análise não realizada",
          icone: "carregar",
          semBotoes: true,
          realizarAnalise: false,
          bgFechar: false,
        });
      }, 2000);
    });
    return;
  }

  $("#popUpCancelar").on("click", () => {
    janelaPopUp.fecha();
  });

  $("#popUpEnviar").on("click", () => {
    janelaPopUp.fecha();
  });

  if (param.bgFechar !== false) {
    $(".popUpFundo").on("click", () => {
      janelaPopUp.fecha();
    });
    $(document).keyup((e) => {
      if (e.key === "Escape") {
        janelaPopUp.fecha();
      }
    });
  }
};

janelaPopUp.fecha = () => {
  $(".popUp").removeClass("popUpEntrada").addClass("popUpSaida");

  $(".popUpFundo").fadeOut(1000, () => {
    $(".popUpFundo").remove();
    $("#popUp").remove();
  });
};

function abrirJanelaPlanos(planoMudanca, planoAtual) {
  abrirPopUp({
    cor: "blue",
    titulo: "Mudança de Planos",
    mudarPlanos: true,
    planoAtual,
    planoMudanca,
    icone: "plano",
  });
  document.getElementById("popUpEnviar").innerHTML = "Sim, desejo mudar";
  document
    .getElementById("popUpEnviar")
    .classList.replace("secundario", "primario");
  document.getElementById("popUpCancelar").innerHTML = "Não, talvez depois";

  document.getElementById("popUpEnviar").addEventListener("click", () => {
    janelaPopUp.fecha();
    window.location.href = `../CadastroCartao/cadastro_cartao?plano=${planoMudanca}&alterar-plano=true`;
  });
}

switch (true) {
  case verificarURL(cripto("sucesso=false")):
    abrirPopUp({
      cor: "red",
      corpo:
        "Não foi possível realizar a operação solicitada. Por favor, tente novamente ou entre em contato conosco.",
      titulo: "Erro inesperado",
      icone: "falha",
    });
    limparURL(cripto("sucesso=false"));
    break;
  case verificarURL(cripto("sucesso=true")):
    abrirPopUp({
      cor: "green",
      corpo: "Dados alterados com êxito.",
      titulo: "Alteração realizada com sucesso",
      icone: "sucesso",
    });
    limparURL(cripto("sucesso=true"));
    break;
  case verificarURL(cripto("cadastro=true")):
    abrirPopUp({
      cor: "green",
      corpo: "Dados registrados com êxito.",
      titulo: "Cadastro realizado com sucesso",
      icone: "sucesso",
    });
    limparURL(cripto("cadastro=true"));
    break;
  default:
    break;
}

function erroSincronizacao(url) {
  abrirPopUp({
    cor: "red",
    corpo: "Erro inesperado! Por favor, faça login novamente.",
    titulo: "Conta não sincronizada",
    icone: "falha",
    semBotoes: true,
    bgFechar: false,
  });
  esperar({
    url,
    delay: 3000,
  });
}
