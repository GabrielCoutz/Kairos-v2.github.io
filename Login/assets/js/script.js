const email = document.getElementById("email");
const senha = document.getElementById("senha");

switch (true) {
  case verificarURL(md5("login=false")):
    abrirjanela(
      "red",
      "Credenciais incorretas!<br>Por favor, verifique os dados inseridos!",
      "Falha no login",
      "falha"
    );
    limparURL(md5("login=false"));
    document.getElementById("email").classList.add("vermei");
    document.getElementById("senha").classList.add("vermei");
    break;

  case verificarURL(md5("sucesso=true")):
    abrirjanela(
      "green",
      "Dados cadastrados com sucesso!",
      "Cadastro",
      "sucesso"
    );
    limparURL(md5("sucesso=true"));
    break;

  case verificarURL(md5("sucesso_senha=true")):
    abrirjanela(
      "green",
      "Senha alterada com sucesso!",
      "Recuperação de Conta",
      "sucesso"
    );
    limparURL(md5("sucesso_senha=true"));
    break;

  case verificarURL(md5("sucesso=false")):
    abrirjanela(
      "red",
      "Não foi possível realizar a operação solicitada. Por favor, tente novamente ou entre em contato conosco.",
      "Erro inesperado",
      "falha"
    );
    limparURL(md5("sucesso=false"));
    break;
}

apagarCookie(md5("analise"));

function validar() {
  limpar_inputs();

  if (!validarEmail(email.value)) {
    alertaDeErro(email, "Insira um email válido!");
    dispararEvento(email, "keyup", "condicaoEmail");
  } else if (vazio(senha.value)) {
    alertaDeErro(senha, "Preencha a senha!");
    dispararEvento(senha, "keyup", "condicaoVazio");
  } else {
    localStorage.clear();
    abrirjanela("blue", "Aguarde", "Validando dados", "carregar");
    setTimeout(enviar, 4000);
  }
}