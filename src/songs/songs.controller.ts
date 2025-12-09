import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Inject,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Put,
} from '@nestjs/common';
import { SongsService } from './songs.service';
import { CreateSongDto } from './dto/create-song-dto';
import type { Connection } from 'src/common/constants/connection';

@Controller('songs')
export class SongsController {
  constructor(
    private readonly songsService: SongsService,
    @Inject('CONNECTION') private readonly connection: Connection,
  ) {
    console.log(`This is Connection: ${this.connection.CONNECTION_STRING}`);
  }

  @Get()
  findAll() {
    try {
      return this.songsService.findAll();
    } catch (error) {
      throw new HttpException(
        'server error',
        HttpStatus.INTERNAL_SERVER_ERROR,
        error,
      );
    }
  }

  @Get(':id')
  findOne(
    @Param(
      'id',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    id: number,
  ) {
    return `Fetch song on the based on id: ${id}`;
  }

  @Post()
  create(@Body() createSongDto: CreateSongDto) {
    return this.songsService.create(createSongDto);
  }

  @Delete(':id')
  delete() {
    return 'Remove song on the based on id';
  }

  @Put(':id')
  update() {
    return 'Update song on the based on id';
  }
}
