// Seleciona o local no HTML onde os cards dos funcionários serão inseridos
const container = document.querySelector('.cards-container');
// Define a porta da API (importante para a comunicação com o Visual Studio)
const portaApi = "7083"; 

/**
 * Função assíncrona que busca a lista de todos os funcionários e gera os cards na tela
 */
async function carregarFuncionarios() {
    try {
        // Faz a requisição para a rota principal da API
        const response = await fetch(`https://localhost:${portaApi}/api/Employee`);
        const lista = await response.json(); // Converte a resposta em uma lista de objetos

        // Limpa o container antes de colocar os novos cards para não duplicar
        container.innerHTML = "";

        // Percorre cada funcionário da lista recebida
        lista.forEach(func => {
            // Cria a estrutura de HTML do card com os dados do funcionário
            const card = `
                        <div class="card">
                            <div class="card-id">${func.id}</div>
                            <h3>${func.nome}</h3>
                            <div class="card-details">${func.pais}, ${func.idade} years old</div>
                            <div class="card-job">${func.trabalho}</div>
                            <div class="card-wage">Wage: ${func.salarioAnual}</div>
                            <div class="card-actions">
                                <button class="btn-action" onclick="irParaEditar(${func.id})">Edit</button>
                                <button class="btn-action" onclick="deletar(${func.id})">Delete</button>
                            </div>
                        </div>`;
            // Adiciona o card criado dentro do container no HTML
            container.innerHTML += card;
        });
    } catch (error) {
        // Caso a API esteja desligada ou ocorra erro, mostra mensagem no console e na tela
        console.error("Erro ao carregar API:", error);
        container.innerHTML = "<p>Could not connect to the API. Make sure it's running in Visual Studio.</p>";
    }
}

/**
 * Salva o ID do funcionário selecionado e redireciona para a página de edição
 */
function irParaEditar(id) {
    localStorage.setItem('idParaEditar', id); // Salva o ID na memória temporária do navegador
    window.location.href = "edit.html"; // Redireciona para a nova página de edição
}

/**
 * Função para deletar um funcionário após confirmação do usuário
 */
async function deletar(id) {
    if (confirm("Are you sure you want to delete this employee?")) {
        // Faz a chamada de exclusão para a URL específica do funcionário
        const response = await fetch(`https://localhost:${portaApi}/api/Employee/${id}`, {
            method: 'DELETE' // Define o método HTTP como DELETE
        });
        
        // Se a exclusão no banco der certo, recarrega a lista na tela
        if (response.ok) {
            carregarFuncionarios();
        }
    }
}

// Chama a função principal para listar os funcionários assim que o script é carregado
carregarFuncionarios();