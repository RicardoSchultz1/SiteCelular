async function renderRanking(containerId = "ranking-list") {
  const lista = document.getElementById(containerId);
  if (!lista) return console.error("Container não encontrado");

  lista.innerHTML = "<p>Carregando ranking...</p>";

  const locais = await window.db.getRanking();

  lista.innerHTML = "";
  locais.forEach((local, index) => {
    const item = document.createElement("div");
    item.classList.add("ranking-item");
    item.innerHTML = `
      <h3>#${index + 1} ${local.nome}</h3>
      <img src="${local.foto}" alt="${local.nome}">
      <p>Média: ${local.media.toFixed(1)}</p>
    `;
    lista.appendChild(item);
  });
}

