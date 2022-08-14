function alterarSenha(btn) {
  document
    .getElementsByClassName(btn.getAttribute("aria-controls"))[0]
    .classList.toggle("senha-ativa");
}
