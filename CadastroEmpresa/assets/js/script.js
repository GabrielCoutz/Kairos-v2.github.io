const nome_empresa = document.getElementById("nome_empresa");
const nome_fantasia = document.getElementById("nome_fantasia");
const cnpj = document.getElementById("cnpj");
const cep_empresa = document.getElementById("cep_empresa");
const numero_empresa = document.getElementById("numero_empresa");
const ramo = document.getElementById("ramo");

switch (true) {
  case verificarURL(cripto("erro=true")):
    erroSincronizacao("../Login/login");
    limparURL(cripto("erro=true"));
    break;

  case verificarURL(cripto("cnpj=false")):
    abrirPopUp({
      cor: "red",
      corpo: "CNPJ já cadastrado!",
      titulo: "Andamento Cadastro",
      icone: "falha",
    });
    cnpj.classList.add("vermei");
    cnpj.focus();

    nome_empresa.value = localStorage.getItem("nome_empresa");
    nome_fantasia.value = localStorage.getItem("nome_fantasia");
    limparURL(cripto("cnpj=false"));
    break;
}

cnpj.addEventListener("keyup", function () {
  if (!validarCNPJ(cnpj.value) && cnpj.value.length === 18) {
    alertaDeErro(cnpj, "CNPJ incorreto!");
    dispararEvento(cnpj, "keyup", "condicaoCNPJ");
  }
});

function cancelar() {
  abrirPopUp({
    cor: "blue",
    titulo: "Cancelando",
    corpo: "Pena que mudou de ideia 😢",
    icone: "carregar",
    semBotoes: true,
    bgFechar: false,
  });
  setTimeout(() => {
    window.location.href = "../Perfil/PerfilEmpresa/empresa";
  }, 3000);
}

function validar() {
  limpar_inputs();

  if (vazio(nome_empresa.value)) {
    alertaDeErro(nome_empresa, "Preencha o nome da Empresa!");
    dispararEvento(nome_empresa, "keyup", "condicaoVazio");
  } else if (vazio(nome_fantasia.value)) {
    alertaDeErro(nome_fantasia, "Preencha o Nome Fantasia!");
    dispararEvento(nome_fantasia, "keyup", "condicaoVazio");
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

    abrirPopUp({
      cor: "blue",
      corpo: "Verificando Dados",
      titulo: "Andamento Cadastro",
      icone: "carregar",
      semBotoes: true,
      bgFechar: false,
    });
    setTimeout(enviar, 4000);
  }
}
