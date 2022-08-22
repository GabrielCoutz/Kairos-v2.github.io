if (verificarURL(md5("erro=true"))) {
  // erro de cadastro
  abrirjanela({
    cor: "red",
    corpo: "Erro inesperado! Por favor, faça login novamente.",
    titulo: "Conta não sincronizada",
    icone: "falha",
    semBotoes: true,
  });
  document.getElementsByClassName("principal")[0].style.display = "none";
  setTimeout(() => {
    window.location.href = "../Login/login";
  }, 3000);
  limparURL(md5("erro=true"));
}

const plano = document.getElementById("plano-php").innerText;

switch (plano) {
  case "Básico":
    document.getElementById("basico").classList.add("escolhido");
    document.querySelector(".planos-item.escolhido > button").disabled = true;
    document.querySelector(".planos-item.escolhido > button").innerHTML =
      "Plano Ativo";
    break;

  case "Médio":
    document.getElementById("medio").classList.add("escolhido");
    document.querySelector(".planos-item.escolhido > button").disabled = true;
    document.querySelector(".planos-item.escolhido > button").innerHTML =
      "Plano Ativo";
    break;

  case "Premium":
    document.getElementById("premium").classList.add("escolhido");
    document.querySelector(".planos-item.escolhido > button").disabled = true;
    document.querySelector(".planos-item.escolhido > button").innerHTML =
      "Plano Ativo";
    break;
}
