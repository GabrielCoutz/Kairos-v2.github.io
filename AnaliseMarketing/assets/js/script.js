var conteudoSwot;
var conteudoComposto;

$(".swot-caixa > span").innerText !== undefined
  ? (conteudoSwot = false)
  : (conteudoSwot = true);

$(".composto-caixa > span").innerText !== undefined
  ? (conteudoComposto = false)
  : (conteudoComposto = true);

switch (true) {
  case verificarURL(cripto("erro=true")):
    erroSincronizacao("../Login/login");
    limparURL(cripto("erro=true"));
    break;
  case verificarURL(cripto("sucesso=true")):
    abrirPopUp({
      cor: "green",
      titulo: "Dados alterados com êxito.",
      corpo: "Alteração realizada com sucesso",
      icone: "sucesso",
    });
    limparURL(cripto("sucesso=true"));
    break;

  case verificarURL(cripto("sucesso=false")): // janela de erro na realização da análise
    abrirPopUp({
      cor: "red",
      corpo:
        "Parece que houve um erro durante o processamento de dados. Por favor, tente novamente mais tarde ou entre em contato conosco.",
      titulo: "Análise não concluída",
      icone: "falha",
    });
    limparURL(cripto("sucesso=false"));
    break;

  case verificarURL(cripto("analise=false")): // pergunta ao usuário se deseja iniciar a análise ou se prefere fazer depois
    abrirPopUp({
      cor: "blue",
      titulo: "Análise não realizada",
      corpo:
        "Parece que você não fez nenhuma análise ainda. Gostaria de iniciá-la agora?",
      icone: "marketing",
      analise: true,
      bgFechar: false,
    });
    limparURL(cripto("analise=false"));
    break;
}

if (conteudoSwot) {
  document.querySelectorAll(".swot-caixa > span").forEach((item) => {
    item.innerHTML = item.innerText.replace(/,/g, "<br>");
  });
}

if (conteudoComposto) {
  document.querySelectorAll(".composto-caixa > span").forEach((item) => {
    item.innerHTML = item.innerText.replace(/,/g, "<br>");
  });
}
