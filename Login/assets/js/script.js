const email = document.getElementById("email");
const senha = document.getElementById("senha");

switch (true) {
  case verificarURL(md5("login=false")):
    abrirjanela({
      cor: "red",
      corpo: "Credenciais incorretas! Por favor, verifique os dados inseridos!",
      titulo: "Falha no login",
      icone: "falha",
    });
    limparURL(md5("login=false"));
    document.getElementById("email").classList.add("vermei");
    document.getElementById("senha").classList.add("vermei");
    document.getElementById("email").classList.add("erro");
    document.getElementById("senha").classList.add("erro");
    break;

  case verificarURL(md5("sucesso=true")):
    abrirjanela({
      cor: "green",
      corpo: "Dados cadastrados com sucesso!",
      titulo: "Cadastro",
      icone: "sucesso",
    });
    limparURL(md5("sucesso=true"));
    break;

  case verificarURL(md5("sucesso_senha=true")):
    abrirjanela({
      cor: "green",
      corpo: "Senha alterada com sucesso!",
      titulo: "Recuperação de Conta",
      icone: "sucesso",
    });
    limparURL(md5("sucesso_senha=true"));
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
    apagarCookie(md5("analise"));
    abrirjanela({
      cor: "blue",
      corpo: "Aguarde",
      titulo: "Validando dados",
      icone: "carregar",
      semBotoes: true
    });
    setTimeout(enviar, 4000);
  }
}
