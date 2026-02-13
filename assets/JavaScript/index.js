// Seleciona o botão de adicionar no formulário
const btnAdd = document.querySelector('.btn-add');
// Define a porta onde sua API C# está rodando no Visual Studio
const portaApi = "7083"; 

/**
 * Garante que, ao entrar na tela de cadastro, o navegador "esqueça" 
 * qualquer ID de edição que tenha sobrado de antes.
 */
localStorage.removeItem('idParaEditar');

/**
 * Evento de clique para cadastrar um novo funcionário
 */
btnAdd.addEventListener('click', async () => {
    // Captura os valores digitados pelo usuário nas caixinhas
    const nomeValor = document.getElementById('nome').value.trim();
    const idadeValor = document.getElementById('idade').value;
    const paisValor = document.getElementById('pais').value.trim();
    const trabalhoValor = document.getElementById('trabalho').value.trim();
    const salarioValor = document.getElementById('salario').value;

    // VALIDAÇÃO: Como é um novo cadastro, todos os campos são obrigatórios
    if (!nomeValor || !idadeValor || !paisValor || !trabalhoValor || !salarioValor) {
        alert("Please fill in all fields to register a new employee!");
        return;
    }

    // Monta o objeto para enviar. No cadastro (POST), o ID é sempre 0
    const funcionarioParaEnviar = {
        id: 0, 
        nome: nomeValor,
        idade: parseInt(idadeValor), // Converte o texto da idade para número inteiro
        pais: paisValor,
        trabalho: trabalhoValor,
        salarioAnual: parseFloat(salarioValor) // Converte o texto do salário para número decimal
    };

    try {
        // Faz a requisição de criação (POST) para a API
        const response = await fetch(`https://localhost:${portaApi}/api/Funcionarios`, {
            method: 'POST', 
            headers: { 
                'Content-Type': 'application/json' 
            },
            body: JSON.stringify(funcionarioParaEnviar) 
        });

        if (response.ok) {
            alert("Employee added successfully!"); // Avisa que deu certo
            window.location.href = "employees.html"; // Redireciona para a lista de cards
        } else {
            const erroTexto = await response.text();
            console.error("API Error:", erroTexto);
            alert("Error saving. Check if the data format is correct.");
        }
    } catch (error) {
        console.error("Connection Error:", error);
        alert("Could not connect to the API. Is Visual Studio running?");
    }
});