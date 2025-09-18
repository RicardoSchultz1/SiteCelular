// Função central para carregar páginas
async function loadPage(page) {
  try {
    const res = await fetch(`pages/${page}.html`);
    if (!res.ok) throw new Error("Página não encontrada");
    const html = await res.text();
    document.getElementById("content").innerHTML = html;
  } catch (err) {
    document.getElementById("content").innerHTML = `<p>Erro: ${err.message}</p>`;
  }
}

// Carrega a home ao iniciar
document.addEventListener("DOMContentLoaded", () => {
  loadPage("home");
});
