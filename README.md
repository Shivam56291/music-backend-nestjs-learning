<div align="center">

# 🎵 Spotify Clone - Backend API

![NestJS](https://img.shields.io/badge/NestJS-E0234E?style=flat-square&logo=nestjs&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-4169E1?style=flat-square&logo=postgresql&logoColor=white)
![TypeORM](https://img.shields.io/badge/TypeORM-FE0803?style=flat-square&logo=typeorm&logoColor=white)

### _A learning project - Building a music streaming backend with NestJS_

</div>

---

## 📖 About

A **Spotify-inspired backend API** built while learning **NestJS**, **TypeORM**, and **PostgreSQL**. This project demonstrates CRUD operations, database relationships, and RESTful API design.

> [!NOTE]  
> This is a **hands-on learning project** for mastering NestJS fundamentals.

> [!WARNING]  
> Work in progress - basic features only. Authentication and password hashing coming soon!

---

## ✨ Current Features

- **Users** - CRUD operations, user profiles
- **Artists** - One-to-one relationship with users
- **Songs** - CRUD with many-to-many artist relationships, pagination
- **Playlists** - User playlists with song collections

---

## 🛠 Tech Stack

| Technology          | Purpose                     |
| ------------------- | --------------------------- |
| **NestJS**          | Backend framework           |
| **TypeScript**      | Programming language        |
| **PostgreSQL**      | Database                    |
| **TypeORM**         | ORM for database management |
| **class-validator** | DTO validation              |

---

## 🚀 Getting Started

### Prerequisites

- Node.js >= 18.x
- PostgreSQL >= 14.x

### Installation

```bash
# Clone the repository
git clone https://github.com/Shivam56291/music-backend-nestjs-learning.git
cd n-fundamentals-pro

# Install dependencies
npm install
```

### Configuration

Create a `.env` file:

```env
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_USER=postgres
DATABASE_PASSWORD=yourpassword
DATABASE_NAME=spotifyclone
```

### Run the Application

```bash
# Development mode
npm run start:dev
```

🎉 API running at `http://localhost:3000`

---

## 📊 Database Schema

| Table             | Description                      |
| ----------------- | -------------------------------- |
| `users`           | User accounts                    |
| `artists`         | Artist profiles (1:1 with users) |
| `songs`           | Music tracks                     |
| `playlists`       | User playlists                   |
| `songs_artists`   | Join table (songs ↔ artists)     |
| `playlists_songs` | Join table (playlists ↔ songs)   |

---

## 📝 API Endpoints

<details>
<summary><b>Users</b></summary>

| Method | Endpoint     | Description    |
| ------ | ------------ | -------------- |
| POST   | `/users`     | Create user    |
| GET    | `/users`     | List all users |
| GET    | `/users/:id` | Get user by ID |
| PUT    | `/users/:id` | Update user    |
| DELETE | `/users/:id` | Delete user    |

</details>

<details>
<summary><b>Artists</b></summary>

| Method | Endpoint       | Description      |
| ------ | -------------- | ---------------- |
| GET    | `/artists`     | List all artists |
| GET    | `/artists/:id` | Get artist by ID |

</details>

<details>
<summary><b>Songs</b></summary>

| Method | Endpoint     | Description            |
| ------ | ------------ | ---------------------- |
| POST   | `/songs`     | Create song            |
| GET    | `/songs`     | List songs (paginated) |
| GET    | `/songs/:id` | Get song by ID         |
| PUT    | `/songs/:id` | Update song            |
| DELETE | `/songs/:id` | Delete song            |

</details>

<details>
<summary><b>Playlists</b></summary>

| Method | Endpoint         | Description        |
| ------ | ---------------- | ------------------ |
| POST   | `/playlists`     | Create playlist    |
| GET    | `/playlists`     | List all playlists |
| GET    | `/playlists/:id` | Get playlist by ID |

</details>

---

## 🧪 Testing

```bash
npm run test
```

---

## � Next Steps

- [ ] Add JWT authentication
- [ ] Implement password hashing
- [ ] Add user favorites
- [ ] Build search functionality

---

## 📄 License

MIT License © 2025

---

<div align="center">

**Learning NestJS - One endpoint at a time! 🚀**

</div>
