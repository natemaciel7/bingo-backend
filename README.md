# Bingo Driven - Back-end

API REST desenvolvida com Node.js e TypeScript para gerenciamento de jogos de bingo.

# Tecnologias

- Node.js
- Express
- TypeScript
- Prisma ORM
- PostgreSQL
- Docker
- GitHub Actions (CI/CD)
- Render (deploy)

# Como rodar com Docker (produção local)

```bash
docker-compose up --build
```

Este comando sobe:

- PostgreSQL
- Back-end (compilado com TypeScript)

# Como rodar em modo de desenvolvimento

```bash
docker-compose -f docker-compose.dev.yml up --build --remove-orphans
```

Este comando usa `ts-node-dev` com hot reload e conexão com banco local.

# Como rodar localmente (sem Docker)

```bash
npm install
npx prisma generate
npx prisma migrate deploy
npm run dev
```

# Rodar testes

```bash
npm run test:ci
```

## Deploy em produção

- API publicada: https://back-end-dpwj.onrender.com
