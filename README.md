# Full Stack Tech Blog Application

A REST API and simple web front end for a blogging platform. Users can register, log in, and manage their own blog posts, and any visitor can browse posts filtered by category.

- **Live demo:** _[add your Render URL here after deploying]_
- **GitHub repo:** https://github.com/rrana5106/fullstack-tech-blog-app

## Features

- Register, log in, and log out using JWT-based authentication.
- Create, read, update, and delete your own blog posts.
- Browse all posts, or filter posts by category.
- Only the author of a post can edit or delete it.

## Technologies Used

- **Node.js** / **Express** — REST API server
- **Sequelize** / **MySQL** — data persistence
- **jsonwebtoken** + **bcrypt** — authentication and password hashing
- **Vanilla HTML/CSS/JS** — front end (`public/`)

## Project Structure

```
config/       Sequelize database connection
models/       Sequelize models (User, Post, Category) and associations
routes/       Express route handlers (REST API, grouped by resource)
utils/        Auth helpers (JWT signing/verification middleware)
seeds/        Sample data and seeding script
public/       Static front end (HTML/CSS/JS) served by Express
server.js     App entry point
```

## Getting Started

### Local Installation

1. **Clone the repository** and navigate into the project directory.
2. **Copy the environment file:**

   ```bash
   cp .env.example .env
   ```

   Then update `.env` with your MySQL credentials and a `JWT_SECRET` of your choice.

3. **Create the database:**

   ```bash
   mysql -u root -p
   source db/schema.sql;
   quit;
   ```

4. **Install dependencies:**

   ```bash
   npm install
   ```

5. **Seed the database with sample posts:**

   ```bash
   npm run seed
   ```

6. **Run the application:**

   ```bash
   npm start
   ```

7. **Visit the application in your browser:**

   ```
   http://localhost:3001
   ```

### API Endpoints

| Method | Endpoint | Description | Auth required |
|---|---|---|---|
| POST | `/api/users` | Register a new user | No |
| POST | `/api/users/login` | Log in, returns a JWT | No |
| POST | `/api/users/logout` | Log out | No |
| GET | `/api/users/me` | Get the current logged-in user | Yes |
| GET | `/api/posts` | Get all posts (optionally `?categoryId=`) | No |
| GET | `/api/posts/:id` | Get a single post | No |
| POST | `/api/posts` | Create a post | Yes |
| PUT | `/api/posts/:id` | Update a post (owner only) | Yes |
| DELETE | `/api/posts/:id` | Delete a post (owner only) | Yes |
| GET | `/api/categories` | Get all categories | No |
| POST | `/api/categories` | Create a category | Yes |
| PUT | `/api/categories/:id` | Update a category | Yes |
| DELETE | `/api/categories/:id` | Delete a category | Yes |

## Deploying to Render

1. Create an account on [Render](https://render.com/).
2. Create a **MySQL database** (Render, PlanetScale, or another MySQL provider).
3. Create a **Web Service** pointing at this repository:
   - Build command: `npm install`
   - Start command: `npm start`
4. Add environment variables in the Render dashboard matching `.env.example`: `DB_DATABASE`, `DB_USERNAME`, `DB_PASSWORD`, `DB_HOST`, `DB_DIALECT`, `DB_PORT`, `JWT_SECRET`.
5. Deploy. Since the front end is served by the same Express app (`public/`), no separate static site is needed.

## Resources

- [Render Deployment Guide](https://render.com/docs/deploy-an-express-app)
- [Express Documentation](https://expressjs.com/)
- [Sequelize Documentation](https://sequelize.org/)
- [MySQL Documentation](https://dev.mysql.com/doc/)
