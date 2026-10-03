// ===== Configuração do Supabase =====
const SUPABASE_URL = "https://nalqvhbcnsorzbazszlz.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_Iwka4QCzQssVhHv-bT5fGg_U-YA0pa2";

// O CDN cria um objeto global chamado "supabase".
// Por isso o nosso cliente NÃO pode se chamar "supabase" também (dava conflito).
const { createClient } = window.supabase;
const db = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// ===== Formulário de inscrição =====
const formulario = document.getElementById('form-contato');
const statusMensagem = document.getElementById('mensagem-status');

function mostrarStatus(texto, fundo, cor) {
    statusMensagem.style.display = 'block';
    statusMensagem.style.backgroundColor = fundo;
    statusMensagem.style.color = cor;
    statusMensagem.textContent = texto;
}

formulario.addEventListener('submit', async (e) => {
    e.preventDefault(); // impede a página de recarregar

    const nome = document.getElementById('nome').value.trim();
    const email = document.getElementById('email').value.trim();
    const curso = document.getElementById('curso').value;

    mostrarStatus('Enviando dados...', '#e2e8f0', '#1e293b');

    const { error } = await db
        .from('inscricoes')
        .insert([{ nome, email, curso }]);

    if (error) {
        console.error('Erro ao inserir:', error);
        // mostra a mensagem real do Supabase para facilitar achar o problema
        mostrarStatus('Erro ao enviar inscrição: ' + error.message, '#fef2f2', '#dc2626');
    } else {
        mostrarStatus('Inscrição realizada com sucesso!', '#f0fdf4', '#16a34a');
        formulario.reset();
    }
});
