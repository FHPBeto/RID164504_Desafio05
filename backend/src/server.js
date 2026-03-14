const express = require('express');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');

const app = express();
const PORT = 3000;

// ─── Middlewares ──────────────────────────────────────────────────────────────
app.use(cors());
app.use(express.json());

// ─── Banco de dados em memória ────────────────────────────────────────────────
let livros = [
  {
    id: 1,
    titulo: 'O Senhor dos Anéis',
    num_paginas: 1178,
    isbn: '978-8533613379',
    editora: 'Martins Fontes'
  },
  {
    id: 2,
    titulo: 'Dom Casmurro',
    num_paginas: 256,
    isbn: '978-8535910663',
    editora: 'Penguin Companhia'
  },
  {
    id: 3,
    titulo: 'Clean Code',
    num_paginas: 464,
    isbn: '978-0132350884',
    editora: 'Prentice Hall'
  }
];

// ─── Configuração do Swagger ──────────────────────────────────────────────────
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API Biblioteca Online',
      version: '1.0.0',
      description:
        'API REST para gerenciamento de livros de uma biblioteca online. Permite criar, listar, atualizar e deletar livros.',
      contact: {
        name: 'Biblioteca Online',
        email: 'contato@biblioteca.com'
      }
    },
    servers: [
      {
        url: `http://localhost:${PORT}`,
        description: 'Servidor de Desenvolvimento'
      }
    ],
    components: {
      schemas: {
        Livro: {
          type: 'object',
          required: ['id', 'titulo', 'num_paginas', 'isbn', 'editora'],
          properties: {
            id: {
              type: 'integer',
              description: 'Identificador único do livro',
              example: 1
            },
            titulo: {
              type: 'string',
              description: 'Título do livro',
              example: 'Clean Code'
            },
            num_paginas: {
              type: 'integer',
              description: 'Número de páginas do livro',
              example: 464
            },
            isbn: {
              type: 'string',
              description: 'Código ISBN do livro',
              example: '978-0132350884'
            },
            editora: {
              type: 'string',
              description: 'Nome da editora',
              example: 'Prentice Hall'
            }
          }
        },
        LivroInput: {
          type: 'object',
          required: ['id', 'titulo', 'num_paginas', 'isbn', 'editora'],
          properties: {
            id: {
              type: 'integer',
              description: 'Identificador único do livro',
              example: 4
            },
            titulo: {
              type: 'string',
              description: 'Título do livro',
              example: 'The Pragmatic Programmer'
            },
            num_paginas: {
              type: 'integer',
              description: 'Número de páginas do livro',
              example: 352
            },
            isbn: {
              type: 'string',
              description: 'Código ISBN do livro',
              example: '978-0135957059'
            },
            editora: {
              type: 'string',
              description: 'Nome da editora',
              example: 'Addison-Wesley'
            }
          }
        },
        Mensagem: {
          type: 'object',
          properties: {
            mensagem: {
              type: 'string',
              example: 'Operação realizada com sucesso'
            }
          }
        },
        Erro: {
          type: 'object',
          properties: {
            mensagem: {
              type: 'string',
              example: 'Livro não encontrado'
            }
          }
        }
      }
    }
  },
  apis: ['./src/server.js']
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, {
  customCss: '.swagger-ui .topbar { background-color: #1a1a2e; }',
  customSiteTitle: 'API Biblioteca Online - Docs'
}));

// ─── Rota raiz ────────────────────────────────────────────────────────────────
app.get('/', (req, res) => {
  res.json({
    mensagem: 'API Biblioteca Online está funcionando!',
    versao: '1.0.0',
    documentacao: `http://localhost:${PORT}/api-docs`,
    rotas: {
      'GET /livros': 'Listar todos os livros',
      'GET /livros/:id': 'Buscar livro por ID',
      'POST /livros': 'Criar novo livro',
      'PUT /livros/:id': 'Atualizar livro',
      'DELETE /livros/:id': 'Deletar livro'
    }
  });
});

// ─── ROTAS DA API ─────────────────────────────────────────────────────────────

/**
 * @swagger
 * /livros:
 *   get:
 *     summary: Lista todos os livros
 *     tags: [Livros]
 *     description: Retorna uma lista com todos os livros cadastrados na biblioteca.
 *     responses:
 *       200:
 *         description: Lista de livros retornada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Livro'
 */
app.get('/livros', (req, res) => {
  return res.status(200).json(livros);
});

/**
 * @swagger
 * /livros/{id}:
 *   get:
 *     summary: Busca um livro pelo ID
 *     tags: [Livros]
 *     description: Retorna os dados de um livro específico com base no ID fornecido.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID único do livro
 *         example: 1
 *     responses:
 *       200:
 *         description: Livro encontrado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Livro'
 *       404:
 *         description: Livro não encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Erro'
 */
app.get('/livros/:id', (req, res) => {
  const id = Number(req.params.id);
  const livro = livros.find((l) => l.id === id);

  if (!livro) {
    return res.status(404).json({ mensagem: `Livro com ID ${id} não encontrado.` });
  }

  return res.status(200).json(livro);
});

/**
 * @swagger
 * /livros:
 *   post:
 *     summary: Cadastra um novo livro
 *     tags: [Livros]
 *     description: Cria um novo registro de livro na biblioteca com os dados fornecidos.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LivroInput'
 *     responses:
 *       201:
 *         description: Livro cadastrado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               example: Livro cadastrado com sucesso!
 *       400:
 *         description: Dados inválidos ou incompletos
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Erro'
 *       409:
 *         description: Conflito - ID já existe
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Erro'
 */
app.post('/livros', (req, res) => {
  const { id, titulo, num_paginas, isbn, editora } = req.body;

  // Validação dos campos obrigatórios
  if (!id || !titulo || !num_paginas || !isbn || !editora) {
    return res.status(400).json({
      mensagem: 'Todos os campos são obrigatórios: id, titulo, num_paginas, isbn, editora.'
    });
  }

  // Verificar se o ID já existe
  const idExistente = livros.find((l) => l.id === Number(id));
  if (idExistente) {
    return res.status(409).json({
      mensagem: `Já existe um livro com o ID ${id}. Utilize um ID diferente.`
    });
  }

  const novoLivro = {
    id: Number(id),
    titulo: String(titulo),
    num_paginas: Number(num_paginas),
    isbn: String(isbn),
    editora: String(editora)
  };

  livros.push(novoLivro);
  return res.status(201).json('Livro cadastrado com sucesso!');
});

/**
 * @swagger
 * /livros/{id}:
 *   put:
 *     summary: Atualiza um livro existente
 *     tags: [Livros]
 *     description: Atualiza os dados de um livro já cadastrado com base no ID fornecido.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID único do livro a ser atualizado
 *         example: 1
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LivroInput'
 *     responses:
 *       200:
 *         description: Livro atualizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensagem:
 *                   type: string
 *                   example: Livro atualizado com sucesso!
 *                 livro:
 *                   $ref: '#/components/schemas/Livro'
 *       400:
 *         description: Dados inválidos ou incompletos
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Erro'
 *       404:
 *         description: Livro não encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Erro'
 */
app.put('/livros/:id', (req, res) => {
  const id = Number(req.params.id);
  const { titulo, num_paginas, isbn, editora } = req.body;

  // Validação dos campos obrigatórios
  if (!titulo || !num_paginas || !isbn || !editora) {
    return res.status(400).json({
      mensagem: 'Todos os campos são obrigatórios: titulo, num_paginas, isbn, editora.'
    });
  }

  const index = livros.findIndex((l) => l.id === id);

  if (index === -1) {
    return res.status(404).json({ mensagem: `Livro com ID ${id} não encontrado.` });
  }

  livros[index] = {
    id,
    titulo: String(titulo),
    num_paginas: Number(num_paginas),
    isbn: String(isbn),
    editora: String(editora)
  };

  return res.status(200).json({
    mensagem: 'Livro atualizado com sucesso!',
    livro: livros[index]
  });
});

/**
 * @swagger
 * /livros/{id}:
 *   delete:
 *     summary: Deleta um livro
 *     tags: [Livros]
 *     description: Remove permanentemente um livro da biblioteca com base no ID fornecido.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID único do livro a ser deletado
 *         example: 1
 *     responses:
 *       200:
 *         description: Livro deletado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Mensagem'
 *       404:
 *         description: Livro não encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Erro'
 */
app.delete('/livros/:id', (req, res) => {
  const id = Number(req.params.id);
  const index = livros.findIndex((l) => l.id === id);

  if (index === -1) {
    return res.status(404).json({ mensagem: `Livro com ID ${id} não encontrado.` });
  }

  const livroRemovido = livros.splice(index, 1)[0];
  return res.status(200).json({
    mensagem: `Livro "${livroRemovido.titulo}" deletado com sucesso!`
  });
});

// ─── Rota 404 para rotas não encontradas ──────────────────────────────────────
app.use((req, res) => {
  res.status(404).json({ mensagem: 'Rota não encontrada.' });
});

// ─── Inicialização do servidor ────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`\n🚀 API Biblioteca Online rodando em: http://localhost:${PORT}`);
  console.log(`📚 Documentação Swagger: http://localhost:${PORT}/api-docs`);
  console.log(`\nRotas disponíveis:`);
  console.log(`  GET    http://localhost:${PORT}/livros`);
  console.log(`  GET    http://localhost:${PORT}/livros/:id`);
  console.log(`  POST   http://localhost:${PORT}/livros`);
  console.log(`  PUT    http://localhost:${PORT}/livros/:id`);
  console.log(`  DELETE http://localhost:${PORT}/livros/:id`);
});

module.exports = app;
