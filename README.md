# URL Shortener

A full-stack URL shortener application that allows users to create shortened versions of long URLs.

## Features

- Shorten any valid URL
- Copy shortened URLs to clipboard
- Redirect from shortened URLs to original URLs
- View a list of all shortened URLs
- Track number of visits to each shortened URL
- Custom 404 page for invalid slugs

## Tech Stack

- **Frontend:** React, TypeScript, Tailwind CSS
- **Backend:** Node.js, Express.js, TypeScript
- **Database:** PostgreSQL with Prisma ORM
- **Deployment:** Docker

## Project Structure

This is a monorepo using Yarn workspaces:

```
url-shortener/
├── packages/
│   ├── backend/       # Express.js API
│   ├── frontend/      # React app
│   └── common/        # Shared types/utilities
├── docker-compose.yml
└── README.md
```

## Getting Started

## Prerequisites

- Docker
- Docker Compose

### Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/agiantsquid/url-shortener.git
   cd url-shortener
   ```

### Development

1. This repo supports running in development mode, which supports hot reloading of the front-end and backend.

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

## API Endpoints

- `POST /api/urls` - Create a shortened URL
- `GET /api/urls` - Get all URLs
- `GET /:slug` - Redirect to the original URL
