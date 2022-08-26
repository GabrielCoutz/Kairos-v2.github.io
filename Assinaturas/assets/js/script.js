if (verificarURL(cripto("erro=true"))) {
  erroSincronizacao("../Login/login");
  limparURL(cripto("erro=true"));
}

const plano = document
  .getElementById("plano-php")
  .innerText.replace("/n", "")
  .trim();

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

function mudarPlano(btn) {
  abrirJanelaPlanos(btn.value, plano);
}
