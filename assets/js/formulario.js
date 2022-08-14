//Ativa e desativa o label do input

document.querySelectorAll(".form-caixa > input").forEach((input) => {
  input.addEventListener("input", (e) => {
    input.value != ""
      ? document
          .querySelector("label[for=" + e.currentTarget.id + "]")
          .classList.add("label-ativo")
      : document
          .querySelector("label[for=" + e.currentTarget.id + "]")
          .classList.remove("label-ativo");
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
  });
});

//Permite somente letras com ou sem acento

function apenasLetras(event) {
  if(event.value != undefined){
      let limpo = event.value.replace(/[^\w\s-zÀ-ÖØ-öø-ÿ]/gi, '').replace(/[0-9]/g,'')
      event.value = limpo.replace('-','').replace('_','')
  }
}