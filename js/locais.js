function carregarLocais() {
  const container = document.getElementById("content"); // onde o conteúdo entra
  fetch("pages/locais.html")
    .then(res => res.text())
    .then(html => {
      container.innerHTML = html;
      renderLocais();
 
    });
}
async function renderLocais() {
  const lista = document.getElementById("locais-list");
  lista.innerHTML = "<p>Carregando locais...</p>";

  const locais = await window.db.getLocaisComMedia();

  lista.innerHTML = "";

  locais.forEach(local => {
    const item = document.createElement("div");
    item.classList.add("local-item");
    item.innerHTML = `
      <img src="${local.foto}" alt="${local.nome}">
      <div>
        <h3>${local.nome}</h3>
        <p>Nota: ${local.nota}</p>
      </div>
    `;

    item.addEventListener("click", () => abrirModal(local));
    lista.appendChild(item);
  });
}

// Modal de avaliação
function abrirModal(local) {
  const modal = document.createElement("div");
  modal.classList.add("modal");
  modal.innerHTML = `
    <div class="modal-content">
      <h2>Dar nota para ${local.nome}</h2>
      <div id="stars">
        <span class="star" data-value="1">★</span>
        <span class="star" data-value="2">★</span>
        <span class="star" data-value="3">★</span>
        <span class="star" data-value="4">★</span>
        <span class="star" data-value="5">★</span>
      </div>
      <button id="closeModal">Cancelar</button>
    </div>
  `;
  document.body.appendChild(modal);

  const stars = modal.querySelectorAll(".star");
  stars.forEach(star => {
    star.addEventListener("click", async () => {
      const value = parseInt(star.dataset.value);

      // salva no banco
      const sucesso = await window.db.adicionarNota(local.id, value);
      if (sucesso) {
        modal.remove();
        renderLocais(); // atualiza a tela com a nova média
      }
    });
  });

  modal.querySelector("#closeModal").addEventListener("click", () => {
    modal.remove();
  });
}



function fecharModal() {
  document.getElementById("avaliacao-modal").classList.add("hidden");
}
