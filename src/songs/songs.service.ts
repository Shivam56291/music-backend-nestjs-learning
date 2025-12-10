import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Song } from './song.entity';
import { CreateSongDto } from './dto/create-song-dto';

@Injectable()
export class SongsService {
  constructor(
    @InjectRepository(Song)
    private readonly songRepository: Repository<Song>,
  ) {}

  async create(songDto: CreateSongDto): Promise<Song> {
    try {
      const song = this.songRepository.create(songDto);
      return await this.songRepository.save(song);
    } catch (error) {
      throw new BadRequestException('Failed to create song');
    }
  }

  async findAll(): Promise<Song[]> {
    try {
      return await this.songRepository.find();
    } catch (error) {
      throw new BadRequestException('Failed to find songs');
    }
  }
}
