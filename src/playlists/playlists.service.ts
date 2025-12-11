import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Playlist } from './playlist.entity';
import { Repository } from 'typeorm';
import { Song } from 'src/songs/song.entity';
import { User } from 'src/users/user.entity';
import { CreatePlayListDto } from './dto/create-playlist-dto';
import { In } from 'typeorm';
@Injectable()
export class PlayListsService {
  constructor(
    @InjectRepository(Playlist)
    private playListRepo: Repository<Playlist>,
    @InjectRepository(Song)
    private songsRepo: Repository<Song>,
    @InjectRepository(User)
    private userRepo: Repository<User>,
  ) {}

  async create(playListDTO: CreatePlayListDto): Promise<Playlist> {
    const playList = new Playlist();
    playList.name = playListDTO.name;

    // Fetch songs by IDs
    const songs = await this.songsRepo.find({
      where: { id: In(playListDTO.songs) },
    });

    // Check if all song IDs exist
    if (songs.length !== playListDTO.songs.length) {
      throw new NotFoundException('One or more songs do not exist');
    }

    playList.songs = songs;

    // Fetch user
    const user = await this.userRepo.findOneBy({ id: playListDTO.user });
    if (!user) {
      throw new NotFoundException(`User with id ${playListDTO.user} not found`);
    }
    playList.user = user;

    // Save playlist
    return this.playListRepo.save(playList);
  }
}
