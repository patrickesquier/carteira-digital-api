# 💰 Carteira Digital Simplificada API

API RESTful para uma Carteira Digital com foco em cadastro, autenticação segura (JWT), gerenciamento de contas e transferências financeiras entre usuários.

## 🎯 Requisitos do Projeto

Este projeto implementa as seguintes funcionalidades principais:

| Funcionalidade | Descrição |
| :--- | :--- |
| **Cadastro** | Permite o registro com nome, email e senha. |
| **Saldo Inicial** | Toda nova conta recebe um saldo inicial de **R$ 100,00**. |
| **Login Seguro** | Autenticação via email/senha que retorna um token **JWT**. |
| **Transferência** | Permite transferir valores entre contas, com verificação de saldo e atomicidade garantida por **Transações de Banco de Dados**. |
| **Histórico** | Visualização completa de transações enviadas e recebidas. |
| **Conta** | Visualização dos seus dados junto com o valor que você ainda possui em conta. |

---

## 🛠️ Configuração e Instalação

O projeto utiliza **Docker** para gerenciar o ambiente de desenvolvimento e o banco de dados **PostgreSQL**.

### 1. Pré-requisitos

* Node.js (v18+)
* Docker e Docker Compose

### 2. Variáveis de Ambiente (`.env`)

Crie um arquivo `.env` na raiz do projeto com as seguintes variáveis.

```env
# Variável Crítica de Segurança

JWT_SECRET="sua_chave_secreta_super_longa_e_aleatoria"

# Configurações do Banco de Dados (PostgreSQL via Docker)
DB_HOST=db
DB_USER=root
DB_PASSWORD=senhadificil123
DB_DATABASE=minha_carteira

DB_DATABASE_TEST=minha_carteira_teste

POSTGRES_USER=root
POSTGRES_PASSWORD=senhadificil123
POSTGRES_DB=minha_carteira

SALTROEUNDS=10

```

### 3. Execução

Use o Docker Compose para subir a aplicação e o banco de dados.

```
# 1. Constrói a imagem e sobe os contêineres em segundo plano
docker-compose up --build -d

# 2. Executa as Migrations do banco de dados (Cria as tabelas)
docker-compose run --rm api npm run migrate:latest

# O servidor da API estará disponível em: http://localhost:3000
```

## 🏗️ Estrutura da Aplicação

A arquitetura do projeto segue o padrão de Camadas Separadas para garantir alta testabilidade e manutenção:

| Diretório | Camada | Responsabilidade | Tecnologias Chave
| :--- | :--- | :--- | :--- |
| `src/api/routes` | Roteamento | Define os endpoints e aponta para o Controller correto. | Fastify, JWT Hooks, Validação Zod |
| `src/api/controllers` | Controle | Intermedeia a requisição/resposta (HTTP) e chama o Service. | Fastify (``req``, ``reply``) |
| `src/api/services` | Negócio | Contém a lógica central da aplicação (Regras de Saldo, Transações atômicas, etc.).	| Knex Transações |
| `src/database` | Dados | Configuração do Knex e todas as migrations de esquema. | Knex |
| `src/types` | Tipagem | Declarações de tipagem customizadas (Ex: Tipagem do payload JWT em ``fastify.d.ts``).	| TypeScript |

## 🔑 Endpoints Principais

| Método | Caminho | Proteção | Controller | Função | Descrição
| :--- | :--- | :--- | :--- | :--- | :--- |
| POST | ``/register`` | Pública | ``UsersController`` | register | Cria novo usuário e conta (com saldo inicial). |
| POST | ``/login`` | Pública | ``UsersController`` | login | Autentica o usuário e retorna o JWT. |
| POST | ``/logout`` | Pública | ``UsersController`` | logout | Apagar o tocken dos cookies. |
| GET | ``/account`` | JWT | ``AccountController`` | getAccount | Retorna os dados do usuário logado. |
| POST | ``/transfers`` | JWT | ``TransfersController`` | createTransfers | Executa uma transferência de conta para conta. |
| GET | ``/history`` | JWT | ``HistoryController`` | getTransfersHistory | Retorna o histórico de transações (enviadas e recebidas). |

## 🧪 Estrutura de Teste Manual

Você pode testar o fluxo completo com as seguintes etapas:

---

### **1️⃣ Criar dois usuários**

```bash
POST /register
{
  "name": "Usuário 1",
  "email": "usuario1@email.com",
  "password_hash": "12345"
}
```

```bash
POST /register
{
  "name": "Usuário 2",
  "email": "usuario2@email.com",
  "password_hash": "12345"
}
```

### **2️⃣ Fazer login em um dos usuários**

```bash
POST /login
{
  "email": "usuario1@email.com",
  "password_hash": "12345"
}
```

### **3️⃣ Consultar saldo**

```bash
GET /account
```

### **4️⃣ Criar uma transferência**

```bash
POST /transfers
{
  "receiver_email": "usuario2@email.com",
  "amount": 10,
  "description": "Primeiro envio"
}
```

### **5️⃣ Ver histórico de transações**

```bash
GET /history
```

### **6️⃣ Fazer logout**


```bash
POST /logout
```

---

## 🧱 Tecnologias Utilizadas

- **Node.js** — ambiente de execução  
- **Fastify** — framework web leve e rápido  
- **TypeScript** — tipagem estática e segurança de código  
- **Knex.js** — query builder para PostgreSQL  
- **JWT** — autenticação segura  
- **Docker** — ambiente isolado e padronizado  
- **Zod** — validação de dados  

---

## 🧩 Melhorias Futuras

- [ ] Endpoint para **depósitos e saques**
- [ ] Implementar **limite diário de transferências**
- [ ] Adicionar **Swagger** para documentação interativa da API

--- 

## 🧑‍💻 Autor

**Patrick Esquier Silvy**  
💼 Desenvolvedor 
📧 [patricksilvy.contato@gmail.com](mailto:patricksilvy.contato@gmail.com)
