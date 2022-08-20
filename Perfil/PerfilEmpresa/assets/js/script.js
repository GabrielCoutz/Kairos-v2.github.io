const nome_empresa = document.getElementById("nome_empresa");
const nome_fantasia = document.getElementById("nome_fantasia");
const ramo_empresa = document.getElementById("ramo");
const cep_empresa = document.getElementById("cep_empresa");
const numero_empresa = document.getElementById("numero_empresa");
const endereco = vazio(
  document.getElementById("endereco").innerText.replace(", , ,", "")
)
  ? (document.getElementById("endereco").innerText = "Não Cadastrado")
  : document.getElementById("endereco").innerText;

const conteudo_nome_empresa = document.getElementById("nome_empresa").value;
const conteudo_ramo = document.getElementById("ramo").value;
const conteudo_nome_fantasia = document.getElementById("nome_fantasia").value;
const conteudo_cep_empresa = document.getElementById("cep_empresa").value;
const conteudo_numero_empresa = document.getElementById("numero_empresa").value;

const salvarbtn = document.getElementById("salvarbtn");
const cancelarbtn = document.getElementById("cancelarbtn");

const IniciarCadastroEmpresa = function () {
  let popup = function () {
    abrirjanela(
      "blue",
      "Tudo bem, redirecionando para página de cadastro",
      "Empresa não encontrada",
      "carregar"
    );
    document.getElementById("asdf_cancelar").style.display = "none";
  };
  let redirecionar = function () {
    window.location.href = "assets/php/enviar_empresa?cadastrar=true";
  };
  setTimeout(popup, 1500);
  setTimeout(redirecionar, 3000);
};

const cancelarCadastroEmpresa = function () {
  let popup = function () {
    abrirjanela(
      "blue",
      "Tudo bem, redirecionando para página do usuário",
      "Empresa não encontrada",
      "carregar"
    );
    document.getElementById("asdf_cancelar").style.display = "none";
  };
  let redirecionar = function () {
    window.location.href = "../usuario";
  };

  setTimeout(popup, 1500);

  setTimeout(redirecionar, 6000);
};

function abrirEmpresa() {
  janelaPopUp.abre(
    "asdf",
    "p" + " " + "blue" + " " + "confirm",
    "Empresa Não cadastrada",
    "Parece que você não tem uma empresa cadastrada. Gostaria de cadastrá-la agora?"
  );

  document.getElementById("asdf_enviar").innerHTML = "Não, talvez mais tarde";
  document
    .getElementById("asdf_enviar")
    .addEventListener("click", cancelarCadastroEmpresa);

  document
    .getElementById("asdf_cancelar")
    .addEventListener("click", IniciarCadastroEmpresa);
  document.getElementById("asdf_cancelar").innerHTML = "Sim, gostaria";
}

function erro() {
  document
    .getElementById("asdf_cancelar")
    .addEventListener("click", function () {
      window.location.href = "../../Login/login";
    });
  document.getElementById("asdf_cancelar").click();
}

let alerta = "";

switch (true) {
  case verificarURL(md5("erro=true")):
    abrirjanela(
      "red",
      "Erro inesperado!<br>Por favor, faça login novamente.",
      "Conta não sincronizada",
      "falha"
    );
    document.getElementsByClassName("content")[0].style.display = "none";
    document.getElementById("asdf_cancelar").style.display = "none";
    setTimeout(erro, 3000);
    limparURL(md5("erro=true"));
    break;

  case verificarURL(md5("dados_empresa=false")):
    abrirEmpresa();
    limparURL(md5("dados_empresa=false"));
    break;

  case verificarURL(md5("nome_empresa_duplicado=true")):
    document.getElementById("editarbtn").click();
    document.getElementById("nome_empresa").classList.add("vermei");
    alerta += "Nome para Empresa já cadastrado!<br>";
    limparURL(md5("nome_empresa_duplicado=true"));
    break;

  case verificarURL(md5("nome_fantasia_duplicado=true")):
    document.getElementById("editarbtn").click();
    document.getElementById("nome_fantasia").classList.add("vermei");
    alerta += "Nome Fantasia já cadastrado!<br>";
    limparURL(md5("nome_fantasia_duplicado=true"));
    break;

  case verificarURL(md5("sucesso=true")):
    abrirjanela(
      "green",
      "Dados alterados com êxito.",
      "Alteração realizada com sucesso",
      "sucesso"
    );
    limparURL(md5("sucesso=true"));
    break;

  case verificarURL(md5("cadastro=true")):
    abrirjanela(
      "green",
      "Dados registrados com êxito.",
      "Cadastro realizado com sucesso",
      "sucesso"
    );
    limparURL(md5("cadastro=true"));
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
  abrirjanela("red", alerta, "Alteração Inválida", "falha");
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
            console.log("pegou3");
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
    abrirjanela("blue", "Verificando dados", "Validando Alteração", "carregar");
    setTimeout(enviar, 3000);
  }
}
