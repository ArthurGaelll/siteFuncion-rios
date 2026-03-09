# Gerenciamento de Funcionários API
# Introdução
Este projeto consiste em uma API robusta desenvolvida em ASP.NET Core (.NET 8) para o gerenciamento de funcionários e tarefas. O objetivo principal é servir como uma ponte de comunicação entre o banco de dados relacional SQL Server e uma interface moderna em React. A motivação é aplicar conceitos de Clean Code, arquitetura de camadas e garantir uma integração fluida entre o ecossistema .NET e o front-end.

# Primeiros Passos
Siga estas instruções para configurar o projeto localmente em sua máquina de desenvolvimento.

# Processo de Instalação
Clone o repositório para sua máquina local;
Certifique-se de que o SQL Server (ou LocalDB do Visual Studio) está em execução;
Configure a sua Connection String no arquivo appsettings.json apontando para a sua instância do SQL Server.

# Dependências de Software
Para rodar esta API, você precisará de:

Visual Studio 2022 (com carga de trabalho ASP.NET instalada);
SDK do .NET 8.0;
SQL Server (Express, LocalDB ou Developer Edition);

Pacotes NuGet essenciais:
Microsoft.EntityFrameworkCore;
Microsoft.EntityFrameworkCore.SqlServer (Para conexão SQL Server);
Microsoft.EntityFrameworkCore.Tools (Para migrações);
Swashbuckle.AspNetCore (Documentação Swagger).

# Referências da API
A API utiliza o Swagger para documentação.

Ao executar o projeto (F5), a interface do Swagger abrirá automaticamente no navegador.

# Compilação e Testes
Build
Para compilar o código, use o comando:
dotnet build

Migrations e Banco de Dados (Entity Framework)
Para aplicar a estrutura das classes no seu SQL Server:

1. Abra o Console do Gerenciador de Pacotes;
2. Execute os comandos:
Add-Migration CriacaoInicial
Update-Database

# Contribuir
Faça um Fork do projeto;
Crie uma Branch para sua funcionalidade (git checkout -b feature/NovaFuncionalidade);
Faça o Commit de suas alterações (git commit -m 'Adicionando nova funcionalidade');
Abra um Pull Request.
