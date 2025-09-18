document.addEventListener("DOMContentLoaded", () => {
  fetch("pages/footer.html")
    .then(res => res.text())
    .then(data => {
      document.getElementById("footer-container").innerHTML = data;

      // adiciona eventos aos botões
      document.querySelectorAll(".footer-item").forEach(item => {
        item.addEventListener("click", () => {
          const funcName = item.dataset.func;

          // verifica se a função existe no escopo global
          if (typeof window[funcName] === "function") {
            window[funcName](); // chama a função pelo nome
          } else {
            console.error(`Função ${funcName} não encontrada`);
          }
        });
      });
    })
    .catch(err => console.error("Erro ao carregar footer:", err));
});
