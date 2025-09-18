// importa o client do supabase (troque pela sua URL e KEY)
const { createClient } = supabase;

const supabaseUrl = "https://ydehvmkkiagcypatxqfd.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlkZWh2bWtraWFnY3lwYXR4cWZkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTc2Mjc4OTIsImV4cCI6MjA3MzIwMzg5Mn0.X3SmoLTGqR2AxWPoBmn-cAno-nXegM0uIZADwn8QHNo";
const supabaseClient = createClient(supabaseUrl, supabaseKey);

const form = document.getElementById("cadastroForm");
const msg = document.getElementById("mensagem");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = document.getElementById("email").value.trim();
  const senha = document.getElementById("senha").value;
  const confirmaSenha = document.getElementById("confirmaSenha").value;

  if (!email || !senha || !confirmaSenha) {
    msg.style.color = "red";
    msg.textContent = "Preencha todos os campos!";
    return;
  }

  if (senha !== confirmaSenha) {
    msg.style.color = "red";
    msg.textContent = "As senhas não conferem!";
    return;
  }

  try {
    const { data, error } = await supabaseClient.auth.signUp({
      email: email,
      password: senha
    });

    if (error) throw error;

    msg.style.color = "green";
    msg.textContent = "Conta criada! Verifique seu e-mail para confirmar.";
    form.reset();
  } catch (err) {
    msg.style.color = "red";
    msg.textContent = "Erro: " + err.message;
  }
});
