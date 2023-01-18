switch (true) {
  case verificarURL(cripto("conta_encontrada=true")):
    abrirPopUp({
      cor: "green",
      corpo:
        "Sua conta foi localizada com sucesso! Agora basta inserir sua nova senha.",
      titulo: "Recuperação de Conta",
      icone: "encontrado",
    });
    limparURL(cripto("conta_encontrada=true"));
    break;

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

  case verificarURL(cripto("erro=true")):
    erroSincronizacao("../../index");
    break;
  default:
    break;
}

const senhaNova = document.getElementById("senha_nova");
const senhaNovaDup = document.getElementById("senha_nova_dup");

function validar() {
  limpar_inputs();
  if (vazio(senhaNova.value) || vazio(senhaNovaDup.value)) {
    alertaDeErro(senhaNova, "Por favor, preencha as senhas!");
    senhaNova.classList.add("vermei");
    senhaNovaDup.classList.add("vermei");
    document
      .getElementById(senhaNovaDup.getAttribute("aria-controls"))
      .classList.add("alerta-ativo");
  } else if (senhaNova.value !== senhaNovaDup.value) {
    alertaDeErro(
      senhaNova,
      "Senhas não coincidem! Verifique-as e tente novamente"
    );
    senhaNova.classList.add("vermei");
    senhaNovaDup.classList.add("vermei");
    document
      .getElementById(senhaNovaDup.getAttribute("aria-controls"))
      .classList.add("alerta-ativo");
  } else {
    abrirPopUp({
      cor: "blue",
      titulo: "Recuperando",
      corpo: "Aguarde só mais um pouquinho...",
      icone: "carregar",
      semBotoes: true,
      bgFechar: false,
    });
    setTimeout(() => {
      enviar();
      window.location.href = "../../Login/login.html";
    }, 4000);
  }
}
