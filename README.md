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

O servidor estará rodando em `http://localhost:3333`.

-----

### **Endpoints da API**

O prefixo **`[AUTH]`** indica que o endpoint exige o cabeçalho `Authorization: Bearer <token_jwt>`.

| Módulo | Método | URL | Descrição | Segurança |
| :---: | :---: | :---: | :---: | :---: |
| **Autenticação** | `POST` | `/auth/login` | **Login**. Gera o JWT Token. | Público |
| **Usuário** | `POST` | `/user` | **Registro**. Cria um novo usuário (role `USER` padrão). | Público |
| **Perfil** | `GET` | `/user/profile` | **[AUTH]** Retorna dados do usuário logado (Nome, Email, Role). | Protegido |
| **Senha** | `PATCH` | `/user/change-password` | **[AUTH]** Altera a senha. Exige `currentPassword` e `newPassword`. | Protegido |
| **Tarefas** | `GET` | `/task` | **[AUTH]** Lista tarefas (paginadas e filtradas pelo `userId` logado). | Protegido |
| **Tarefas** | `POST` | `/task` | **[AUTH]** Cria uma nova tarefa, vinculando-a ao usuário logado. | Protegido |
| **Tarefas** | `PATCH` | `/task/:id` | **[AUTH]** Atualiza uma tarefa **(somente se pertencer ao usuário logado)**. | Protegido |
| **Tarefas** | `DELETE` | `/task/:id` | **[AUTH]** Deleta uma tarefa **(somente se pertencer ao usuário logado)**. | Protegido |
| **Admin** | `GET` | `/user` | **[AUTH/ADMIN]** Lista todos os usuários. | Admin |
| **Admin** | `PATCH` | `/user/:id` | **[AUTH/ADMIN]** Altera o papel (`role`) de um usuário. | Admin |

-----

### **Como Rodar o Projeto Frontend (Integração)**

Com o Back-end rodando na porta **`3333`**, siga estes passos no diretório do seu projeto Front-end.

**Pré-requisitos:** O repositório do Back-end deve estar ativo em `http://localhost:3333`.

#### **Passo 1: Clonar e Instalar Dependências**

```bash
# Navegue para onde você deseja clonar o Front-end
git clone [https://github.com/emanuelbananadadev/toDoListFront.git](https://github.com/emanuelbananadadev/toDoListFront.git)
cd toDoListFront # Substitua pelo nome real do seu repositório Front-end
npm install



