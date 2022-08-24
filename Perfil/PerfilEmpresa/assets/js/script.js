const nome_empresa = document.getElementById("nome_empresa");
const nome_fantasia = document.getElementById("nome_fantasia");
const ramo = document.getElementById("ramo");
const cep_empresa = document.getElementById("cep_empresa");
const numero_empresa = document.getElementById("numero_empresa");
const endereco = vazio(
  document.getElementById("endereco").innerText.replace(", , ,", "")
)
  ? (document.getElementById("endereco").innerText = "Não Cadastrado")
  : document.getElementById("endereco").innerText;

if (!vazio(document.getElementById("ramo_php").innerText)) {
  ramo.value = document.getElementById("ramo_php").innerText.trim();
}

const conteudo_nome_empresa = document.getElementById("nome_empresa").value;
const conteudo_ramo = document.getElementById("ramo").value;
const conteudo_nome_fantasia = document.getElementById("nome_fantasia").value;
const conteudo_cep_empresa = document.getElementById("cep_empresa").value;
const conteudo_numero_empresa = document.getElementById("numero_empresa").value;

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
  case verificarURL(md5("erro=true")):
    erroSincronizacao("../../Login/login");
    limparURL(md5("erro=true"));
    break;

  case verificarURL(md5("dados_empresa=false")):
    abrirEmpresa();
    limparURL(md5("dados_empresa=false"));
    break;

  case verificarURL(md5("nome_empresa_duplicado=true")):
    nome_empresa.classList.add("vermei");
    alerta += " Nome para Empresa já cadastrado!";
    limparURL(md5("nome_empresa_duplicado=true"));
    break;

  case verificarURL(md5("nome_fantasia_duplicado=true")):
    nome_fantasia.classList.add("vermei");
    alerta += " Nome Fantasia já cadastrado!";
    limparURL(md5("nome_fantasia_duplicado=true"));
    break;

  case verificarURL(md5("sucesso=true")):
    abrirPopUp({
      cor: "green",
      corpo: "Dados alterados com êxito.",
      titulo: "Alteração realizada com sucesso",
      icone: "sucesso",
    });
    limparURL(md5("sucesso=true"));
    break;

  case verificarURL(md5("cadastro=true")):
    abrirPopUp({
      cor: "green",
      corpo: "Dados registrados com êxito.",
      titulo: "Cadastro realizado com sucesso",
      icone: "sucesso",
    });
    limparURL(md5("cadastro=true"));
    break;
}

$("#ramo")
  .on("change", function () {
    if (this.value === conteudo_ramo) {
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
  item.addEventListener("keydown", function () {
    switch (this.id) {
      case "nome_empresa":
        switch (true) {
          case this.value == conteudo_nome_empresa:
            salvarbtn.disabled = true;
            cancelarbtn.disabled = true;
            break;

          case this.value.length < 2:
            salvarbtn.disabled = true;
            cancelarbtn.disabled = false;
            alertaDeErro(this, "O nome deve ter no mínimo 2 letras!");
            break;

          default:
            limpar_inputs();
            salvarbtn.disabled = false;
            cancelarbtn.disabled = false;
        }
        break;

      case "nome_fantasia":
        switch (true) {
          case this.value == conteudo_nome_fantasia:
            salvarbtn.disabled = true;
            cancelarbtn.disabled = true;
            break;

          default:
            limpar_inputs();
            salvarbtn.disabled = false;
            cancelarbtn.disabled = false;
        }
        break;

      case "cep_empresa":
        switch (true) {
          case this.value == conteudo_cep_empresa:
            salvarbtn.disabled = true;
            cancelarbtn.disabled = true;
            break;

          case this.value.length < 10:
            salvarbtn.disabled = true;
            cancelarbtn.disabled = false;
            alertaDeErro(this, "Complete o CEP!");
            break;

          default:
            salvarbtn.disabled = false;
            cancelarbtn.disabled = false;
        }
        break;

      case "numero_empresa":
        switch (true) {
          case this.value == conteudo_numero_empresa:
            salvarbtn.disabled = true;
            cancelarbtn.disabled = true;
            break;

          case vazio(this.value):
            salvarbtn.disabled = true;
            cancelarbtn.disabled = false;
            alertaDeErro(this, "Preencha o número!");
            break;

          default:
            limpar_inputs();
            salvarbtn.disabled = false;
            cancelarbtn.disabled = false;
        }
        break;
    }
  });
});

function cancelar() {
  limpar_inputs();
  document.forms[0].reset();

  salvarbtn.disabled = true;
  cancelarbtn.disabled = true;

  vazio(conteudo_ramo)
    ? (ramo.selectedIndex = 0)
    : (ramo.value = conteudo_ramo);

  document.getElementById("endereco").innerHTML = endereco;
  apagarCookie("endereco");
}

function salvar() {
  limpar_inputs();
  if (
    !vazio(cep_empresa.value) &&
    cep_empresa.value.length <= 10 &&
    vazio(numero_empresa.value)
  ) {
    alertaDeErro(cep_empresa, "Complete o endereço!");
    numero_empresa.classList.add("vermei");
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
