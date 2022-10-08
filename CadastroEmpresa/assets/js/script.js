const nomeEmpresa = document.getElementById("nome_empresa");
const nomeFantasia = document.getElementById("nome_fantasia");
const cnpj = document.getElementById("cnpj");
const cepEmpresa = document.getElementById("cep_empresa");
const numeroEmpresa = document.getElementById("numero_empresa");
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

    nomeEmpresa.value = localStorage.getItem("nomeEmpresa");
    nomeFantasia.value = localStorage.getItem("nome_fantasia");
    limparURL(cripto("cnpj=false"));
    break;
  default:
    break;
}

cnpj.addEventListener("keyup", () => {
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

  if (vazio(nomeEmpresa.value)) {
    alertaDeErro(nomeEmpresa, "Preencha o nome da Empresa!");
    dispararEvento(nomeEmpresa, "keyup", "condicaoVazio");
  } else if (vazio(nomeFantasia.value)) {
    alertaDeErro(nomeFantasia, "Preencha o Nome Fantasia!");
    dispararEvento(nomeFantasia, "keyup", "condicaoVazio");
  } else if (vazio(ramo.value)) {
    alertaDeErro(ramo, "Selecione o ramo!");
    dispararEvento(ramo, "change", "condicaoVazio");
  } else if (vazio(cepEmpresa.value)) {
    alertaDeErro(cepEmpresa, "Preencha o CEP!");
    dispararEvento(cepEmpresa, "keyup", "condicaoCep");
  } else if (vazio(numeroEmpresa.value)) {
    alertaDeErro(numeroEmpresa, "Preencha o Número!");
    dispararEvento(numeroEmpresa, "keyup", "condicaoVazio");
  } else {
    localStorage.setItem(nomeEmpresa.id, nomeEmpresa.value);
    localStorage.setItem(nomeFantasia.id, nomeFantasia.value);

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
