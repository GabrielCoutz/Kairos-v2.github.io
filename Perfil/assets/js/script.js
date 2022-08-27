const nome = document.getElementById("nome");
const cep = document.getElementById("cep");
const numero = document.getElementById("numero");
const endereco = vazio(
  document.getElementById("endereco").innerText.replace(", , ,", "")
)
  ? (document.getElementById("endereco").innerText = "Não Cadastrado")
  : document.getElementById("endereco").innerText;

const senha_antiga = document.getElementById("senha_antiga");
const senha_nova = document.getElementById("senha_nova");
const senha_nova_dup = document.getElementById("senha_nova_dup");

const conteudo_nome = document.getElementById("nome").value;
const conteudo_cep = document.getElementById("cep").value;
const conteudo_numero = document.getElementById("numero").value;

const salvarbtn = document.getElementById("salvarbtn");
const cancelarbtn = document.getElementById("cancelarbtn");
const senhabtn = document.getElementById("alterarsenha");
const caixa_senha = document.getElementsByClassName("caixa-senhas")[0];

$(document).ready(function () {
  if (vazio(cep.value)) {
    cep.placeholder = "00.000-000";
  }

  if (vazio(numero.value)) {
    numero.placeholder = "Não cadastrado";
  }
  if (
    document.querySelector(".form-caixa.telefone").innerText ===
    "Não Cadastrado"
  ) {
    document.getElementById("del_tel").classList.add("none");
  }
});

switch (true) {
  case verificarURL(cripto("erro=true")):
    erroSincronizacao("../Login/login");
    limparURL(cripto("erro=true"));
    break;

  case verificarURL(cripto("senha=false")): // senha diferente da já utilizada
    abrirPopUp({
      cor: "red",
      corpo:
        "Não foi possível alterar sua senha! Por favor, verifique os campos e tente novamente.",
      titulo: "Alteração Inválida",
      icone: "falha",
    });
    limparURL(cripto("senha=false"));
    document.getElementById("alterarsenha").click();
    document.getElementById("senha_antiga").classList.add("vermei");
    document.getElementById("senha_nova").classList.add("vermei");
    document.getElementById("senha_nova_dup").classList.add("vermei");
    break;

  case verificarURL(cripto("sucesso=true")):
    abrirPopUp({
      cor: "green",
      corpo: "Dados alterados com êxito.",
      titulo: "Alteração realizada",
      icone: "sucesso",
    });
    limparURL(cripto("sucesso=true"));
    break;

  case verificarURL(cripto("analise=false")):
    abrirPopUp({
      cor: "blue",
      titulo: "Faça sua análise hoje mesmo!",
      corpo:
        "Sabia que você pode impulsionar sua gestão de marketing com alguns clicks?",
      icone: "marketing",
      marketing: true,
    });
    limparURL(cripto("analise=false"));
    break;
}

document.querySelectorAll("input").forEach((item) => {
  item.addEventListener("keyup", function () {
    switch (this.id) {
      case "nome":
        switch (true) {
          case this.value == conteudo_nome:
            salvarbtn.disabled = true;
            cancelarbtn.disabled = true;
            break;

          case this.value.length < 4:
            salvarbtn.disabled = true;
            cancelarbtn.disabled = false;
            alertaDeErro(this, "O nome deve ter no mínimo 4 letras!");
            break;

          default:
            limpar_inputs();
            salvarbtn.disabled = false;
            cancelarbtn.disabled = false;
        }
        break;

      case "cep":
        switch (true) {
          case this.value == conteudo_cep:
            salvarbtn.disabled = true;
            cancelarbtn.disabled = true;
            break;

          case this.value.length < 10:
            salvarbtn.disabled = true;
            cancelarbtn.disabled = false;
            alertaDeErro(this, "Complete o CEP!");
            break;

          default:
            limpar_inputs();
            salvarbtn.disabled = false;
            cancelarbtn.disabled = false;
        }
        break;

      case "numero":
        switch (true) {
          case this.value == conteudo_numero:
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
            Cookies.set("endereco", 1);
            salvarbtn.disabled = false;
            cancelarbtn.disabled = false;
        }
        break;
    }
  });
});

function alterarSenha() {
  document.querySelectorAll('input:not([id^="senha"])').forEach((input) => {
    input.disabled = true;
  });
  caixa_senha.classList.toggle("senha-ativa");
  senhabtn.classList.toggle("none");
  cancelarbtn.disabled = false;
  salvarbtn.disabled = false;
  document.getElementById("add_tel").disabled = true;
  document.getElementById("del_tel").disabled = true;
}

function cancelar() {
  limpar_inputs();
  document.forms[0].reset();

  if (caixa_senha.classList.contains("senha-ativa")) {
    document.querySelectorAll('input:not([id^="senha"])').forEach((input) => {
      input.disabled = false;
    });
    caixa_senha.classList.toggle("senha-ativa");
    senhabtn.classList.toggle("none");
    cancelarbtn.disabled = true;
    salvarbtn.disabled = true;
    // apagarCookie("senha");
    document.getElementById("add_tel").disabled = false;
    document.getElementById("del_tel").disabled = false;
    return;
  }

  $(".adicionarNumero").remove();
  $(".deletarNumero").remove();
  $(".dados-coluna.telefone").toggle();

  if (document.getElementById("del_tel").style.display === "none") {
    $("#del_tel").toggle();
  }
  if (document.getElementById("add_tel").style.display === "none") {
    $("#add_tel").toggle();
  }

  document.getElementById("endereco").innerHTML = endereco;

  salvarbtn.disabled = true;
  cancelarbtn.disabled = true;

  apagarCookie("endereco");
}

function salvar() {
  let index = 0;
  if (caixa_senha.classList.contains("senha-ativa")) {
    limpar_inputs();

    if (
      vazio(senha_antiga.value) ||
      vazio(senha_nova.value) ||
      vazio(senha_nova_dup.value) ||
      senha_nova.value != senha_nova_dup.value
    ) {
      alertaDeErro(
        senha_antiga,
        "Por favor, verifique os campos e tente novamente!"
      );
      dispararEvento(senha_antiga, "keyup", "condicaoSenha");
    } else {
      abrirPopUp({
        cor: "blue",
        corpo: "Verificando dados",
        titulo: "Validando Alteração",
        icone: "carregar",
        semBotoes: true,
        bgFechar: false,
      });
      Cookies.set("senha", 1);
      setTimeout(enviar, 3000);
    }
    return;
  }

  limpar_inputs();

  for (numeroDeletar of document.getElementsByClassName("deletar")) {
    Cookies.set("deletar" + index, numeroDeletar.innerText);
    index++;
  }

  for (numeroAdicionar of document.getElementsByClassName("adicionar")) {
    Cookies.set("adicionar" + index, numeroAdicionar.value);
    index++;
  }

  if (!vazio(cep.value) && cep.value.length <= 10 && vazio(numero.value)) {
    alertaDeErro(cep, "Complete o endereço!");
    cep.classList.add("vermei");
    numero.classList.add("vermei");
  } else {
    Cookies.set("usuario", 1);
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
