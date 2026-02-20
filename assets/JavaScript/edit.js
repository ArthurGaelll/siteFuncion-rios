// Recupera o ID que foi salvo no navegador quando clicamos em "Edit" na outra página
const idParaEditar = localStorage.getItem('idParaEditar');
// Define a porta onde sua API C# está rodando (importante conferir no Visual Studio)
const portaApi = "7083"; 
// Objeto vazio que guardará os dados originais vindos do banco
let dadosOriginais = {};

/**
 * Função assíncrona que busca os dados do funcionário no banco de dados
 * e preenche os campos do formulário automaticamente.
 */
async function carregarDados() {
    // Faz uma requisição GET para a URL específica do funcionário usando o ID
    const response = await fetch(`https://localhost:${portaApi}/api/Employee/${idParaEditar}`);
    
    // Se a resposta for positiva (status 200), processamos os dados
    if (response.ok) {
        // Converte o corpo da resposta de JSON para um objeto JavaScript
        dadosOriginais = await response.json();
        
        // Preenche cada campo (input) do HTML com os valores que vieram da API
        document.getElementById('nome').value = dadosOriginais.nome;
        document.getElementById('idade').value = dadosOriginais.idade;
        document.getElementById('pais').value = dadosOriginais.pais;
        document.getElementById('trabalho').value = dadosOriginais.trabalho;
        document.getElementById('salario').value = dadosOriginais.salarioAnual;
    }
}

/**
 * Adiciona um "escutador" de cliques no botão de salvar.
 * Quando clicado, ele envia os novos dados para a API.
 */
document.querySelector('.btn-save').addEventListener('click', async () => {
    // Cria um objeto com os valores atuais que estão escritos nos campos da tela
    const funcionarioEditado = {
        id: parseInt(idParaEditar), // Garante que o ID seja um número inteiro
        nome: document.getElementById('nome').value,
        idade: parseInt(document.getElementById('idade').value), // Converte texto para número inteiro
        pais: document.getElementById('pais').value,
        trabalho: document.getElementById('trabalho').value,
        salarioAnual: parseFloat(document.getElementById('salario').value) // Converte texto para número decimal
    };

    // Faz a requisição de atualização (PUT) para a API
    const response = await fetch(`https://localhost:${portaApi}/api/Employee/${idParaEditar}`, {
        method: 'PUT', // Método HTTP usado para alteração completa
        headers: { 
            'Content-Type': 'application/json' // Avisa a API que estamos enviando um arquivo JSON
        },
        body: JSON.stringify(funcionarioEditado) // Transforma o objeto JavaScript em uma linha de texto JSON
    });

    // Se a API aceitar a mudança (status 200 ou 204)
    if (response.ok) {
        alert("Employee updated!"); // Avisa o usuário que deu certo
        localStorage.removeItem('idParaEditar'); // Limpa o ID da memória para não bugar futuros cadastros
        window.location.href = "employees.html"; // Redireciona o usuário de volta para a lista
    }
});

// Executa a função de carregar os dados assim que a página termina de abrir
carregarDados();