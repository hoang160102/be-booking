# Node.js TypeScript MVC Base

A production-ready boilerplate for Node.js using TypeScript and MVC architecture.

## Folder Structure

```
src/
├── config/         # Configuration files (DB, env, etc.)
├── controllers/    # Request handlers
├── middlewares/    # Express middlewares
├── models/         # Data models/schemas
├── routes/         # API routes
├── services/       # Business logic
├── utils/          # Utility functions
├── app.ts          # Express app setup
└── server.ts       # Server entry point
```

## Getting Started

### Prerequisites
- Node.js (v14+)
- npm or yarn

### Installation
1. Install dependencies:
   ```bash
   npm install
   ```
2. Configure environment variables:
   - Create a `.env` file based on `.env.example` (if provided) or use the default `.env`.

### Scripts
- `npm run dev`: Start the server in development mode with auto-reload.
- `npm run build`: Build the project for production.
- `npm run start`: Start the production server.

## Technologies
- [Express](https://expressjs.com/)
- [TypeScript](https://www.typescriptlang.org/)
- [Helmet](https://helmetjs.github.io/)
- [CORS](https://github.com/expressjs/cors)
- [Dotenv](https://github.com/motdotla/dotenv)
- [Morgan](https://github.com/expressjs/morgan)
- [Compression](https://github.com/expressjs/compression)
