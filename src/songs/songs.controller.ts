import { Controller, Delete, Get, Patch, Post, Put } from '@nestjs/common';
import { SongsService } from './songs.service';

@Controller('songs')
export class SongsController {

  constructor(private readonly songsService: SongsService) {}

  @Get()
  findAll() {
    return this.songsService.findAll();
  }

  @Get(':id')
  findOne() {
    return 'Fetch song on the based on id';
  }

  @Post()
  create() {
    return this.songsService.create('Animals by Martin Garrix');
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
