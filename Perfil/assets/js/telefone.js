function removerTelefoneAdicional(elemento) {
  elemento.closest(".adicionarNumero").remove();
}

$(function () {
  // código para adicionar/remover números de telefone

  $("#add_tel").click(function () {
    cancelarbtn.disabled = false;

    if (document.getElementById("del_tel").style.display != "none") {
      $("#del_tel").toggle();
    }

    var num = "'(00) 0000-00009'";
    $(".telefone").append(
      "" +
        '<div class="adicionarNumero">' +
        '<input type="tel" placeholder="(00) 0000-00000" class="adicionar" onkeypress="$(this).mask(' +
        num +
        ')"/ onkeyup="verificarTelefone(this)">' +
        '<button class="btn" type="button" onclick="removerTelefoneAdicional(this)"><i class="gg-remove remove"></button>' +
        "</div>"
    );
  });

  $("#del_tel").click(function () {
    Cookies.set("excluir_num", 1);
    cancelarbtn.disabled = false;

    document.querySelectorAll(".numeros").forEach((num) => {
      num.style.display != "none"
        ? (num.style.display = "none")
        : (num.style.display = "initial");
    });
    $("#add_tel").toggle();
    $("#del_tel").toggle();

    document.querySelectorAll(".numeros").forEach((num) => {
      $(".telefone").append(
        '<div class="deletarNumero"' +
          " ><span>" +
          num.innerHTML +
          '</span><button class="btn" type="button" onclick="deletar_tel(this)"' +
          '><i class="gg-remove remove"></i></button>' +
          "</div>"
      );
    });
  });
});

function deletar_tel(tel) {
  let anterior = tel.previousElementSibling;

  anterior.classList.toggle("deletar");
  anterior.classList[0] === "deletar"
    ? (salvarbtn.disabled = false)
    : (salvarbtn.disabled = true);
}

function verificarTelefone(input) {
  if (input.value.length == 15) {
    input.classList.remove("vermei");
    salvarbtn.disabled = false;
  } else {
    input.classList.add("vermei");
    salvarbtn.disabled = true;
  }
}

function verificar_input() {
  // se ouver entrada nos inputs, o botão de salvar é liberado

  for (item of document.getElementsByClassName("adicionar")) {
    // impede que o usuário salve o telefone adicionado sem que o mesmo esteja completo, com 15 dígitos
    if (item.value.length < 15) {
      item.classList.add("vermei");
      document.getElementById("salvarbtn").disabled = true;
      break;
    } else {
      document.getElementById("salvarbtn").disabled = false;
      item.classList.remove("vermei");
    }
  }
}
