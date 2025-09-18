// Função para carregar páginas HTML
async function loadPage(page) {
  try {
    const res = await fetch(`pages/${page}.html`);
    const html = await res.text();
    document.getElementById("content").innerHTML = html;
  } catch (err) {
    document.getElementById("content").innerHTML = "<p>Erro ao carregar a página.</p>";
  }
}

// Navegação
document.querySelectorAll("nav a").forEach(link => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    const page = link.dataset.page;
    loadPage(page);
  });
});

// Carrega a home por padrão
loadPage("home");

//////////////////////////////////////////////////////////////////////////
// Função específica para carregar a seção "Locais"
window.carregarLocais = function() {
  fetch("pages/locais.html")
    .then(res => res.text())
    .then(data => {
      document.getElementById("content").innerHTML = data;
      renderLocais();
    })
    .catch(err => console.error("Erro ao carregar Locais:", err));
};
///////////////////////////////////////////////////////////////////////////

// Função global para carregar a tela de perfil
window.carregarPerfil = function () {
  fetch("pages/perfil.html")
    .then(res => res.text())
    .then(data => {
      document.getElementById("content").innerHTML = data;
      renderPerfil();

    })
    .catch(err => console.error("Erro ao carregar Perfil:", err));
};

window.carregarHome = function() {
  fetch("pages/home.html")
    .then(res => res.text())
    .then(data => {
      document.getElementById("content").innerHTML = data;
    })
    .catch(err => console.error("Erro ao carregar Home:", err));
};

window.carregarRanking = async function() {
  try {
    const res = await fetch("pages/ranking.html");
    const html = await res.text();
    document.getElementById("content").innerHTML = html;

    // depois que o HTML carregou, renderiza os dados
    renderRanking();
  } catch (err) {
    console.error("Erro ao carregar ranking:", err);
  }
}
window.carregarPerfil = async function() {
  try {
    const res = await fetch("pages/perfil.html");
    const html = await res.text();
    document.getElementById("content").innerHTML = html;

    renderPerfil(); // inicializa eventos
  } catch (err) {
    console.error("Erro ao carregar perfil:", err);
  }
}

