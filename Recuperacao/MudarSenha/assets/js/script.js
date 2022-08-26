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
}

const senha_nova = document.getElementById("senha_nova");
const senha_nova_dup = document.getElementById("senha_nova_dup");

function validar() {
  limpar_inputs();
  if (vazio(senha_nova.value) || vazio(senha_nova_dup.value)) {
    alertaDeErro(senha_nova, "Por favor, preencha as senhas!");
    senha_nova.classList.add("vermei");
    senha_nova_dup.classList.add("vermei");
    document
      .getElementById(senha_nova_dup.getAttribute("aria-controls"))
      .classList.add("alerta-ativo");
  } else if (senha_nova.value != senha_nova_dup.value) {
    alertaDeErro(
      senha_nova,
      "Senhas não coincidem! Verifique-as e tente novamente"
    );
    senha_nova.classList.add("vermei");
    senha_nova_dup.classList.add("vermei");
    document
      .getElementById(senha_nova_dup.getAttribute("aria-controls"))
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
    setTimeout(enviar, 3000);
  }
}
