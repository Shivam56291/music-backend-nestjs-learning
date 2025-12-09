import { Injectable } from '@nestjs/common';

@Injectable()
export class SongsService {
  // local db
  // local array
  private readonly songs: string[] = [];

  create(song) {
    // Save the song in the database
    this.songs.push(song);
    return this.songs;
  }

  findAll(): string[] {
    // Fetch all songs from the database
    // Errors comes while fetching the data from db
    throw new Error('Error in DB while fetching record.');
    return this.songs;
  }
}
