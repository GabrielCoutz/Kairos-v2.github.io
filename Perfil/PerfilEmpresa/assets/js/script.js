const nomeEmpresa = document.getElementById("nome_empresa");
const nomeFantasia = document.getElementById("nome_fantasia");
const ramo = document.getElementById("ramo");
const cepEmpresa = document.getElementById("cep_empresa");
const numeroEmpresa = document.getElementById("numero_empresa");
const endereco = vazio(
  document.getElementById("endereco").innerText.replace(", , ,", "")
)
  ? (document.getElementById("endereco").innerText = "Não Cadastrado")
  : document.getElementById("endereco").innerText;

if (!vazio(document.getElementById("ramo_php").innerText)) {
  ramo.value = document.getElementById("ramo_php").innerText.trim();
}

const conteudoNomeEmpresa = document.getElementById("nome_empresa").value;
const conteudoRamo = document.getElementById("ramo").value;
const conteudoNomeFantasia = document.getElementById("nome_fantasia").value;
const conteudoCepEmpresa = document.getElementById("cep_empresa").value;
const conteudoNumeroEmpresa = document.getElementById("numero_empresa").value;

const salvarbtn = document.getElementById("salvarbtn");
const cancelarbtn = document.getElementById("cancelarbtn");

function abrirEmpresa() {
  abrirPopUp({
    cor: "blue",
    corpo:
      "Parece que você não tem uma empresa cadastrada. Gostaria de cadastrá-la agora?",
    titulo: "Empresa não cadastrada",
    abrirEmpresa: true,
    bgFechar: false,
  });
}

let alerta = "";

switch (true) {
  case verificarURL(cripto("erro=true")):
    erroSincronizacao("../../Login/login");
    limparURL(cripto("erro=true"));
    break;

  case verificarURL(cripto("dados_empresa=false")):
    abrirEmpresa();
    limparURL(cripto("dados_empresa=false"));
    break;

  case verificarURL(cripto("nome_empresa_duplicado=true")):
    nomeEmpresa.classList.add("vermei");
    alerta += " Nome para Empresa já cadastrado!";
    limparURL(cripto("nome_empresa_duplicado=true"));
    break;

  case verificarURL(cripto("nome_fantasia_duplicado=true")):
    nomeFantasia.classList.add("vermei");
    alerta += " Nome Fantasia já cadastrado!";
    limparURL(cripto("nome_fantasia_duplicado=true"));
    break;
  default:
    break;
}

$("#ramo")
  .on("change", ({ target: input }) => {
    if (input.value === conteudoRamo) {
      salvarbtn.disabled = true;
      cancelarbtn.disabled = true;
    } else {
      salvarbtn.disabled = false;
      cancelarbtn.disabled = false;
    }
  })
  .change();

if (!vazio(alerta)) {
  abrirPopUp({
    cor: "red",
    corpo: alerta,
    titulo: "Alteração Inválida",
    icone: "falha",
  });
}

document.querySelectorAll("input").forEach((item) => {
  item.addEventListener("keyup", ({ target: input }) => {
    switch (input.id) {
      case "nome_empresa":
        switch (true) {
          case input.value === conteudoNomeEmpresa:
            salvarbtn.disabled = true;
            cancelarbtn.disabled = true;
            break;

          case input.value.length < 2:
            salvarbtn.disabled = true;
            cancelarbtn.disabled = false;
            alertaDeErro(input, "O nome deve ter no mínimo 2 letras!");
            break;

          default:
            limpar_inputs();
            salvarbtn.disabled = false;
            cancelarbtn.disabled = false;
        }
        break;

      case "nome_fantasia":
        switch (true) {
          case input.value === conteudoNomeFantasia:
            salvarbtn.disabled = true;
            cancelarbtn.disabled = true;
            break;

          case input.value.length < 2:
            salvarbtn.disabled = true;
            cancelarbtn.disabled = false;
            alertaDeErro(input, "O nome deve ter no mínimo 2 letras!");
            break;

          default:
            limpar_inputs();
            salvarbtn.disabled = false;
            cancelarbtn.disabled = false;
        }
        break;

      case "cep_empresa":
        switch (true) {
          case input.value === conteudoCepEmpresa:
            salvarbtn.disabled = true;
            cancelarbtn.disabled = true;
            break;

          case input.value.length < 10:
            salvarbtn.disabled = true;
            cancelarbtn.disabled = false;
            alertaDeErro(input, "Complete o CEP!");
            break;

          default:
            salvarbtn.disabled = false;
            cancelarbtn.disabled = false;
        }
        break;

      case "numero_empresa":
        switch (true) {
          case input.value === conteudoNumeroEmpresa:
            salvarbtn.disabled = true;
            cancelarbtn.disabled = true;
            break;

          case vazio(input.value):
            salvarbtn.disabled = true;
            cancelarbtn.disabled = false;
            alertaDeErro(input, "Preencha o número!");
            break;

          default:
            limpar_inputs();
            salvarbtn.disabled = false;
            cancelarbtn.disabled = false;
        }
        break;
      default:
        break;
    }
  });
});

function cancelar() {
  limpar_inputs();
  document.forms[0].reset();

  salvarbtn.disabled = true;
  cancelarbtn.disabled = true;

  vazio(conteudoRamo) ? (ramo.selectedIndex = 0) : (ramo.value = conteudoRamo);

  document.getElementById("endereco").innerHTML = endereco;
  apagarCookie("endereco");
}

function salvar() {
  limpar_inputs();
  if (
    !vazio(cepEmpresa.value) &&
    cepEmpresa.value.length <= 10 &&
    vazio(numeroEmpresa.value)
  ) {
    alertaDeErro(cepEmpresa, "Complete o endereço!");
    numeroEmpresa.classList.add("vermei");
  } else {
    Cookies.set("empresa", 1);
    abrirPopUp({
      cor: "blue",
      corpo: "Verificando dados",
      titulo: "Validando Alteração",
      icone: "carregar",
      semBotoes: true,
      bgFechar: false,
    });
    setTimeout(enviar, 3000);
  }
}
