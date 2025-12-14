# 📡 API Reference

> **Tip**: For interactive documentation, run the app and visit `http://localhost:3000/api` to see Swagger UI.

## 🔑 Authentication

| Method | Endpoint           | Description         | Auth Required |
| :----- | :----------------- | :------------------ | :------------ |
| `POST` | `/auth/signup`     | Register a new user | ❌            |
| `POST` | `/auth/login`      | Log in and get JWT  | ❌            |
| `GET`  | `/auth/enable-2fa` | Get 2FA QR Code     | ✅            |

## 🎵 Songs

| Method   | Endpoint     | Description                               | Auth Required |
| :------- | :----------- | :---------------------------------------- | :------------ |
| `GET`    | `/songs`     | List songs (supports pagination & search) | ❌            |
| `POST`   | `/songs`     | Upload/Create a new song                  | ✅ (Artist)   |
| `PUT`    | `/songs/:id` | Update song details                       | ✅ (Artist)   |
| `DELETE` | `/songs/:id` | Remove a song                             | ✅ (Artist)   |

## 🎧 Playlists

| Method | Endpoint     | Description           | Auth Required |
| :----- | :----------- | :-------------------- | :------------ |
| `POST` | `/playlists` | Create a new playlist | ✅            |
| `GET`  | `/playlists` | Get my playlists      | ✅            |

## 👤 Users

| Method | Endpoint         | Description           | Auth Required |
| :----- | :--------------- | :-------------------- | :------------ |
| `GET`  | `/users/profile` | Get current user info | ✅            |
