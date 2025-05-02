# Yarn TypeScript Monorepo

A monorepo template using Yarn workspaces and TypeScript, featuring a shared common package, backend API, and frontend application.
This supports hot reloading (even for shared packages) for development.

## Project Structure

```
yarn-ts-monorepo/
├── packages/
│   ├── common/          # Shared types and utilities
│   ├── backend/         # Express.js API server
│   └── frontend/        # React frontend application
├── package.json         # Root package.json
├── tsconfig.json        # Root TypeScript configuration
└── docker-compose.yml   # Docker Compose configuration
```

## Prerequisites

- Docker
- Docker Compose

## Getting Started

1. Clone the repository:

```bash
git clone <repository-url>
cd yarn-ts-monorepo
```

## Development

This repo supports running in development mode, which supports hot reloading of the front-end and backend.

```bash
docker compose --profile dev up --build
```

When running in development mode, the frontend and backend run in a single container.
The files on your local machine get volume mounted into the container.
This allows you to make changes locally, and have them immediately update the running stack.
You can even make changes in the common package, and see these changes immediately as well.

## Running Production Stack

This repo also supports a more "production" like run mode, where the frontend and backend run in separate containers running compiled code.

```bash
docker compose --profile prod up --build
```

This will start:

- Frontend: http://localhost:3000
- Backend API: http://localhost:5000

### Common Package

The common package contains shared types and utilities used by both the frontend and backend.

### Backend

The backend is an Express.js server that provides a REST API. Features:

- TypeScript support
- CORS enabled for frontend development
- Shared types from common package

### Frontend

The frontend is a React application built with Vite. Features:

- TypeScript support
- React Router for navigation
- Shared types from common package

## Available Scripts

### Docker Compose

- `docker compose --profile dev up` - Start up development container
- `docker compose --profile dev up --build` - Rebuild and start development container
- `docker compose --profile prod up` - Start up production containers
- `docker compose --profile prod up --build` - Rebuild and start up production container
- `docker compose down` - Stop all services

## TypeScript Configuration

The project uses a base TypeScript configuration in the root `tsconfig.json` that is extended by each package.
This ensures consistent TypeScript settings across the monorepo.
