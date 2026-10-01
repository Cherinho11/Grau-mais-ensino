// 1. Configuração do Supabase
// Substitui com os dados reais do teu projeto do Supabase (Project Settings > API)
const SUPABASE_URL = "https://nalqvhbcnsorzbazszlz.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_Iwka4QCzQssVhHv-bT5fGg_U-YA0pa2";

const supabase = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// 2. Função para carregar dados do banco de dados (Exemplo prático para a matéria)
async function carregarCursosDoBanco() {
    try {
        // Exemplo: Procura uma tabela chamada 'cursos' e seleciona a coluna 'nome'
        const { data, error } = await supabase
            .from('cursos')
            .select('nome');

        if (error) throw error;

        // Se encontrar dados no banco, atualiza a lista do HTML dinamicamente
        if (data && data.length > 0) {
            const ul = document.querySelector('main section:nth-child(2) ul');
            ul.innerHTML = ''; // Limpa a lista estática atual

            data.forEach(curso => {
                const li = document.createElement('li');
                li.textContent = curso.nome;
                ul.appendChild(li);
            });
        }
    } catch (error) {
        console.error("Erro ao ligar ao Supabase:", error.message);
        // Se der erro (ou se ainda não criaste a tabela), o site mantém a lista padrão do HTML
    }
}

// Executa a função assim que a página carregar
document.addEventListener('DOMContentLoaded', () => {
    console.log("Site minimalista carregado com sucesso!");
    // Descomente a linha abaixo quando tiver a tabela criada no Supabase:
    // carregarCursosDoBanco();
});
