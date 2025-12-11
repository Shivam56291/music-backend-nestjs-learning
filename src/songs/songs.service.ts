import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, In, Repository } from 'typeorm';
import { Song } from './song.entity';
import { CreateSongDto } from './dto/create-song-dto';
import { UpdateResult } from 'typeorm/browser';
import {
  paginate,
  Pagination,
  IPaginationOptions,
} from 'nestjs-typeorm-paginate';
import { Artist } from 'src/artists/artist.entity';

@Injectable()
export class SongsService {
  constructor(
    @InjectRepository(Song)
    private readonly songRepository: Repository<Song>,
    @InjectRepository(Artist)
    private readonly artistRepository: Repository<Artist>,
  ) {}

  async create(songDto: CreateSongDto): Promise<Song> {
    const song = this.songRepository.create({
      title: songDto.title,
      releasedDate: songDto.releasedDate,
      duration: songDto.duration,
      lyrics: songDto.lyrics,
    });

    // Attach artists if provided
    if (songDto.artists && songDto.artists.length > 0) {
      const artists = await this.artistRepository.find({
        where: { id: In(songDto.artists) },
      });
      song.artists = artists;
    }

    return this.songRepository.save(song);
  }

  async findAll(): Promise<Song[]> {
    return this.songRepository.find();
  }

  async findOne(id: number): Promise<Song | null> {
    return this.songRepository.findOne({ where: { id } });
  }

  async remove(id: number): Promise<DeleteResult> {
    return this.songRepository.delete(id);
  }

  async update(id: number, songDto: CreateSongDto): Promise<Song> {
    const song = await this.songRepository.findOne({
      where: { id },
      relations: ['artists'], // load existing artists
    });

    if (!song) {
      throw new NotFoundException(`Song with id ${id} not found`);
    }

    // Update scalar fields only if provided
    song.title = songDto.title ?? song.title;
    song.releasedDate = songDto.releasedDate ?? song.releasedDate;
    song.duration = songDto.duration ?? song.duration;
    song.lyrics = songDto.lyrics ?? song.lyrics;

    // Update artists if provided
    if (songDto.artists && songDto.artists.length > 0) {
      const artists = await this.artistRepository.find({
        where: { id: In(songDto.artists) },
      });
      song.artists = artists;
    }

    return this.songRepository.save(song);
  }

  async paginate(options: IPaginationOptions): Promise<Pagination<Song>> {
    const queryBuilder = this.songRepository
      .createQueryBuilder('song')
      .leftJoinAndSelect('song.artists', 'artist')
      .leftJoinAndSelect('artist.user', 'user')
      .orderBy('song.releasedDate', 'DESC');
    return paginate(queryBuilder, options);
  }
}
