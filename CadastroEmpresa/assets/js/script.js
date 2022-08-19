const nome_empresa = document.getElementById("nome_empresa");
const nome_fantasia = document.getElementById("nome_fantasia");
const cnpj = document.getElementById("cnpj");
const cep_empresa = document.getElementById("cep_empresa");
const numero_empresa = document.getElementById("numero_empresa");
const ramo = document.getElementById("ramo");

switch (true) {
  case verificarURL(md5("erro=true")):
    abrirjanela(
      "red",
      "<br>Não foi possível realizar o cadastro!",
      "Conta não sincronizada",
      "falha"
    );
    document.getElementById("asdf_cancelar").style.display = "none";
    limparURL(md5("erro=true"));
    setTimeout(paginaInicial, 4000);
    break;

  case verificarURL(md5("cnpj=false")):
    abrirjanela("red", "CNPJ já cadastrado!", "Andamento Cadastro", "falha");
    cnpj.classList.add("vermei");
    cnpj.focus();

    nome_empresa.value = localStorage.getItem("nome_empresa");
    nome_fantasia.value = localStorage.getItem("nome_fantasia");
    limparURL(md5("cnpj=false"));
    break;
}

function validar() {
  limpar_inputs();

  if (vazio(nome_empresa.value)) {
    alertaDeErro(nome_empresa, "Preencha o nome da Empresa!");
    dispararEvento(nome_empresa, "keyup", "condicaoVazio");
  } else if (vazio(nome_fantasia.value)) {
    alertaDeErro(nome_fantasia, "Preencha o Nome Fantasia!");
    dispararEvento(nome_fantasia, "keyup", "condicaoVazio");
  } else if (!validarCNPJ(cnpj.value)) {
    alertaDeErro(cnpj, "CNPJ inválido!");
    dispararEvento(cnpj, "keyup", "condicaoCNPJ");
  } else if (vazio(ramo.value)) {
    alertaDeErro(ramo, "Selecione o ramo!");
    dispararEvento(ramo, "change", "condicaoVazio");
  } else if (vazio(cep_empresa.value)) {
    alertaDeErro(cep_empresa, "Preencha o CEP!");
    dispararEvento(cep_empresa, "keyup", "condicaoCep");
  } else if (vazio(numero_empresa.value)) {
    alertaDeErro(numero_empresa, "Preencha o Número!");
    dispararEvento(numero_empresa, "keyup", "condicaoVazio");
  } else {
    localStorage.setItem(nome_empresa.id, nome_empresa.value);
    localStorage.setItem(nome_fantasia.id, nome_fantasia.value);

    abrirjanela("blue", "Verificando Dados", "Andamento Cadastro", "carregar");
    setTimeout(enviar, 4000);
  }
}