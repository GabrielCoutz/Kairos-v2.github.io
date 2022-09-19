function scrollAnimacao() {
  const sections = Array.from(document.querySelectorAll("section")).filter(
    (item) => item.dataset.js === "scroll"
  );

  if (sections.length) {
    const windowMetade = window.innerHeight * 0.4;
    sections.forEach((item) => {
      const posicao = item.getBoundingClientRect().top;
      console.log(`${item.classList}: ${posicao}-${windowMetade}`);
      if (posicao <= windowMetade) {
        item.classList.add("ativo");
      } else if (item.classList.contains("ativo")) {
        item.classList.remove("ativo");
      }
    });

    window.addEventListener("scroll", scrollAnimacao);
  }
}

scrollAnimacao();
