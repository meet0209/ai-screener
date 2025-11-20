# AI Screener

Automated MERN + AI hiring and screening platform.

## Stack
- React + TypeScript + Vite + React Query + Zustand
- Node.js + Express + TypeScript
- MongoDB + Mongoose
- Redis + BullMQ workers
- OpenAI integration with pluggable provider interface
- Docker & docker-compose
- Jest (backend) and Vitest (frontend)
- GitHub Actions CI

## Getting Started

`ash
npm install --prefix backend
npm install --prefix frontend
`

### Development

`ash
npm run dev --prefix backend
npm run workers --prefix backend
npm run dev --prefix frontend
`

### Tests & Lint

`ash
npm test --prefix backend
npm run lint --prefix backend
npm run test --prefix frontend
npm run lint --prefix frontend
`

### Docker

`ash
docker-compose up --build
`

Services:
- Backend: http://localhost:5000
- Frontend: http://localhost:5173
- Swagger Docs: http://localhost:5000/api/docs

## Environment Variables

See ackend/src/config/env.ts for defaults. Provide OPENAI_API_KEY for AI flows.

## CI

GitHub Actions pipeline validates install, lint and tests for both frontend and backend.
