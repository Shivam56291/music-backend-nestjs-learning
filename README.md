<div align="center">

# 🎵 Spotify Clone Backend 

![NestJS](https://img.shields.io/badge/NestJS-E0234E?style=for-the-badge&logo=nestjs&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-4169E1?style=for-the-badge&logo=postgresql&logoColor=white)

### **A Scalable Music Streaming API**

_Built with performance and architecture in mind._

[Getting Started](#-getting-started) • [Documentation](#-documentation) • [Features](#-features)

</div>

---

## 🚀 Overview

This is a **BCA capstone learning project** implementing a robust backend for a music streaming service. It simulates core Spotify functionalities like **User Authentication**, **Song Management**, **Dynamic Playlists**, and **Search**.

It is designed to demonstrate **Enterprise-Ready** architectural patterns using **NestJS**.

---

## 📚 Documentation

We have organized the project details into dedicated sections:

| 📘 Section                                             | 📝 Description                                       |
| :----------------------------------------------------- | :--------------------------------------------------- |
| [**System Architecture**](./docs/architecture.md)      | High-level modules and request flow diagram.         |
| [**Technical Overview**](./docs/technical-overview.md) | Deep dive into the Tech Stack and Project Structure. |
| [**Database Schema**](./docs/database-schema.md)       | ER Diagrams and Table relationships.                 |
| [**API Reference**](./docs/api-reference.md)           | List of available endpoints and usage.               |

---

## ✨ Features at a Glance

- **🔐 Secure Auth**: JWT-based stateless authentication with 2FA support.
- **🔍 Smart Search**: Find songs instantly by title.
- **🎧 Playlist Logic**: Full Many-to-Many relationship support for songs and playlists.
- **⚡ Performance**: Pagination processing for large datasets.

---

## 🏁 Getting Started

### 1. Installation

```bash
git clone https://github.com/Shivam56291/music-backend-nestjs-learning.git
cd n-fundamentals-pro
npm install
```

### 2. Environment Setup

Create a `.env` file (see [Technical Overview](./docs/technical-overview.md) for details) and run migrations:

```bash
npm run migration:run
```

### 3. Run Server

```bash
npm run start:dev
```

Visit **[http://localhost:3000/api](http://localhost:3000/api)** for the interactive Swagger UI.

---

<div align="center">

**Student Project | Built with ❤️ using NestJS**

</div>
