async function loadNavbar() {
  try {
    const res = await fetch("pages/navbar.html");
    const html = await res.text();
    document.getElementById("navbar-container").innerHTML = html;

    // Eventos da navbar
    const userToggle = document.getElementById("userToggle");
    const dropdown = document.getElementById("dropdown");
    const logout = document.getElementById("cadastro");

    userToggle.addEventListener("click", () => {
      dropdown.classList.toggle("hidden");
    });

    document.addEventListener("click", (e) => {
      if (!e.target.closest(".user-menu")) {
        dropdown.classList.add("hidden");
      }
    });

  } catch (err) {
    console.error("Erro ao carregar a navbar:", err);
  }
}

loadNavbar();
