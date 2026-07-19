# Full Stack Tech Blog App

A full-stack RESTful Tech Blog application built with **Node.js**, **Express**, **MySQL**, and **Sequelize**. The application provides secure user authentication using JSON Web Tokens (JWT) and allows authenticated users to create, manage, and organize blog posts by category.

---

## Features

* User registration and login
* JWT-based authentication
* Password hashing with bcrypt
* Create, read, update, and delete (CRUD) blog posts
* Organize posts by category
* User authorization (users can only edit/delete their own posts)
* RESTful API architecture
* MySQL database with Sequelize ORM
* Seed data for testing

---

## Tech Stack

### Backend

* Node.js
* Express.js
* Sequelize ORM
* MySQL
* JSON Web Tokens (JWT)
* bcrypt
* dotenv

### Development Tools

* Nodemon
* Git
* npm

---

## Project Structure

```text
.
├── config/
│   └── connection.js
├── db/
│   └── schema.sql
├── models/
│   ├── user.js
│   ├── post.js
│   ├── category.js
│   └── index.js
├── public/
│   ├── index.htm
│   └── assets/
├── routes/
│   ├── user.js
│   ├── post.js
│   ├── category.js
│   └── index.js
├── seeds/
│   ├── seed.js
│   └── posts.json
├── utils/
│   └── auth.js
├── server.js
├── package.json
└── .env.example
```

---

## Installation

### 1. Clone the repository

```bash
git clone https://github.com/rrana5106/fullstack-tech-blog-app.git  
```

### 2. Navigate into the project

```bash
cd fullstack-tech-blog-app
```

### 3. Install dependencies

```bash
npm install
```

---

## Environment Variables

Create a `.env` file in the project root.

```env
DB_DATABASE=posts_db
DB_USERNAME=root
DB_PASSWORD=your_password
DB_HOST=localhost
DB_DIALECT=mysql
DB_PORT=3306

JWT_SECRET=your_secret_key

PORT=3001
```

---

## Database Setup

Create the MySQL database.

```sql
SOURCE db/schema.sql;
```

Alternatively:

```sql
CREATE DATABASE posts_db;
```

---

## Seed the Database

Populate the database with sample data.

```bash
npm run seed
```

---

## Running the Application

Development mode:

```bash
npm run dev
```

Start normally:

```bash
npm start
```

Rebuild the database:

```bash
npm run rebuild
```

The server runs at:

```
http://localhost:3001
```

---

# API Endpoints

## Authentication

### Register

```
POST /api/users
```

### Login

```
POST /api/users/login
```

### Current User

```
GET /api/users/me
```

Requires JWT Authentication.

---

## Users

| Method | Endpoint         | Description               |
| ------ | ---------------- | ------------------------- |
| GET    | `/api/users`     | Get all users             |
| GET    | `/api/users/:id` | Get user by ID            |
| PUT    | `/api/users/:id` | Update authenticated user |

---

## Posts

| Method | Endpoint         | Description     |
| ------ | ---------------- | --------------- |
| GET    | `/api/posts`     | Get all posts   |
| GET    | `/api/posts/:id` | Get post by ID  |
| POST   | `/api/posts`     | Create post     |
| PUT    | `/api/posts/:id` | Update own post |
| DELETE | `/api/posts/:id` | Delete own post |

Optional filtering:

```
GET /api/posts?categoryId=1
```

---

## Categories

| Method | Endpoint              | Description        |
| ------ | --------------------- | ------------------ |
| GET    | `/api/categories`     | Get all categories |
| GET    | `/api/categories/:id` | Get category       |
| POST   | `/api/categories`     | Create category    |
| PUT    | `/api/categories/:id` | Update category    |
| DELETE | `/api/categories/:id` | Delete category    |

---

## Authentication

Protected routes require an Authorization header.

```
Authorization: Bearer YOUR_JWT_TOKEN
```

---

## Database Relationships

* One User can create many Posts.
* One Category can contain many Posts.
* Each Post belongs to one User.
* Each Post belongs to one Category.

---

## Available Scripts

```bash
npm start
```

Starts the application.

```bash
npm run dev
```

Starts the application with Nodemon.

```bash
npm run seed
```

Seeds the database.

```bash
npm run rebuild
```

Drops and recreates database tables before starting.

---

## Future Improvements

* Frontend built with React
* Rich text editor
* Image uploads
* Search functionality
* Comments system
* Likes and reactions
* User profiles
* Pagination
* Swagger/OpenAPI documentation
* Unit and integration testing
* Docker support
* CI/CD pipeline

---

## License

This project is licensed under the ISC License.

---

## Author

Developed as a Full Stack Node.js project demonstrating:

* RESTful API development
* Authentication and authorization
* Sequelize ORM
* MySQL database design
* Express.js backend development
* Secure password management using bcrypt
* JWT-based user authentication
