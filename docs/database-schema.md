# 📊 Database Schema

## 🏗️ Entity Relationship Diagram (ERD)

```mermaid
erDiagram
    Users ||--o{ Playlists : "creates"
    Users ||--|| Artists : "is linked to"
    Artists }|--|{ Songs : "performs"
    Playlists }|--|{ Songs : "contains"

    Users {
        int id PK
        string email
        string password
        boolean 2FA_enabled
    }

    Songs {
        int id PK
        string title
        string url
        int playCount
        date releasedDate
    }
```

## 📋 Table Reference

| Table Name          | Description                                    | Key Relationships                         |
| :------------------ | :--------------------------------------------- | :---------------------------------------- |
| **users**           | Stores authentication and profile data.        | 1:1 with `artists`, 1:N with `playlists`. |
| **songs**           | Stores metadata and links to audio files.      | N:M with `playlists`, N:M with `artists`. |
| **playlists**       | User-created collections of songs.             | N:M with `songs`, N:1 with `users`.       |
| **artists**         | Profile for users who upload music.            | 1:1 with `users`, N:M with `songs`.       |
| **songs_artists**   | Junction table for Song-Artist relationship.   | Links `songs.id` and `artists.id`.        |
| **playlists_songs** | Junction table for Playlist-Song relationship. | Links `playlists.id` and `songs.id`.      |

## 🔄 Relationship Logic

- **Many-to-Many (Songs ↔ Playlists)**: A song can appear in multiple playlists, and a playlist contains multiple songs.
- **One-to-One (User ↔ Artist)**: A user can upgrade to an artist account, linking their data.
