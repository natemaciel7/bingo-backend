# Bingo Driven - Back-end

API REST desenvolvida com Node.js e TypeScript para gerenciamento de jogos de bingo.

## 🚀 Tecnologias

- Node.js
- Express
- TypeScript
- Prisma ORM
- PostgreSQL
- Docker
- GitHub Actions (CI/CD)
- Render (deploy)

---

## Como rodar com Docker (produção local)

```bash
docker-compose up --build
```

# Como rodar em modo de desenvolvimento

docker-compose -f docker-compose-dev.yml up --build --remove-orphans

# Como rodar localmente (sem Docker)

npm install
npx prisma generate
npx prisma migrate deploy
npm run dev

# Rodar testes

npm run test:ci

# Deploy em produção

API publicada: https://back-end-dpwj.onrender.com
