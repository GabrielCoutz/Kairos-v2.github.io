const cep = document.getElementById("cep");
const numero = document.getElementById("numero");

const senhaAntiga = document.getElementById("senha_ntiga");
const senhaNova = document.getElementById("senha_nova");
const senhaNovaDup = document.getElementById("senha_nova_dup");

const conteudoNome = document.getElementById("nome").value;
const conteudoCep = document.getElementById("cep").value;
const conteudoNumero = document.getElementById("numero").value;

const salvarbtn = document.getElementById("salvarbtn");
const cancelarbtn = document.getElementById("cancelarbtn");
const senhabtn = document.getElementById("alterarsenha");
const caixaSenha = document.getElementsByClassName("caixa-senhas")[0];

const endereco = vazio(
  document.getElementById("endereco").innerText.replace(", , ,", "")
)
  ? "Não Cadastrado"
  : document.getElementById("endereco").innerHTML;

$(document).ready(() => {
  if (vazio(cep.value)) cep.placeholder = "00.000-000";

  if (vazio(numero.value)) numero.placeholder = "Não cadastrado";

  if (
    document.querySelector(".form-caixa.telefone").innerText ===
    "Não Cadastrado"
  )
    document.getElementById("del_tel").classList.add("none");
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
    document.getElementById("senhaAntiga").classList.add("vermei");
    document.getElementById("senhaNova").classList.add("vermei");
    document.getElementById("senhaNovaDup").classList.add("vermei");
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
  default:
    break;
}
document.querySelectorAll("input").forEach((item) => {
  item.addEventListener("input", ({ target: input }) => {
    switch (input.id) {
      case "nome":
        switch (true) {
          case input.value === conteudoNome:
            salvarbtn.disabled = true;
            cancelarbtn.disabled = true;
            break;

          case input.value.length < 4:
            salvarbtn.disabled = true;
            cancelarbtn.disabled = false;
            alertaDeErro(input, "O nome deve ter no mínimo 4 letras!");
            break;

          default:
            limpar_inputs();
            input.removeAttribute("aria-labelledby");
            salvarbtn.disabled = false;
            cancelarbtn.disabled = false;
        }
        break;

      case "cep":
        switch (true) {
          case input.value === conteudoCep:
            salvarbtn.disabled = true;
            cancelarbtn.disabled = true;
            break;

          case input.value.length < 10:
            salvarbtn.disabled = true;
            cancelarbtn.disabled = false;
            alertaDeErro(input, "Complete o CEP!");
            break;

          default:
            limpar_inputs();
            salvarbtn.disabled = false;
            cancelarbtn.disabled = false;
        }
        break;

      case "numero":
        switch (true) {
          case input.value === conteudoNumero:
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
            Cookies.set("endereco", 1);
            salvarbtn.disabled = false;
            cancelarbtn.disabled = false;
        }
        break;
      default:
        break;
    }
  });
});

function alterarSenha() {
  document.querySelectorAll('input:not([id^="senha"])').forEach((input) => {
    input.disabled = true;
  });
  caixaSenha.classList.toggle("senha-ativa");
  senhabtn.classList.toggle("none");
  cancelarbtn.disabled = false;
  salvarbtn.disabled = false;
  document.getElementById("add_tel").disabled = true;
  document.getElementById("del_tel").disabled = true;
}

function cancelar() {
  limpar_inputs();
  document.forms[0].reset();

  if (caixaSenha.classList.contains("senha-ativa")) {
    document.querySelectorAll('input:not([id^="senha"])').forEach((input) => {
      input.disabled = false;
    });
    caixaSenha.classList.toggle("senha-ativa");
    senhabtn.classList.toggle("none");
    cancelarbtn.disabled = true;
    salvarbtn.disabled = true;
    apagarCookie("senha");
    document.getElementById("add_tel").disabled = false;
    document.getElementById("del_tel").disabled = false;
    document.querySelector(".progress-bar > div").classList.add("none");
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
  if (caixaSenha.classList.contains("senha-ativa")) {
    limpar_inputs();

    if (
      vazio(senhaAntiga.value) ||
      vazio(senhaNova.value) ||
      vazio(senhaNovaDup.value) ||
      senhaNova.value !== senhaNovaDup.value
    ) {
      alertaDeErro(
        senhaAntiga,
        "Por favor, verifique os campos e tente novamente!"
      );
      dispararEvento(senhaAntiga, "keyup", "condicaoSenha");
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

  for (const numeroDeletar of document.getElementsByClassName("deletar")) {
    Cookies.set(`deletar${index}`, numeroDeletar.innerText);
    index++;
  }

  for (const numeroAdicionar of document.getElementsByClassName("adicionar")) {
    Cookies.set(`adicionar${index}`, numeroAdicionar.value);
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
