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

function validarCNPJ(cnpj) {
  if (
    cnpj == "00000000000000" ||
    cnpj == "11111111111111" ||
    cnpj == "22222222222222" ||
    cnpj == "33333333333333" ||
    cnpj == "44444444444444" ||
    cnpj == "55555555555555" ||
    cnpj == "66666666666666" ||
    cnpj == "77777777777777" ||
    cnpj == "88888888888888" ||
    cnpj == "99999999999999"
  )
    return 1;

  tamanho = cnpj.length - 2;
  numeros = cnpj.substring(0, tamanho);
  digitos = cnpj.substring(tamanho);
  soma = 0;
  pos = tamanho - 7;
  for (i = tamanho; i >= 1; i--) {
    soma += numeros.charAt(tamanho - i) * pos--;
    if (pos < 2) pos = 9;
  }
  resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);
  if (resultado != digitos.charAt(0)) return 1;

  tamanho = tamanho + 1;
  numeros = cnpj.substring(0, tamanho);
  soma = 0;
  pos = tamanho - 7;
  for (i = tamanho; i >= 1; i--) {
    soma += numeros.charAt(tamanho - i) * pos--;
    if (pos < 2) pos = 9;
  }
  resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);
  if (resultado != digitos.charAt(1)) return 1;
  return 0;
}

cnpj.addEventListener("keyup", function () {
  if (cnpj.value.length == 18) {
    if (
      cnpj.value == "" ||
      validarCNPJ(cnpj.value.replace(/[^\d]+/g, "")) == 1
    ) {
      alertaDeErro(cnpj, "Por favor, insira um cnpj válido!");
      cnpj.focus();
      cnpj.classList.add("vermei");
      document.getElementById("butao").disabled = true;
    } else {
      cnpj.classList.remove("vermei");
      document
        .getElementById(cnpj.getAttribute("aria-controls"))
        .classList.remove("alerta-ativo");
      document.getElementById("butao").disabled = false;
    }
  }
});

function validar() {
  limpar_inputs();

  if (vazio(nome_empresa.value)) {
    alertaDeErro(nome_empresa, "Preencha o nome da Empresa!");
    dispararEvento(nome_empresa, "keyup", "condicaoVazio");
    nome_empresa.focus();
  } else if (vazio(nome_fantasia.value)) {
    alertaDeErro(nome_fantasia, "Preencha o Nome Fantasia!");
    dispararEvento(nome_fantasia, "keyup", "condicaoVazio");
    nome_fantasia.focus();
  } else if (vazio(cnpj.value) || cnpj.value.length != 18) {
    alertaDeErro(cnpj, "Preencha o CNPJ!");
    dispararEvento(cnpj, "keyup", "condicaoCNPJ");
    cnpj.focus();
  } else if (vazio(ramo.value)) {
    alertaDeErro(ramo, "Selecione o ramo!");
    dispararEvento(ramo, "change", "condicaoVazio");
    ramo.focus();
  } else if (vazio(cep_empresa.value)) {
    alertaDeErro(cep_empresa, "Preencha o CEP!");
    dispararEvento(cep_empresa, "keyup", "condicaoCep");
    cep_empresa.focus();
  } else if (vazio(numero_empresa.value)) {
    alertaDeErro(numero_empresa, "Preencha o Número!");
    dispararEvento(numero_empresa, "keyup", "condicaoVazio");
    numero_empresa.focus();
  } else {
    localStorage.setItem(nome_empresa.id, nome_empresa.value);
    localStorage.setItem(nome_fantasia.id, nome_fantasia.value);

    abrirjanela("blue", "Verificando Dados", "Andamento Cadastro", "carregar");
    setTimeout(enviar, 4000);
  }
}
