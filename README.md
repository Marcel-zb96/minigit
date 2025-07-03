<p align="center">
    <h1 align="center">MINIGIT</h1>
</p>

## Project Title & Description

This project is a full-stack application made for learning purposes built with a TypeScript backend (NestJS) and a TypeScript frontend (Next.js). The project structure follows a monorepo approach, managed by Turbo.

## Prerequisites & Dependencies

Before you begin, ensure you have the following installed:

- **Node.js:** (Version >= 16 is recommended)
- **npm:** (npm >= 8)
- **Docker (optional):** For running database

## Installation & Setup Instructions

Follow these steps to set up the project:

1.  **Clone the repository:**

    ```bash
    git clone git@github.com:Marcel-zb96/minigit.git
    cd minigit
    ```

2.  **Install dependencies:**

    ```bash
    npm install # or yarn install
    ```

3.  **Configure Backend Environment:**

    - Copy `.env.example` to `.env` inside the `backend` directory:

      ```bash
      cp backend/.env.example backend/.env
      ```

    - Update the `.env` file with appropriate values (database connection string, etc.).

    - Copy `.env.example` to `.env` inside the `frontend` directory:

      ```bash
      cp frontend/.env.example backend/.env
      ```

    - Update the `.env` file with appropriate values (database connection string, etc.).


4.  **Setup Database:**
    - Using Docker (Recommended):

      ```bash
      # Example:
      # docker run --name postgres -p 5432:5432 -e POSTGRES_USER=youruser -e POSTGRES_PASSWORD=yourpassword -e POSTGRES_DB=yourdb -d postgres
      ```
    - OR, using a local PostgreSQL instance

5. **Setup cache (Redis)**

    - Using Docker (Recommended):
    ```bash
    # Example:
    # docker run --name redis -p 6379:6379 -d redis
    ```

6. **Run Prisma Migrations:**
   ```bash
   cd backend
   npx prisma migrate dev
   ```
   This will create or update the database schema based on the `prisma/schema.prisma` file.

7. **Run application with Turbo**

    run the following command on the root directory: 
    ```bash
    npm run dev
    ```

8. **Seed the database**

    You have to have a Personal Access Token for Github.
    The token should be in the .env fil in the backend directory
    
    After starting the application start a HTTP call the following route:
   
        http://localhost:3987/api/v1/sync?org=facebook
