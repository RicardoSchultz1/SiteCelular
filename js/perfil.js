function renderPerfil() {
  document.querySelectorAll(".perfil-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const action = btn.dataset.action;

      // Esconde todos os formulários
      document.querySelectorAll(".perfil-form").forEach(f => f.classList.add("hidden"));

      if (action === "email") {
        document.getElementById("form-email").classList.remove("hidden");
      } else if (action === "senha") {
        document.getElementById("form-senha").classList.remove("hidden");
      } else if (action === "excluir") {
        if (confirm("Tem certeza que deseja excluir seu perfil?")) {
          excluirPerfil();
        }
      }
    });
  });

  // Eventos dos formulários
  document.getElementById("btnAtualizarEmail").addEventListener("click", atualizarEmail);
  document.getElementById("btnAtualizarSenha").addEventListener("click", atualizarSenha);
}

// Supabase Auth Integration

async function atualizarEmail() {
  const email = document.getElementById("novoEmail").value.trim();
  if (!email) return alert("Informe um e-mail válido");

  const user = supabaseClient.auth.getUser(); // pega usuário logado
  const { error } = await supabaseClient.auth.updateUser({ email });

  if (error) return alert("Erro ao atualizar e-mail: " + error.message);
}

async function atualizarSenha() {
  const senha = document.getElementById("novaSenha").value;
  const confirma = document.getElementById("confirmaSenha").value;

  if (!senha || senha !== confirma) return alert("As senhas não conferem!");

  const { error } = await supabaseClient.auth.updateUser({ password: senha });

  if (error) return alert("Erro ao atualizar senha: " + error.message);
}

async function excluirPerfil() {
  const { error } = await supabaseClient.auth.deleteUser(); // deleta o usuário logado
  if (error) return alert("Erro ao excluir conta: " + error.message);
  
  alert("Perfil excluído com sucesso!");
  // redireciona para a tela de login ou home
  window.location.href = "login.html";
}
