const nome = document.getElementById("nome");
const cep = document.getElementById("cep");
const numero = document.getElementById("numero");
const endereco = document.getElementById("endereco");
const senha_antiga = document.getElementById("senha_antiga");
const senha_nova = document.getElementById("senha_nova");
const senha_nova_dup = document.getElementById("senha_nova_dup");

const conteudo_nome = document.getElementById("nome").value;
const conteudo_cep = document.getElementById("cep").value;
const conteudo_numero = document.getElementById("numero").value;
// const conteudo_endereco = document.getElementById("endereco").innerText;

const salvarbtn = document.getElementById("salvarbtn");
const cancelarbtn = document.getElementById("cancelarbtn");
const senhabtn = document.getElementById("alterarsenha");
const caixa_senha = document.getElementsByClassName("caixa-senhas")[0];

// $(document).ready(function(){
//   if(vazio(cep.value)){
//       cep.placeholder = '00.000-000'
//       endereco.innerHTML = 'Não cadastrado'
//   }

//   if (vazio(numero.value)){
//       numero.placeholder = 'Não cadastrado'
//   }
// });

function erro() {
  document
    .getElementById("asdf_cancelar")
    .addEventListener("click", function () {
      window.location.href = "../Login/login";
    });
  document.getElementById("asdf_cancelar").click();
}

switch (true) {
  case verificarURL(md5("erro=true")):
    abrirjanela(
      "red",
      "Erro inesperado!<br>Por favor, faça login novamente.",
      "Conta não sincronizada",
      "falha"
    );
    document.getElementsByClassName("principal")[0].style.display = "none";
    setTimeout(erro, 4000);
    limparURL(md5("erro=true"));
    break;

  case verificarURL(md5("senha=false")): // senha diferente da já utilizada
    abrirjanela(
      "red",
      "Não foi possível alterar sua senha!<br>Por favor, verifique os campos e tente novamente.",
      "Alteração Inválida",
      "falha"
    );
    limparURL(md5("senha=false"));
    document.getElementById("alterarsenha").click();
    document.getElementById("senha_antiga").classList.add("vermei");
    document.getElementById("senha_nova").classList.add("vermei");
    document.getElementById("senha_nova_dup").classList.add("vermei");
    break;

  case verificarURL(md5("sucesso=true")):
    abrirjanela(
      "green",
      "Dados alterados com êxito.",
      "Alteração realizada",
      "sucesso"
    );
    limparURL(md5("sucesso=true"));
    break;

  case verificarURL(md5("sucesso=false")):
    abrirjanela(
      "red",
      "Não foi possível realizar a operação solicitada. Por favor, tente novamente ou entre em contato conosco.",
      "Erro inesperado",
      "falha"
    );
    limparURL(md5("sucesso=false"));
    break;

  case verificarURL(md5("analise=false")):
    abrirJanelaMarketing();
    limparURL(md5("analise=false"));
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
  document.getElementById("add_tel").disabled = true;
  document.getElementById("del_tel").disabled = true;
}

function cancelar() {
  limpar_alertas();
  document.forms[0].reset();

  if (caixa_senha.classList.contains("senha-ativa")) {
    document.querySelectorAll('input:not([id^="senha"])').forEach((input) => {
      input.disabled = false;
    });
    caixa_senha.classList.toggle("senha-ativa");
    senhabtn.classList.toggle("none");
    cancelarbtn.disabled = true;
    // apagarCookie("senha");
    document.getElementById("add_tel").disabled = false;
    document.getElementById("del_tel").disabled = false;
    return;
  }

  limpar_inputs();

  $(".adicional").closest(".phone-input").remove();
  $(".exclusao_tel").remove();

  if (document.getElementById("del_tel").style.display == "none") {
    $("#del_tel").toggle();
  }
  // endereco.innerHTML = vazio(conteudo_endereco.replace(", , ,", ""))
  //   ? "Não Cadastrado"
  //   : endereco.innerText;

  salvarbtn.disabled = true;
  cancelarbtn.disabled = true;

  apagarCookie("endereco");
  apagarCookie("excluir_num");
  apagarCookie("tels");
}

function salvar(item) {
  if (item.id == "salvar_senhabtn") {
    limpar_inputs();

    if (
      vazio(senha_antiga.value) ||
      vazio(senha_nova.value) ||
      vazio(senha_nova_dup.value) ||
      senha_nova.value != senha_nova_dup.value
    ) {
      senha_nova.classList.add("vermei");
      senha_nova_dup.classList.add("vermei");
      alertaDeErro(
        senha_antiga.id,
        "Por favor, verifique os campos e tente novamente!"
      );
    } else {
      abrirjanela(
        "blue",
        "Verificando dados",
        "Validando Alteração",
        "carregar"
      );
      Cookies.set("senha", 1);
      document.getElementById("asdf_cancelar").style.display = "none";
      setTimeout(nada, 3000);
      console.log("tudo certo");
    }
    return;
  }

  limpar_inputs();

  let numeros = [];

  if (document.getElementsByClassName("exclusao_tel")[0] != undefined) {
    // se existirem números a serem excluídos, cada um selecionado vai para lista de Cookies, usada como lista de exclusão

    let pos = 1;
    while (document.getElementById("del_tel" + pos) != undefined) {
      if (document.getElementById("del_tel" + pos).style.opacity == "0.5") {
        numeros.push(document.getElementById("del_tel" + pos).innerText);
      }
      pos++;
    }
    Cookies.set("excluir_num", 1);
    Cookies.set("excluir_nums", numeros.length);

    let a = 1;
    numeros.forEach((item) => {
      Cookies.set("del_num" + a, item);
      a++;
    });
  }

  var tels = 0;
  if (document.querySelectorAll(".adicional")[0]) {
    document.querySelectorAll(".adicional").forEach((item) => {
      // se existirem números a serem adicionados, são guardados nos Cookies, usados como lista de adição
      item.classList.remove("vermei");
      tels++;
      Cookies.set(item.getAttribute("name"), item.value);
      Cookies.set("usuario", 1);
    });
    Cookies.set("usuario", 1);
    Cookies.set("tels", tels);
  }

  if (!vazio(cep.value) && cep.value.length <= 10 && vazio(numero.value)) {
    alertaDeErro(cep.id, "Complete o endereço!");
    cep.classList.add("vermei");
    numero.classList.add("vermei");
  } else {
    Cookies.set("usuario", 1);
    abrirjanela("blue", "Verificando dados", "Validando Alteração", "carregar");
    document.getElementById("asdf_cancelar").style.display = "none";
    setTimeout(nada, 2000);
  }
}
