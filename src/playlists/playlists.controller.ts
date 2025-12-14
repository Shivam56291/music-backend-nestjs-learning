import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { Playlist } from './playlist.entity';

import { PlayListsService } from './playlists.service';
import { CreatePlayListDto } from './dto/create-playlist-dto';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';

@ApiTags('Playlists')
@Controller('playlists')
export class PlayListsController {
  constructor(private playListService: PlayListsService) {}

  @Post()
  @ApiOperation({ summary: 'Create playlist' })
  @ApiResponse({ status: 201, description: 'It returns the created playlist' })
  @ApiResponse({ status: 400, description: 'Playlist already exists' })
  @ApiBearerAuth('JWT-auth')
  create(
    @Body(new ValidationPipe()) playlistDTO: CreatePlayListDto,
  ): Promise<Playlist> {
    return this.playListService.create(playlistDTO);
  }
}
