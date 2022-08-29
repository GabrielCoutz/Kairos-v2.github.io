const limite = 5;

function removerTelefoneAdicional(elemento) {
  elemento.closest(".adicionarNumero").remove();
  if (!document.querySelector(".adicionarNumero")) {
    cancelarbtn.click();
  }
  if (document.querySelectorAll(".adicionar").length < limite) {
    document.getElementById("telefoneAlert").classList.remove("alerta-ativo");
  }
}

// adiciona campos de input
$("#add_tel").click(function () {
  cancelarbtn.disabled = false;
  if (document.querySelectorAll(".adicionar").length >= limite) {
    document.getElementById("telefoneAlert").innerText = "Limite (5) atingido!";
    document.getElementById("telefoneAlert").classList.add("alerta-ativo");
    return;
  } else {
    document.getElementById("telefoneAlert").classList.remove("alerta-ativo");
    document.getElementById("telefoneAlert").innerText =
      "Preencha o número por completo!";
  }

  if (document.getElementById("del_tel").offsetParent) {
    $("#del_tel").toggle();
  }

  if ($(".dados-coluna.telefone")[0].style.display != "none") {
    $(".dados-coluna.telefone").toggle();
  }

  $("#manipularNumeros").append(adicionarTel());
  document.querySelector(".adicionarNumero:last-child input").focus();
});

// mostra numeros para serem deletados
$("#del_tel").click(function () {
  cancelarbtn.disabled = false;

  if ($(".dados-coluna.telefone")[0].style.display != "none") {
    $(".dados-coluna.telefone").toggle();
  }
  $("#add_tel").toggle();
  $("#del_tel").toggle();

  document.querySelectorAll(".numeros").forEach((num) => {
    $("#manipularNumeros").append(deletarTel(num));
  });
});

function deletar_tel(tel) {
  let anterior = tel.previousElementSibling;
  anterior.classList.toggle("deletar");

  anterior.classList.toString().includes("deletar")
    ? (salvarbtn.disabled = false)
    : (salvarbtn.disabled = true);
}
const alerta = document.getElementById("telefoneAlert").classList;

function verificarTelefone(input) {
  if (input.value.length == 15) {
    input.classList.remove("vermei");
    salvarbtn.disabled = false;
  } else {
    input.classList.add("vermei");
    salvarbtn.disabled = true;
  }

  if (input.classList.toString().includes("vermei")) {
    alerta.add("alerta-ativo");
    input.setAttribute("aria-labelledby", "telefoneAlert");
  } else {
    alerta.remove("alerta-ativo");
    input.removeAttribute("aria-labelledby");
  }
}

function adicionarTel() {
  let divAdd = document.createElement("div");
  divAdd.setAttribute("class", "adicionarNumero");

  let input = document.createElement("input");
  input.setAttribute("type", "text");
  input.setAttribute("placeholder", "(00) 0000-00000");
  input.setAttribute("class", "adicionar");
  input.setAttribute("onkeypress", '$(this).mask("(00) 0000-00009")');
  input.setAttribute("onkeyup", "verificarTelefone(this)");

  let button = document.createElement("button");
  button.setAttribute("class", "btn");
  button.setAttribute("type", "button");
  button.setAttribute("onclick", "removerTelefoneAdicional(this)");

  let iconeDel = document.createElement("i");
  iconeDel.setAttribute("class", "gg-remove");

  divAdd.appendChild(input);
  button.appendChild(iconeDel);
  divAdd.appendChild(button);
  return divAdd;
}

function deletarTel(num) {
  let divDel = document.createElement("div");
  divDel.setAttribute("class", "deletarNumero");

  let span = document.createElement("span");
  span.append(num.innerHTML);

  let buttonDel = document.createElement("button");
  buttonDel.setAttribute("class", "btn");
  buttonDel.setAttribute("type", "button");
  buttonDel.setAttribute("onclick", "deletar_tel(this)");
  let iconeDel = document.createElement("i");
  iconeDel.setAttribute("class", "gg-remove");

  divDel.appendChild(span);
  buttonDel.appendChild(iconeDel);
  divDel.appendChild(buttonDel);
  return divDel;
}
