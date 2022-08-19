function removerTelefoneAdicional(elemento) {
  elemento.closest(".adicionarNumero").remove();
}

const caixa = document.createElement('div')
caixa.setAttribute('class', 'adicionarNumero')

const input = document.createElement('input')
input.setAttribute('type', 'text')
input.setAttribute('placeholder', '(00) 0000-00000')
input.setAttribute('class', 'adicionar')
input.setAttribute('onkeypress', '$(this).mask("(00) 0000-000009")')
input.setAttribute('onkeyup', 'verificarTelefone(this)')

const button = document.createElement('button')
button.setAttribute('class', 'btn')
button.setAttribute('type', 'button')
button.setAttribute('onclick', 'removerTelefoneAdicional(this)')

caixa.appendChild(input)
caixa.appendChild(button)

console.log(caixa)


$(function () {
  // código para adicionar/remover números de telefone

  $("#add_tel").click(function () {
    cancelarbtn.disabled = false;

    if (document.getElementById("del_tel").style.display != "none") {
      $("#del_tel").toggle();
    }
    $(".dados-coluna.telefone").toggle();


    
    $("#manipularNumeros").append(caixa);});

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
