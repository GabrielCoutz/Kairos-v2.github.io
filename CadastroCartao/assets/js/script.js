const num = document.getElementById("cardNumber");
const nome = document.getElementById("cardName");
const mes = document.getElementById("cardMonth");
const ano = document.getElementById("cardYear");
const cvv = document.getElementById("cardCvv");
const cpf = document.getElementById("cpf");
const numero = document.getElementById("numero");

switch (true) {
  case verificarURL(cripto("erro=true")):
    erroSincronizacao("../../Login/login");
    limparURL(cripto("erro=true"));
    break;

  case verificarURL(cripto("cpf=false")):
    limparURL(cripto("cpf=false"));
    abrirPopUp({
      cor: "red",
      corpo: "CPF já utilizado!",
      titulo: "Dados Duplicados",
      icone: "falha",
    });
    cpf.classList.add("vermei");
    break;
  case window.location.href.includes("planoSelect="):
    abrirPopUp({
      cor: "green",
      corpo:
        "Dados registrados com êxito, agora basta realizar o pagamento do plano escolhido!",
      titulo: "Cadastro realizado com sucesso",
      icone: "sucesso",
    });

    window.history.replaceState(
      { additionalInformation: "Updated the URL with JS" },
      "Kairos",
      window.location.href.replace("planoSelect", "plano")
    );
    break;
  default:
    break;
}

function validarCPF(cpfInput) {
  let Soma = 0;
  let Resto;
  cpfInput = String(cpfInput).replaceAll(".", "").replace(/-/g, "");
  if (
    cpfInput === "00000000000" ||
    cpfInput === "11111111111" ||
    cpfInput === "22222222222" ||
    cpfInput === "33333333333" ||
    cpfInput === "44444444444" ||
    cpfInput === "55555555555" ||
    cpfInput === "66666666666" ||
    cpfInput === "77777777777" ||
    cpfInput === "88888888888" ||
    cpfInput === "99999999999"
  )
    return 1;

  for (let i = 1; i <= 9; i++)
    Soma += parseInt(cpfInput.substring(i - 1, i)) * (11 - i);
  Resto = (Soma * 10) % 11;

  if (Resto === 10 || Resto === 11) Resto = 0;
  if (Resto !== parseInt(cpfInput.substring(9, 10))) return 1;

  Soma = 0;
  for (let i = 1; i <= 10; i++)
    Soma += parseInt(cpfInput.substring(i - 1, i)) * (12 - i);
  Resto = (Soma * 10) % 11;

  if (Resto === 10 || Resto === 11) Resto = 0;
  if (Resto !== parseInt(cpfInput.substring(10, 11))) return 1;
  return 0;
}

cpf.addEventListener("keyup", () => {
  if (validarCPF(cpf.value) && cpf.value.length === 14) {
    alertaDeErro(cpf, "CPF incorreto!");
    dispararEvento(cpf, "keyup", "condicaoCPF");
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
    window.location.href = "../Perfil/usuario";
  }, 3000);
}

function validar() {
  let validarNumero;

  !vazio(num.value) &&
  document.body.contains(document.getElementById("imagem")) &&
  document.getElementById("imagem").getAttribute("src").includes("amex")
    ? (validarNumero = 17)
    : (validarNumero = 19);

  limpar_inputs();

  if (num.value.length !== validarNumero) {
    alertaDeErro(num, "Preencha o número do cartão!");
    dispararEvento(num, "keyup", "condicaoNum");
    num.classList.add("vermei");
  } else if (vazio(nome.value)) {
    alertaDeErro(nome, "Preencha o nome do titular!");
    dispararEvento(nome, "keyup", "condicaoVazio");
    nome.classList.add("vermei");
  } else if (vazio(mes.value)) {
    alertaDeErro(mes, "Selecione o mês!");
    dispararEvento(mes, "change", "condicaoVazio");
    mes.classList.add("vermei");
  } else if (vazio(ano.value)) {
    alertaDeErro(ano, "Selecione o ano!");
    dispararEvento(ano, "change", "condicaoVazio");
    ano.classList.add("vermei");
  } else if (cvv.value.length < 3) {
    alertaDeErro(cvv, "Preencha o CVV do cartão!");
    dispararEvento(cvv, "keyup", "condicaoCvv");
    cvv.classList.add("vermei");
  } else if (cep.value.length < 10) {
    dispararEvento(cep, "keyup", "condicaoCep");
    alertaDeErro(cep, "Preencha o CEP!");
  } else if (vazio(numero.value)) {
    dispararEvento(numero, "keyup", "condicaoVazio");
    alertaDeErro(numero, "Preencha o Número!");
  } else {
    abrirPopUp({
      cor: "blue",
      corpo: "Validando Dados",
      titulo: "Cadastrando Cartão",
      icone: "carregar",
      semBotoes: true,
      bgFechar: false,
    });
    setTimeout(enviar, 3000);
  }
}
