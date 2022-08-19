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
    $(".dados-coluna.telefone").toggle();

    var num = "'(00) 0000-00009'";
    $("#manipularNumeros").append(
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

    $(".dados-coluna.telefone").toggle();
    $("#add_tel").toggle();
    $("#del_tel").toggle();

    document.querySelectorAll(".numeros").forEach((num) => {
      $("#manipularNumeros").append(
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

  input.classList.toString().includes("vermei")
    ? alerta.add("alerta-ativo")
    : alerta.remove("alerta-ativo");
}
