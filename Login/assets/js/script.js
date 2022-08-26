const email = document.getElementById("email");
const senha = document.getElementById("senha");

switch (true) {
  case verificarURL(cripto("login=false")):
    abrirPopUp({
      cor: "red",
      corpo: "Credenciais incorretas! Por favor, verifique os dados inseridos!",
      titulo: "Falha no login",
      icone: "falha",
    });
    limparURL(cripto("login=false"));
    document.getElementById("email").classList.add("vermei");
    document.getElementById("senha").classList.add("vermei");
    document.getElementById("email").classList.add("erro");
    document.getElementById("senha").classList.add("erro");
    break;

  case verificarURL(cripto("sucesso=true")):
    abrirPopUp({
      cor: "green",
      corpo: "Dados cadastrados com sucesso!",
      titulo: "Cadastro",
      icone: "sucesso",
    });
    limparURL(cripto("sucesso=true"));
    break;

  case verificarURL(cripto("sucesso_senha=true")):
    abrirPopUp({
      cor: "green",
      corpo: "Senha alterada com sucesso!",
      titulo: "Recuperação de Conta",
      icone: "sucesso",
    });
    limparURL(cripto("sucesso_senha=true"));
    break;
}

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
    apagarCookie(cripto("analise"));
    abrirPopUp({
      cor: "blue",
      corpo: "Aguarde",
      titulo: "Validando dados",
      icone: "carregar",
      semBotoes: true,
      bgFechar: false,
    });
    setTimeout(enviar, 4000);
  }
}
