//Ativa e desativa o label do input

document.querySelectorAll(".form-caixa > input").forEach((input) => {
  input.addEventListener("input", (e) => {
    let label = document.querySelector("label[for=" + e.currentTarget.id + "]");
    if (input.value != "") {
      label.classList.add("label-ativo");
      label.setAttribute("aria-hidden", "false");
    } else {
      label.classList.remove("label-ativo");
      label.setAttribute("aria-hidden", "true");
    }
  });
});

//Mostra e esconde a senha

document.querySelectorAll(".gg-eye").forEach((botao) => {
  botao.addEventListener("click", (e) => {
    let target = e.currentTarget.getAttribute("aria-controls");
    let input = document.getElementById(target);
    let tipo = input.getAttribute("type") === "password" ? "text" : "password";
    input.setAttribute("type", tipo);
    botao.classList.toggle("gg-eye");
    botao.classList.toggle("gg-eye-alt");
    if (botao.classList[0].includes("gg-eye-alt")) {
      botao.setAttribute("title", "Esconder Senha");
      botao.setAttribute("aria-pressed", "true");
    } else {
      botao.setAttribute("title", "Mostrar Senha");
      botao.setAttribute("aria-pressed", "false");
    }
  });
});

//Permite somente letras com ou sem acento

function apenasLetras(event) {
  if (event.value != undefined) {
    let limpo = event.value
      .replace(/[^\w\s-zÀ-ÖØ-öø-ÿ]/gi, "")
      .replace(/[0-9]/g, "");
    event.value = limpo.replace(/_/g, "").replace("-", "");
  }
}
