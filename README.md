-----

# **To-Do List API**

Uma API REST simples para gerenciar tarefas, construída com Node.js, Express, TypeScript e Prisma.

-----

### **Funcionalidades**

  - **Criar** uma nova tarefa.
  - **Listar** todas as tarefas.
  - **Buscar** uma tarefa por ID.
  - **Atualizar** o título ou status de uma tarefa.
  - **Deletar** uma tarefa.

-----

### **Como Rodar o Projeto**

Siga os passos abaixo para clonar o repositório e rodar a API em sua máquina.

#### **Pré-requisitos**

Certifique-se de ter as seguintes ferramentas instaladas:

  - [Node.js](https://nodejs.org/) (versão 18 ou superior)
  - [npm](https://www.npmjs.com/)
  - [Docker](https://www.docker.com/) e [Docker Compose](https://docs.docker.com/compose/)

#### **Passo 1: Clone o Repositório**

```bash
git clone https://github.com/SEU-USUARIO/SEU-REPOSITORIO.git
cd SEU-REPOSITORIO
```

#### **Passo 2: Configure as Variáveis de Ambiente**

Crie um arquivo chamado `.env` na raiz do projeto e adicione suas variáveis de ambiente. Você pode usar o arquivo `env.example` como base.

```env
# Variáveis do Banco de Dados PostgreSQL
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/list?schema=public"
DB_USER=postgres
DB_PASSWORD=postgres
DB_NAME=list
```

*Atenção:* O `DATABASE_URL` deve estar em uma única linha.

#### **Passo 3: Inicie o Banco de Dados com Docker**

Este comando irá subir o contêiner do PostgreSQL em segundo plano.

```bash
docker-compose up -d
```

#### **Passo 4: Instale as Dependências**

Instale todas as bibliotecas necessárias para o projeto.

```bash
npm install
```

#### **Passo 5: Rode as Migrações do Banco de Dados**

Este comando irá criar a tabela `Task` no seu banco de dados e gerar o Prisma Client.

```bash
npm run prisma:migrate
```

#### **Passo 6: Inicie o Servidor**

Finalmente, inicie o servidor em modo de desenvolvimento.

```bash
npm run dev
```

O servidor estará rodando em `http://localhost:5000`.

-----

### **Endpoints da API**

| Método | URL                   | Descrição                    |
| ------ | --------------------- | ---------------------------- |
| `POST` | `/tasks`              | Cria uma nova tarefa         |
| `GET`  | `/tasks`              | Retorna todas as tarefas     |
| `GET`  | `/tasks/:id`          | Retorna uma tarefa por ID    |
| `PUT`  | `/tasks/:id`          | Atualiza uma tarefa          |
| `DELETE`| `/tasks/:id`         | Deleta uma tarefa            |

-----

### **Tecnologias Utilizadas**

  - Node.js
  - TypeScript
  - Express
  - Prisma ORM
  - PostgreSQL
  - Docker

-----

