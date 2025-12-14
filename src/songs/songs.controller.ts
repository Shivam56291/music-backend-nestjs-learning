import {
  Body,
  Controller,
  DefaultValuePipe,
  Delete,
  Get,
  HttpStatus,
  Inject,
  NotFoundException,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { SongsService } from './songs.service';
import { CreateSongDto } from './dto/create-song-dto';
import type { Connection } from 'src/common/constants/connection';
import { Song } from './song.entity';
import { DeleteResult } from 'typeorm';
import { Pagination } from 'nestjs-typeorm-paginate';
import { JwtArtistGuard } from 'src/auth/jwt-artist-guard';
import {
  ApiOkResponse,
  ApiOperation,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { PaginationQueryDto } from './dto/pagination-query.dto';
import { SongResponseDto } from './dto/song-response.dto';
import { PaginatedSongResponseDto } from './dto/paginated-song-response.dto';

@Controller('songs')
@ApiTags('Songs')
export class SongsController {
  constructor(
    private readonly songsService: SongsService,
    @Inject('CONNECTION') private readonly connection: Connection,
  ) {
    console.log(`This is Connection: ${this.connection.CONNECTION_STRING}`);
  }

  @Get()
  @ApiOperation({ summary: 'Get all songs' })
  @ApiResponse({ status: 200, description: 'It returns the songs' })
  @ApiQuery({ name: 'page', required: false, type: Number, example: 1 })
  @ApiQuery({ name: 'limit', required: false, type: Number, example: 10 })
  @ApiQuery({ name: 'title', required: false, type: String, example: 'Love' })
  @ApiOkResponse({
    description: 'Paginated list of songs',
    type: PaginatedSongResponseDto,
  })
  findAll(@Query() query: PaginationQueryDto): Promise<Pagination<Song>> {
    return this.songsService.paginate(
      {
        page: query.page ?? 1,
        limit: query.limit ?? 10,
      },
      query.title,
    );
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get song by id' })
  @ApiResponse({ status: 200, description: 'It returns the song' })
  @ApiResponse({ status: 404, description: 'Song not found' })
  @ApiOkResponse({ description: 'It returns the song', type: SongResponseDto })
  async findOne(
    @Param(
      'id',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    id: number,
  ): Promise<Song | null> {
    const song = await this.songsService.findOne(id);
    if (!song) {
      throw new NotFoundException(`Song with id ${id} not found`);
    }
    return song;
  }

  @Post()
  @ApiOperation({ summary: 'Create song' })
  @ApiResponse({ status: 201, description: 'It returns the created song' })
  @ApiResponse({ status: 400, description: 'Song already exists' })
  @UseGuards(JwtArtistGuard)
  create(@Body() createSongDto: CreateSongDto, @Req() req): Promise<Song> {
    return this.songsService.create(createSongDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete song' })
  @ApiResponse({ status: 200, description: 'It returns the deleted song' })
  @ApiResponse({ status: 404, description: 'Song not found' })
  @UseGuards(JwtArtistGuard)
  delete(
    @Param(
      'id',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    id: number,
  ): Promise<DeleteResult> {
    return this.songsService.remove(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update song' })
  @ApiResponse({ status: 200, description: 'It returns the updated song' })
  @ApiResponse({ status: 404, description: 'Song not found' })
  @UseGuards(JwtArtistGuard)
  update(
    @Param(
      'id',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    id: number,
    @Body() updateSongDto: CreateSongDto,
  ): Promise<Song> {
    return this.songsService.update(id, updateSongDto);
  }
}
