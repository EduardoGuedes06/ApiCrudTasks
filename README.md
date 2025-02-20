
# Documentação do Sistema: API e Frontend

## Visão Geral
Este projeto consiste em um sistema de gestão de tarefas, dividido em duas partes principais: a **API** e o **Frontend**.

- **API**: Construída com **Express**, **Sequelize**, **PostgreSQL**, **Swagger**, **JWT**, entre outras.
- **Frontend**: Aplicação **React** que interage com a API para exibir e manipular tarefas.

## Arquitetura do Sistema

A arquitetura do sistema é baseada no modelo cliente-servidor, onde o frontend se comunica com a API (backend) para realizar operações de CRUD em tarefas.

![Arquitetura do Sistema](https://via.placeholder.com/500x300.png?text=Arquitetura+do+Sistema)  
*Diagrama de Arquitetura*

### Fluxo de Dados

1. O **Frontend** (React) envia solicitações para a **API** para criar, ler, atualizar ou excluir tarefas.
2. A **API** valida as solicitações, interage com o banco de dados usando **Sequelize** e retorna uma resposta ao frontend.
3. O **Frontend** exibe as tarefas e permite ao usuário realizar operações como atualizar o status ou excluir tarefas.

## API

### Descrição
Este projeto consiste em uma API construída com **Express**, **Sequelize**, **PostgreSQL**, **Swagger**, **JWT** e outras ferramentas para gerenciar tarefas e autenticação.

### Tecnologias Utilizadas
- **Express**: Framework para construção de APIs.
- **Sequelize**: ORM para interação com o banco de dados PostgreSQL.
- **PostgreSQL**: Banco de dados relacional utilizado no projeto.
- **Swagger**: Utilizado para gerar a documentação interativa da API.
- **JWT**: Utilizado para autenticação via tokens.
- **Jest**: Framework utilizado para testes.
- **Nodemon**: Utilizado para monitoramento de alterações durante o desenvolvimento.
- **Bcryptjs**: Biblioteca para realizar hash de senhas.

### Instalação

1. Instalar as dependências:

```bash
npm install express pg sequelize dotenv cors
npm install sequelize pg-hstore
npm install swagger-ui-express jsdoc
npm install swagger-jsdoc
npm install --save-dev jest supertest
npm install jsonwebtoken bcryptjs
npm install --save-dev nodemon
```

2. Configurar o ambiente:
Alterar as variáveis **DB_HOST, DB_PORT, DB_USER, DB_PASSWORD** no arquivo `.env`.

3. Executar os testes:

```bash
npm test
```

4. Acessar a documentação da API:
Inicie o servidor e acesse a URL:

[http://localhost:3000/api-docs](http://localhost:3000/api-docs)

## Frontend

### Dependências

Para instalar as dependências do frontend, execute:

```bash
npm install react-router-dom axios react-hook-form zod styled-components
npm install @types/styled-components
```

### Scripts Disponíveis

- **npm start**: Inicia o app no modo de desenvolvimento. Acesse [http://localhost:3001](http://localhost:3001) para visualizar.
- **npm test**: Executa os testes.
- **npm run build**: Cria o app para produção no diretório `build`.

### Fluxo de Operações

O frontend interage com a API para:
1. Exibir as tarefas no painel.
2. Criar novas tarefas.
3. Atualizar o status das tarefas.
4. Excluir tarefas.

## Banco de Dados

### Tabela de Tarefas

| Campo        | Tipo        | Descrição                                       |
|--------------|-------------|-------------------------------------------------|
| id           | UUID        | Identificador único da tarefa                   |
| title        | VARCHAR(255) | Título da tarefa                                |
| description  | TEXT        | Descrição da tarefa                             |
| status       | ENUM        | Status da tarefa (Pendente, Em andamento, Concluída) |
| createdAt    | TIMESTAMP   | Data e hora de criação da tarefa                |
| updatedAt    | TIMESTAMP   | Data e hora da última atualização da tarefa     |

**Diagrama da Tabela de Tarefas**  
![Diagrama do Banco de Dados](https://via.placeholder.com/500x300.png?text=Diagrama+do+Banco+de+Dados)

---

## Aprenda Mais

- Para mais informações sobre a API, consulte a [documentação do Swagger](http://localhost:3000/api-docs).
- Para aprender mais sobre o React, consulte a [documentação do React](https://reactjs.org/).
