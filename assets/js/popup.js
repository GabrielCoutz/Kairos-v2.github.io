// Código usado para popups, usando a função abrirjanela(cor, texto, titulo, icone)
let janelaPopUp = new Object();
let icone = "";
let img = "";

janelaPopUp.abre = function (
  id,
  classes,
  titulo,
  corpo,
  functionCancelar,
  functionEnviar,
  textoCancelar,
  textoEnviar
) {
  classes += " ";
  let classArray = classes.split(" ");
  classes = "";
  let classesFundo = "";
  let classBot = "";
  $.each(classArray, function (index, value) {
    switch (value) {
      case "alert":
        break;
      case "blue":
        classesFundo += this + " ";
        break;
      case "green":
        classesFundo += this + " ";
        break;
      case "red":
        classesFundo += this + " ";
        break;
      default:
        classes += this + " ";
        break;
    }
  });

  let src = "https://cdn.lordicon.com/gqdnbnwt.json";
  let colors = "";

  switch (
    true // determina qual ícone aparecerá no popup de acordo com a string passada na variável 'icone'
  ) {
    case icone == "sucesso":
      src = "https://cdn.lordicon.com/lupuorrc.json";
      colors = "colors= 'primary:#121331,secondary:#16c72e' ";
      break;
    case icone == "falha":
      src = "https://cdn.lordicon.com/tdrtiskw.json";
      colors = "colors= 'primary:#c71f16,secondary:#000000' ";
      break;
    case icone == "carregar":
      src = "https://cdn.lordicon.com/dpinvufc.json";
      delay = "delay = '10' ";
      colors = "  colors='primary:#4E6EF1,secondary:#4E6EF1' ";
      break;
    case icone == "encontrado":
      src = "https://cdn.lordicon.com/msoeawqm.json";
      break;
  }
  let popFundo2 = document.createElement("div");
  popFundo2.setAttribute("class", "popUpFundo " + classesFundo);

  let janela2 = document.createElement("div");
  janela2.setAttribute("id", "popUp");
  janela2.setAttribute("class", "popUp " + classes);

  let h1 = document.createElement("h1");
  h1.append(titulo);
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

  span.append(corpo);

  janela2.appendChild(span);

  let botaoOk = document.createElement("button");
  botaoOk.setAttribute("id", "popUpCancelar");
  botaoOk.setAttribute("class", "secundario btn");

  let botaoCancelar = document.createElement("button");
  botaoCancelar.setAttribute("id", "popUpEnviar");
  botaoCancelar.setAttribute("class", "secundario btn");

  botaoOk.append("ok");
  botaoCancelar.append("cancelar");

  janela2.append(botaoOk);
  janela2.append(botaoCancelar);

  $("body").append(popFundo2);
  $("body").append(janela2);

  //alert(janela);
  $(".popFundo").fadeIn("fast");
  $("#popUp").addClass("popUpEntrada");

  $("#popUpCancelar").on("click", function () {
    if (functionCancelar !== undefined && functionCancelar !== "") {
      functionCancelar();
    } else {
      janelaPopUp.fecha(id);
    }
  });

  if (icone != "carregar") {
    $("#popFundo").on("click", function () {
      if (functionCancelar !== undefined && functionCancelar !== "") {
        functionCancelar();
      } else {
        janelaPopUp.fecha();
      }
    });
  }

  $("#popUpEnviar").on("click", function () {
    if (functionEnviar !== undefined && functionEnviar !== "") {
      functionEnviar();
    } else {
      janelaPopUp.fecha();
    }
  });
};

janelaPopUp.fecha = function () {
  $(".popUp").removeClass("popUpEntrada").addClass("popUpSaida");

  $(".popUpFundo").fadeOut(1000, function () {
    $(".popUpFundo").remove();
    $("#popUp").remove();
  });
};

function abrirjanela(cor, texto, titulo, trigger) {
  // trigger é usado para sinalizar qual ícone vai ser usado
  icone = trigger;
  img = "";
  janelaPopUp.abre("asdf", "p" + " " + cor + " " + "alert", titulo, texto);
  if (icone == "carregar") {
    document.getElementById("popUpCancelar").style.display = "none";
  }
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

function abrirJanelaPlanos(plano_mudança, plano_atual) {
  img = "";
  janelaPopUp.abre(
    "asdf",
    "p" + " " + "blue" + " " + "alert",
    "Mudança de Planos",
    "Você está prestes a mudar seu plano de <text>" +
      plano_atual +
      "</text>  para <text>" +
      plano_mudança +
      "</text><br>Deseja completar a mudança?"
  );
  document.getElementById("asdf_cancelar").innerHTML = "Sim, desejo mudar";
  $("#asdf").append(
    '<div id="esqueci" >' + '<a href="#"> Não, mudei de ideia </a>' + "</div>"
  );
  document.getElementById("asdf").classList.add("plano");

  document
    .getElementById("asdf_cancelar")
    .addEventListener("click", function () {
      //BTN - Sim, desejo mudar
      window.location.href =
        "../CadastroCartao/assets/php/enviar_cartao?alterar_plano=true&assinatura=" +
        plano_mudança;
    });

  document.getElementById("esqueci").addEventListener("click", function () {
    // BTN - Não, mudei de ideia
    janelaPopUp.fecha("asdf");

    let abrir = function () {
      setTimeout(
        abrirjanela(
          "blue",
          "Sem problemas, redirecionando para seu perfil",
          "Mudança de Planos",
          "carregar"
        ),
        3000
      );
      document.getElementById("asdf_cancelar").style.display = "none";
    };
    let redirecionar = function () {
      window.location.href = "../Perfil/usuario";
    };

    setTimeout(abrir, 2500);
    setTimeout(redirecionar, 6000);
  });
}
