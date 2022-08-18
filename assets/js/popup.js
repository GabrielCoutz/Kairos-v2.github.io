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
  let cancelar = textoCancelar !== undefined ? textoCancelar : "OK";
  let enviar = textoEnviar !== undefined ? textoEnviar : "Send";
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
      case "green":
        classesFundo += this + " ";
      case "red":
        classesFundo += this + " ";
      default:
        classes += this + " ";
        break;
    }
  });

  let src = "";
  let trigger = "trigger='loop' ";
  let delay = "delay='1000' ";
  let colors = "";
  let style = "style= 'width:46px;height:46px'> ";

  switch (
    true // determina qual ícone aparecerá no popup de acordo com a string passada na variável 'icone'
  ) {
    case icone == "sucesso":
      src = "src='https://cdn.lordicon.com/lupuorrc.json' ";
      colors = "colors= 'primary:#121331,secondary:#16c72e' ";
      break;
    case icone == "falha":
      src = "src= 'https://cdn.lordicon.com/tdrtiskw.json' ";
      colors = "colors= 'primary:#c71f16,secondary:#000000' ";
      break;
    case icone == "carregar":
      src = "src= 'https://cdn.lordicon.com/dpinvufc.json' ";
      delay = "delay = '10' ";
      colors = "  colors='primary:#4E6EF1,secondary:#4E6EF1' ";
      break;
    case icone == "encontrado":
      src = "src='https://cdn.lordicon.com/msoeawqm.json' ";
      break;
  }

  let popFundo =
    '<div id="popFundo_' +
    id +
    '" class="popUpFundo ' +
    classesFundo +
    '"></div>';
  let janela =
    '<div id="' +
    id +
    '" class="popUp ' +
    classes +
    '">' +
    img +
    "<h1>" +
    titulo +
    "</h1>" +
    "<lord-icon " +
    src +
    trigger +
    delay +
    colors +
    style +
    "</lord-icon><span>" +
    corpo +
    "</span><button class='puCancelar btn secundario" +
    classBot +
    "' id='" +
    id +
    "_cancelar' data-parent=" +
    id +
    ">" +
    cancelar +
    "</button><button class='puEnviar btn primario" +
    classBot +
    "' data-parent=" +
    id +
    " id='" +
    id +
    "_enviar'>" +
    enviar +
    "</button></div>";

  $("body").append(popFundo);
  $("body").append(janela);
  $("body").append(popFundo);
  //alert(janela);
  $("#popFundo_" + id).fadeIn("fast");
  $("#" + id).addClass("popUpEntrada");

  $("#" + id + "_cancelar").on("click", function () {
    if (functionCancelar !== undefined && functionCancelar !== "") {
      functionCancelar();
    } else {
      janelaPopUp.fecha(id);
    }
  });

  if (icone != "carregar") {
    $("#popFundo_asdf").on("click", function () {
      if (functionCancelar !== undefined && functionCancelar !== "") {
        functionCancelar();
      } else {
        janelaPopUp.fecha(id);
      }
    });
  }

  $("#" + id + "_enviar").on("click", function () {
    if (functionEnviar !== undefined && functionEnviar !== "") {
      functionEnviar();
    } else {
      janelaPopUp.fecha(id);
    }
  });
};

janelaPopUp.fecha = function (id) {
  if (id !== undefined) {
    $("#" + id)
      .removeClass("popUpEntrada")
      .addClass("popUpSaida");

    $("#popFundo_" + id).fadeOut(1000, function () {
      $("#popFundo_" + id).remove();
      $("#" + $(this).attr("id") + ", #" + id).remove();
    });
  } else {
    $(".popUp").removeClass("popUpEntrada").addClass("popUpSaida");

    $(".popUpFundo").fadeOut(1000, function () {
      $(".popUpFundo").remove();
      $(".popUp").remove();
    });
  }
};

function abrirjanela(cor, texto, titulo, trigger) {
  // trigger é usado para sinalizar qual ícone vai ser usado
  icone = trigger;
  img = "";
  janelaPopUp.abre("asdf", "p" + " " + cor + " " + "alert", titulo, texto);
  if (icone == "carregar") {
    document.getElementById("asdf_cancelar").style.display = "none";
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
