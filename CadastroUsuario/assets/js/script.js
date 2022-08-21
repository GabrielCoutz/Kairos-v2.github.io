const nome = document.getElementById("nome");
const email = document.getElementById("email");
const senha = document.getElementById("senha");
const confirm_senha = document.getElementById("confirm_senha");
const captcha = document.getElementById("captcha");

switch (
  true // verifica se há erros passados na URL
) {
  case verificarURL(md5("erro=true")): //erro no captcha
    abrirjanela({
      cor: "red",
      corpo:
        "Possível Fraude detectada! Por favor, insira as informações novamente.",
      titulo: "Erro no CAPTCHA",
      icone: "falha",
    });
    limparURL(md5("erro=true"));
    break;

  case verificarURL(md5("email=false")): //email já cadastrado
    email.classList.add("vermei");
    nome.value = localStorage.getItem(nome.id);
    abrirjanela({
      cor: "red",
      corpo: "Email já utilizado!",
      titulo: "Dados Duplicados",
      icone: "falha",
    });
    limparURL(md5("email=false"));
    break;

  case verificarURL(md5("sucesso=false")):
    abrirjanela({
      cor: "red",
      corpo:
        "Não foi possível realizar a operação solicitada. Por favor, tente novamente ou entre em contato conosco.",
      titulo: "Erro inesperado",
      icone: "falha",
    });
    limparURL(md5("sucesso=false"));
    break;
}

function validar() {
  limpar_inputs();

  if (vazio(nome.value)) {
    dispararEvento(nome, "keyup", "condicaoVazio");
    alertaDeErro(nome, "Insira apenas letras!");
  } else if (!validarEmail(email.value)) {
    dispararEvento(email, "keyup", "condicaoEmail");
    alertaDeErro(email, "Insira um email válido!");
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
    abrirjanela({
      cor: "blue",
      corpo: "Validando Dados",
      titulo: "Andamento Cadastro",
      icone: "carregar",
    });
    setTimeout(enviar, 4000);
  }
}
