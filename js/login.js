const form = document.getElementById("loginForm");
const msg = document.getElementById("mensagem");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = document.getElementById("email").value.trim();
  const senha = document.getElementById("senha").value;

  if (!email || !senha) {
    msg.style.color = "red";
    msg.textContent = "Preencha todos os campos!";
    return;
  }

  // usa a função do db.js
  const { data, error } = await window.db.login(email, senha);

  if (error) {
    msg.style.color = "red";
  msg.textContent = "Email ou senha inválidos!";
    return;
  }

  msg.style.color = "green";
  msg.textContent = `Login efetuado com sucesso! Bem-vindo(a), ${email}`;

  // redireciona para tela principal
  setTimeout(() => {
    window.location.href = "index.html";
  }, 1000);
});
