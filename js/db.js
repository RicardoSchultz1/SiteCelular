// Inicializa o client do Supabase
const supabaseUrl = "https://ydehvmkkiagcypatxqfd.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlkZWh2bWtraWFnY3lwYXR4cWZkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTc2Mjc4OTIsImV4cCI6MjA3MzIwMzg5Mn0.X3SmoLTGqR2AxWPoBmn-cAno-nXegM0uIZADwn8QHNo";
const supabaseClient = supabase.createClient(supabaseUrl, supabaseKey);

// Função para buscar todos os locais
async function getLocais() {
  const { data, error } = await supabaseClient
    .from("locais")
    .select("*");

  if (error) {
    console.error("Erro ao buscar locais:", error.message);
    return [];
  }
  return data;
}

// Salvar uma nota
async function adicionarNota(localId, nota) {
  const { data, error } = await supabaseClient
    .from("notas")
    .insert([{ local_id: localId, nota }]);
  
  if (error) {
    console.error("Erro ao salvar nota:", error.message);
    return false;
  }
  return true;
}

// Buscar todos os locais com nota média
async function getLocaisComMedia() {
  const { data, error } = await supabaseClient
    .from("locais")
    .select(`
      id,
      nome,
      foto,
      notas:notas_local_id_fkey(nota)
    `);

  if (error) {
    console.error("Erro ao buscar locais:", error.message);
    return [];
  }

  // calcula a média das notas para cada local
  return data.map(local => {
    const notas = local.notas.map(n => n.nota);
    const media = notas.length ? (notas.reduce((a,b) => a+b,0)/notas.length).toFixed(1) : 0;
    return { ...local, nota: media };
  });
}

async function getRanking() {
  // Pega todos os locais com notas
  const { data, error } = await supabaseClient
    .from("locais")
    .select("id, nome, foto, notas:notas_local_id_fkey(nota)"); // ajuste o relacionamento real

  if (error) {
    console.error("Erro ao buscar ranking:", error.message);
    return [];
  }

  // calcula a média das notas para cada local
  const locaisComMedia = data.map(local => {
    const notas = (local.notas || []).map(n => n.nota);
    const media = notas.length ? notas.reduce((a,b)=>a+b,0)/notas.length : 0;
    return { ...local, media };
  });

  // ordena do maior para o menor
  locaisComMedia.sort((a,b) => b.media - a.media);

  return locaisComMedia;
}

// Função para login
async function login(email, senha) {
  const { data, error } = await supabaseClient.auth.signInWithPassword({
    email,
    password: senha
  });
  return { data, error };
}

// Função para pegar usuário logado
async function getUsuarioLogado() {
  const { data, error } = await supabaseClient.auth.getUser();
  return { data, error };
}

window.db = {
    getLocaisComMedia,
    adicionarNota,
    getLocais,
    getRanking,
    login,
    getUsuarioLogado
};
