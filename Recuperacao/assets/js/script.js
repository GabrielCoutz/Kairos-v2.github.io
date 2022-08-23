const nome = document.getElementById("nome");
const email = document.getElementById("email");
const captcha = document.getElementById("captcha");

switch (true) {
  case verificarURL(md5("captcha=false")):
    abrirjanela({
      cor: "red",
      corpo:
        "Possível Fraude detectada! Por favor, insira as informações novamente.",
      titulo: "Erro no CAPTCHA",
      icone: "falha",
    });
    limparURL(md5("captcha=false"));
    break;

  case verificarURL(md5("conta=false")):
    abrirjanela({
      cor: "red",
      corpo:
        "Sua conta não foi localizada! Por favor, verifique se os dados estão escritos corretamente.",
      titulo: "Recuperação de Conta",
      icone: "falha",
    });
    limparURL(md5("conta=false"));

    nome.classList.add("vermei");
    email.classList.add("vermei");
    break;
}

function validar() {
  if (vazio(nome.value)) {
    alertaDeErro(nome, "Por favor, insira um nome válido!");
    dispararEvento(nome, "keyup", "condicaoVazio");
  } else if (!validarEmail(email.value)) {
    dispararEvento(email, "keyup", "condicaoEmail");
    alertaDeErro(email, "Por favor, insira um email válido!");
    //   } else if (grecaptcha.getResponse() == "") {
    //     dispararEvento(captcha, "keyup", "condicaoCaptcha");
    //     alertaDeErro(captcha, "Por favor, preencha o CAPTCHA!");
  } else {
    abrirjanela({
      cor: "blue",
      corpo: "Validando Dados",
      titulo: "Recuperação de Conta",
      icone: "carregar",
    });
    setTimeout(enviar, 3000);
  }
}
