# RID164504_Desafio05 — Biblioteca Online

Sistema de gerenciamento de biblioteca online desenvolvido com **Node.js/Express** no back-end e **React + Vite** no front-end, com integração completa via API REST.

> **Aluno:** RID164504 | **Desafio:** 05 — DNC School

---

## 🗂️ Estrutura do Projeto

```
biblioteca-online/
├── backend/              # API Node.js/Express
│   ├── src/
│   │   └── server.js     # Servidor principal com todas as rotas
│   └── package.json
├── frontend/             # Front-end React + Vite
│   ├── src/
│   │   ├── api/
│   │   │   └── LivrosService.js   # Service de integração com a API
│   │   ├── views/
│   │   │   ├── Home/              # Página inicial
│   │   │   ├── Livros/            # Listagem de livros
│   │   │   ├── LivrosCadastro/    # Cadastro de livros
│   │   │   └── LivrosEdicao/      # Edição de livros
│   │   └── components/
│   │       ├── Header/
│   │       └── SubmenuLivros/
│   ├── vite.config.js    # Configuração com proxy para a API
│   └── package.json
└── README.md
```

---

## 🚀 Como Executar

### Pré-requisitos

- Node.js v18+ instalado
- npm v9+ instalado

### 1. Clonar o repositório

```bash
git clone <url-do-repositorio>
cd biblioteca-online
```

### 2. Iniciar o Back-end (API)

```bash
cd backend
npm install
npm start
```

A API estará disponível em: `http://localhost:3000`

Documentação Swagger: `http://localhost:3000/api-docs`

### 3. Iniciar o Front-end (React)

Em outro terminal:

```bash
cd frontend
npm install
npm start
```

O front-end estará disponível em: `http://localhost:5173`

---

## 🔌 Rotas da API

| Método | Rota | Descrição |
|--------|------|-----------|
| `GET` | `/livros` | Lista todos os livros |
| `GET` | `/livros/:id` | Busca um livro pelo ID |
| `POST` | `/livros` | Cadastra um novo livro |
| `PUT` | `/livros/:id` | Atualiza um livro existente |
| `DELETE` | `/livros/:id` | Remove um livro |

### Estrutura do Livro

```json
{
  "id": 1,
  "titulo": "Clean Code",
  "num_paginas": 464,
  "isbn": "978-0132350884",
  "editora": "Prentice Hall"
}
```

### Exemplos de Requisição

**Listar todos os livros:**
```bash
curl http://localhost:3000/livros
```

**Buscar livro por ID:**
```bash
curl http://localhost:3000/livros/1
```

**Cadastrar novo livro:**
```bash
curl -X POST http://localhost:3000/livros \
  -H "Content-Type: application/json" \
  -d '{"id":4,"titulo":"Design Patterns","num_paginas":395,"isbn":"978-0201633610","editora":"Addison-Wesley"}'
```

**Atualizar livro:**
```bash
curl -X PUT http://localhost:3000/livros/4 \
  -H "Content-Type: application/json" \
  -d '{"titulo":"Design Patterns - GoF","num_paginas":395,"isbn":"978-0201633610","editora":"Addison-Wesley"}'
```

**Deletar livro:**
```bash
curl -X DELETE http://localhost:3000/livros/4
```

---

## 🛠️ Tecnologias Utilizadas

### Back-end
- **Node.js** — Runtime JavaScript
- **Express** — Framework web minimalista
- **CORS** — Middleware para Cross-Origin Resource Sharing
- **Swagger UI + JSDoc** — Documentação interativa da API

### Front-end
- **React 18** — Biblioteca de interface de usuário
- **Vite** — Build tool e servidor de desenvolvimento
- **React Router DOM** — Roteamento client-side
- **Axios** — Cliente HTTP para consumo da API
- **Sass** — Pré-processador CSS

---

## 📋 Critérios do Desafio

| Critério | Status |
|----------|--------|
| API Node.js funcionando localmente | ✅ |
| `GET /livros` — Listar todos os livros | ✅ |
| `GET /livros/:id` — Buscar livro por ID | ✅ |
| `POST /livros` — Cadastrar livro | ✅ |
| `PUT /livros/:id` — Atualizar livro | ✅ |
| `DELETE /livros/:id` — Deletar livro | ✅ |
| Integração front-end com a API | ✅ |

---

## 📖 Documentação Interativa (Swagger)

Após iniciar o back-end, acesse a documentação interativa em:

```
http://localhost:3000/api-docs
```

A documentação Swagger permite testar todas as rotas diretamente pelo navegador, sem necessidade de ferramentas externas como Postman ou Insomnia.

---

## 👤 Autor

Desenvolvido como parte do **Desafio 05 — DNC School**.

**RID:** 164504
