# Minha API Fastify

API REST desenvolvida com **Fastify**, **TypeScript** e **PostgreSQL**. Gerencia cursos com documentação automática via Swagger.

## 📋 Tecnologias

- **Fastify** - Framework web de alta performance
- **TypeScript** - Tipagem estática
- **PostgreSQL 17** - Banco de dados
- **Drizzle ORM** - ORM para gerenciar dados
- **Zod** - Validação de dados em runtime
- **Swagger/OpenAPI** - Documentação interativa da API

## 🚀 Quick Start

### Pré-requisitos

- Node.js (v18+)
- Docker & Docker Compose
- npm ou yarn

### 1. Clonar e instalar

```bash
git clone <seu-repositorio>
cd minha-api-fastify
npm install
```

### 2. Configurar ambiente

Crie um arquivo `.env` na raiz do projeto:

```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/minha_api_db"
```

### 3. Iniciar banco de dados

```bash
docker-compose up -d
```

### 4. Executar migrações

```bash
npm run db:migrate
```

### 5. Iniciar servidor

```bash
npm run dev
```

O servidor estará disponível em `http://localhost:3000`

## 📚 Documentação da API

Acesse a documentação interativa via Swagger:

```
http://localhost:3000/docs
```

## 🗂️ Estrutura do Projeto

```
minha-api-fastify/
├── src/
│   ├── routes/            # Rotas da API
│   │   ├── create-course.ts
│   │   ├── get-course-by-id.ts
│   │   └── get-courses.ts
│   └── database/          # Configuração do banco de dados
├── docker-compose.yml     # Configuração do Docker
├── server.ts              # Entrada da aplicação
├── tsconfig.json          # Configuração TypeScript
└── package.json           # Dependências
```

## 📝 Scripts Disponíveis

```bash
# Iniciar servidor em modo desenvolvimento (com auto-reload)
npm run dev

# Gerar migrações do banco de dados
npm run db:generate

# Executar migrações do banco de dados
npm run db:migrate
```

## 🔌 Endpoints

### Listar Cursos

```bash
GET /courses
```

### Obter Curso por ID

```bash
GET /courses/:id
```

### Criar Curso

```bash
POST /courses
Content-Type: application/json

{
  "name": "Nome do Curso",
  "description": "Descrição"
}
```

## 🐳 Docker

### Iniciar serviços

```bash
docker-compose up -d
```

### Parar serviços

```bash
docker-compose down
```

### Ver logs

```bash
docker-compose logs -f postgres
```

## 🛠️ Desenvolvimento

### Adicionar Nova Rota

1. Criar arquivo em `src/routes/`
2. Definir schema com Zod
3. Implementar handler
4. Registrar rota em `server.ts`

Exemplo:

```typescript
import { FastifyInstance } from "fastify";
import { z } from "zod";

export async function myRoute(app: FastifyInstance) {
  app.get("/my-endpoint", async (request, reply) => {
    return { message: "Hello" };
  });
}
```

## 🔒 Banco de Dados

PostgreSQL 17 rodando em container Docker com persistência de dados via volumes.

**Credenciais padrão:**

- Usuário: `postgres`
- Senha: `postgres`
- Banco: `minha_api_db`
- Porta: `5432`

## 📦 Dependências Principais

| Pacote      | Versão  | Descrição               |
| ----------- | ------- | ----------------------- |
| fastify     | ^5.11.2 | Framework web           |
| typescript  | ^7.0.2  | Linguagem tipada        |
| drizzle-orm | ^0.45.2 | ORM para banco de dados |
| zod         | ^4.4.3  | Validação de schema     |
| pg          | ^8.22.0 | Driver PostgreSQL       |

## 🚨 Troubleshooting

### Porta 5432 já em uso

```bash
docker-compose down
```

### Erro de conexão com banco

Verifique se o Docker está rodando:

```bash
docker-compose ps
```

### Migração falha

Rode manualmente:

```bash
npm run db:generate
npm run db:migrate
```

## 📄 Licença

ISC

## 👤 Autor

Kami Victoria Vilela de Souza

---
