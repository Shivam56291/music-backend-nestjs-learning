# 🛠️ Technical Overview

## 💻 Tech Stack Deep Dive

| Technology      | Category          | Usage in Project                                              |
| :-------------- | :---------------- | :------------------------------------------------------------ |
| **NestJS**      | Backend Framework | Core Application Architecture, dependency injection, modules. |
| **TypeScript**  | Language          | Static typing, interfaces, and DTOs.                          |
| **PostgreSQL**  | Database          | Relational data persistence (Users, Songs, Playlists).        |
| **TypeORM**     | ORM               | Database interaction, entity definitions, and migrations.     |
| **Passport.js** | Authentication    | Handling JWT strategies and guards.                           |
| **Swagger**     | Documentation     | Auto-generating API reference UI.                             |
| **Docker**      | DevOps            | Containerization for the database service.                    |

## 📂 Project Structure

The project follows a modular structure where each feature is self-contained.

```
src/
├── 🔐 auth/
│   ├── strategies/       # JWT & API Key strategies
│   ├── guards/           # Route protection
│   └── auth.service.ts   # Login/Signup logic
│
├── 🎵 songs/
│   ├── dtos/             # Data Transfer Objects
│   ├── song.entity.ts    # DB Schema definition
│   └── songs.service.ts  # CRUD & Search logic
│
├── 🎧 playlists/
│   ├── playlist.entity.ts
│   └── playlists.service.ts
│
├── 👤 users/             # User profile management
├── 👨‍🎤 artists/           # Artist specific logic
├── 📄 common/            # Middleware, Constants, Decorators
└── ⚙️ config/            # Environment configuration
```

## 🛡️ Security Measures

- **Password Hashing**: `bcryptjs` is used to hash passwords before storage.
- **Environment Validation**: `joi` or `class-validator` ensures all env vars are present.
- **CORS**: Configured to allow secure cross-origin requests.
