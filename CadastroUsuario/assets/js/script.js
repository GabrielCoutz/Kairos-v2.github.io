const nome = document.getElementById("nome");
const email = document.getElementById("email");
const senha = document.getElementById("senha");
const confirm_senha = document.getElementById("confirm_senha");
const captcha = document.getElementById("captcha");

switch (
  true // verifica se há erros passados na URL
) {
  case verificarURL(cripto("erro=true")): //erro no captcha
    abrirPopUp({
      cor: "red",
      corpo:
        "Possível Fraude detectada! Por favor, insira as informações novamente.",
      titulo: "Erro no CAPTCHA",
      icone: "falha",
    });
    limparURL(cripto("erro=true"));
    break;

  case verificarURL(cripto("email=false")): //email já cadastrado
    email.classList.add("vermei");
    nome.value = localStorage.getItem(nome.id);
    abrirPopUp({
      cor: "red",
      corpo: "Email já utilizado!",
      titulo: "Dados Duplicados",
      icone: "falha",
    });
    limparURL(cripto("email=false"));
    break;
}

function validar() {
  limpar_inputs();

  if (vazio(nome.value)) {
    dispararEvento(nome, "keyup", "condicaoVazio");
    alertaDeErro(nome, "Insira apenas letras!");
  } else if (!validarEmail(email.value)) {
    dispararEvento(email, "keyup", "condicaoEmail");
    alertaDeErro(email, "Insira o email corretamente!");
  } else if (
    senha.value != confirm_senha.value ||
    vazio(senha.value) ||
    vazio(confirm_senha.value)
  ) {
    alertaDeErro(senha, "Senhas não coincidem. Por favor, verifique-as!");
    senha.classList.add("vermei");
    confirm_senha.classList.add("vermei");
    senha.value = "";
    confirm_senha.value = "";
    // } else if (grecaptcha.getResponse() == "") {
    //   alertaDeErro(captcha, "Preencha o CAPTCHA!");
  } else {
    localStorage.setItem(nome.id, nome.value);
    abrirPopUp({
      cor: "blue",
      corpo: "Validando Dados",
      titulo: "Andamento Cadastro",
      icone: "carregar",
      semBotoes: true,
      bgFechar: false,
    });
    setTimeout(enviar, 4000);
  }
}
