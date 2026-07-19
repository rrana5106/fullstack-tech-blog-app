# Full Stack Tech Blog App

A full-stack Tech Blog application built with **Node.js**, **Express.js**, **MySQL**, **Sequelize ORM**, **JSON Web Tokens (JWT)**, and **bcrypt**. The application allows users to register, authenticate, create blog posts, browse posts by category, and securely manage their own content through a RESTful API.

---

## 🚀 Quick Links

- **🌐 Live Demo:** https://fullstack-tech-blog-app.onrender.com
- **💻 GitHub Repository:** https://github.com/rrana5106/fullstack-tech-blog-app

> **Note:** The application is hosted on Render's free tier. If the application has been idle, the first request may take 30–60 seconds while the server wakes up.

---

## Features

- User registration and authentication
- JWT-based authorization
- Password hashing using bcrypt
- Create, Read, Update and Delete (CRUD) blog posts
- Filter posts by category
- Users can edit and delete only their own posts
- Secure RESTful API
- MySQL database using Sequelize ORM
- Seed data for local development
- Responsive browser interface served from the `public` directory

---

## Tech Stack

### Backend

- Node.js
- Express.js
- MySQL
- Sequelize ORM
- JSON Web Tokens (JWT)
- bcrypt
- dotenv

### Frontend

- HTML5
- CSS3
- JavaScript (Vanilla)

### Deployment

- Render

---

# Project Structure

```text
.
├── config/
│   └── connection.js
├── db/
│   └── schema.sql
├── models/
│   ├── category.js
│   ├── index.js
│   ├── post.js
│   └── user.js
├── public/
│   └── index.htm
├── routes/
│   ├── category.js
│   ├── index.js
│   ├── post.js
│   └── user.js
├── seeds/
│   ├── posts.json
│   └── seed.js
├── utils/
│   └── auth.js
├── .env.example
├── package.json
├── server.js
└── README.md
```

---

# Local Installation

## 1. Clone the Repository

```bash
git clone https://github.com/rrana5106/fullstack-tech-blog-app.git
cd fullstack-tech-blog-app
```

---

## 2. Install Dependencies

```bash
npm install
```

---

## 3. Create the Database

Open MySQL and execute:

```sql
SOURCE db/schema.sql;
```

Or create it manually:

```sql
CREATE DATABASE posts_db;
```

---

## 4. Configure Environment Variables

Copy `.env.example` to `.env`.

```env
DB_DATABASE=posts_db
DB_USERNAME=root
DB_PASSWORD=your_mysql_password
DB_HOST=localhost
DB_DIALECT=mysql
DB_PORT=3306

JWT_SECRET=replace_with_a_long_random_secret

PORT=3001
```

> Never commit your `.env` file.

---

## 5. Seed the Database

```bash
npm run seed
```

> **Warning:**  
> The seed script uses `sequelize.sync({ force: true })`, which deletes and recreates all database tables before inserting sample data.

---

## 6. Run the Application

Development:

```bash
npm run dev
```

Production:

```bash
npm start
```

Open:

```
http://localhost:3001
```

---

# Available Scripts

| Command | Description |
|----------|-------------|
| `npm start` | Start the application |
| `npm run dev` | Run using Nodemon |
| `npm run seed` | Seed the database |
| `npm run rebuild` | Rebuild the database |

---

# API Base URLs

### Local

```
http://localhost:3001/api
```

### Production

```
https://fullstack-tech-blog-app.onrender.com/api
```

---

# API Endpoints

## Users

| Method | Endpoint | Authentication | Description |
|---------|----------|---------------|-------------|
| POST | `/api/users` | No | Register a new user |
| POST | `/api/users/login` | No | User login |
| POST | `/api/users/logout` | No | Logout |
| GET | `/api/users` | Yes | Get all users |
| GET | `/api/users/:id` | No | Get user by ID |
| GET | `/api/users/me` | Yes | Get current user |
| PUT | `/api/users/:id` | Yes | Update current user |

---

## Posts

| Method | Endpoint | Authentication | Description |
|---------|----------|---------------|-------------|
| GET | `/api/posts` | Yes | Get all posts |
| GET | `/api/posts/:id` | No | Get post by ID |
| GET | `/api/posts?categoryId=1` | Yes | Filter posts by category |
| POST | `/api/posts` | Yes | Create a post |
| PUT | `/api/posts/:id` | Yes | Update own post |
| DELETE | `/api/posts/:id` | Yes | Delete own post |

---

## Categories

| Method | Endpoint | Authentication | Description |
|---------|----------|---------------|-------------|
| GET | `/api/categories` | No | Get all categories |
| GET | `/api/categories/:id` | No | Get category by ID |
| POST | `/api/categories` | No | Create category |
| PUT | `/api/categories/:id` | No | Update category |
| DELETE | `/api/categories/:id` | No | Delete category |

---

# Authentication

Protected routes require a JWT token.

```
Authorization: Bearer YOUR_JWT_TOKEN
```

---

## Register Example

```http
POST https://fullstack-tech-blog-app.onrender.com/api/users
Content-Type: application/json
```

```json
{
  "username": "demo-user",
  "email": "demo@example.com",
  "password": "secure-password"
}
```

---

## Login Example

```http
POST https://fullstack-tech-blog-app.onrender.com/api/users/login
Content-Type: application/json
```

```json
{
  "email": "demo@example.com",
  "password": "secure-password"
}
```

---

# Deployment (Render)

The application is deployed on Render.

**Live URL**

https://fullstack-tech-blog-app.onrender.com

---

## Render Configuration

| Setting | Value |
|----------|-------|
| Runtime | Node |
| Build Command | `npm install` |
| Start Command | `npm start` |

---

## Environment Variables

Configure the following variables in your Render dashboard:

```env
DB_DATABASE=your_database_name
DB_USERNAME=your_database_username
DB_PASSWORD=your_database_password
DB_HOST=your_database_host
DB_DIALECT=mysql
DB_PORT=3306
DB_SSL=true
JWT_SECRET=your_secure_secret
```

The application automatically uses:

```javascript
const PORT = process.env.PORT || 3001;
```

Do **not** configure a fixed production port.

---

## Production Notes

- Do **not** run `npm run seed` on a production database unless you intentionally want to erase existing data.
- Render's free tier may put the application to sleep after inactivity.
- The first request after inactivity may take around 30–60 seconds.

---

# Testing the Deployment

Application

```
https://fullstack-tech-blog-app.onrender.com
```

API Root

```
https://fullstack-tech-blog-app.onrender.com/api
```

Categories

```
https://fullstack-tech-blog-app.onrender.com/api/categories
```

Posts (Requires Authentication)

```
https://fullstack-tech-blog-app.onrender.com/api/posts
```

---

# Future Improvements

- User profile pages
- Rich text editor
- Image uploads
- Comments system
- Likes and reactions
- Search functionality
- Pagination
- Swagger / OpenAPI documentation
- Unit and integration tests
- Database migrations
- CI/CD pipeline
- Docker support

---

# License

This project is licensed under the ISC License.

---

# Author

**Rupesh Rana Magar**

- GitHub: https://github.com/rrana5106
- Repository: https://github.com/rrana5106/fullstack-tech-blog-app
- Live Demo: https://fullstack-tech-blog-app.onrender.com