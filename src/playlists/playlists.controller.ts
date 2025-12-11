import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { Playlist } from './playlist.entity';

import { PlayListsService } from './playlists.service';
import { CreatePlayListDto } from './dto/create-playlist-dto';
@Controller('playlists')
export class PlayListsController {
  constructor(private playListService: PlayListsService) {}

  @Post()
  create(
    @Body(new ValidationPipe()) playlistDTO: CreatePlayListDto,
  ): Promise<Playlist> {
    return this.playListService.create(playlistDTO);
  }
}
