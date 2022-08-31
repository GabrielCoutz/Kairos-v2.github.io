function onScroll(event) {
  let sections = document.querySelectorAll(".page-scroll");
  let scrollPos =
    window.pageYOffset ||
    document.documentElement.scrollTop ||
    document.body.scrollTop;
  for (let i = 0; i < sections.length; i++) {
    let currLink = sections[i];
    let val = currLink.getAttribute("href");
    let refElement = document.querySelector(val);
    let scrollTopMinus = scrollPos + 73;
    if (
      refElement.offsetTop <= scrollTopMinus &&
      refElement.offsetTop + refElement.offsetHeight > scrollTopMinus
    ) {
      document.querySelector(".page-scroll").classList.remove("active");
      currLink.classList.add("active");
    } else {
      currLink.classList.remove("active");
    }
  }
}

if (document.location.href.includes("index")) {
  // ativação de links da navegação por srcoll
  window.document.addEventListener("scroll", onScroll);

  window.onscroll = function () {
    let header_navbar = document.querySelector(".fundo-header");
    let sticky = header_navbar.offsetTop;
    if (window.pageYOffset > sticky) {
      header_navbar.classList.add("sticky");
    } else {
      header_navbar.classList.remove("sticky");
    }
  };
}

// botões perguntas

document.querySelectorAll(".sobre-lista > li > button").forEach((e) =>
  e.addEventListener("click", () => {
    document
      .getElementById(e.getAttribute("aria-controls"))
      .classList.toggle("pergunta-ativa");

    document
      .getElementById(e.getAttribute("aria-controls"))
      .classList.contains("pergunta-ativa")
      ? e.setAttribute("aria-expanded", true)
      : e.setAttribute("aria-expanded", false);
  })
);
