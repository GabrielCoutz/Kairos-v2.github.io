const nome = document.getElementById("nome");
const email = document.getElementById("email");
const captcha = document.getElementById("captcha");

switch (true) {
  case verificarURL(cripto("captcha=false")):
    abrirPopUp({
      cor: "red",
      corpo:
        "Possível Fraude detectada! Por favor, insira as informações novamente.",
      titulo: "Erro no CAPTCHA",
      icone: "falha",
    });
    limparURL(cripto("captcha=false"));
    break;

  case verificarURL(cripto("conta=false")):
    abrirPopUp({
      cor: "red",
      corpo:
        "Sua conta não foi localizada! Por favor, verifique se os dados estão escritos corretamente.",
      titulo: "Recuperação de Conta",
      icone: "falha",
    });
    limparURL(cripto("conta=false"));

    nome.classList.add("vermei");
    email.classList.add("vermei");
    break;
  default:
    break;
}

function validar() {
  if (vazio(nome.value)) {
    alertaDeErro(nome, "Por favor, preencha o nome!");
    dispararEvento(nome, "keyup", "condicaoVazio");
  } else if (!validarEmail(email.value)) {
    dispararEvento(email, "keyup", "condicaoEmail");
    alertaDeErro(email, "Por favor, insira o email corretamente!");
    //   } else if (grecaptcha.getResponse() == "") {
    //     dispararEvento(captcha, "keyup", "condicaoCaptcha");
    //     alertaDeErro(captcha, "Por favor, preencha o CAPTCHA!");
  } else {
    abrirPopUp({
      cor: "blue",
      corpo: "Validando Dados",
      titulo: "Recuperação de Conta",
      icone: "carregar",
      semBotoes: true,
      bgFechar: false,
    });
    setTimeout(enviar, 3000);
  }
}
