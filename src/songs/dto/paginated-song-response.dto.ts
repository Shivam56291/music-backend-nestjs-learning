import { ApiProperty } from '@nestjs/swagger';
import { SongResponseDto } from './song-response.dto';

export class PaginatedSongResponseDto {
  @ApiProperty({ type: [SongResponseDto] })
  items: SongResponseDto[];

  @ApiProperty({ example: 100 })
  totalItems: number;

  @ApiProperty({ example: 10 })
  itemCount: number;

  @ApiProperty({ example: 10 })
  itemsPerPage: number;

  @ApiProperty({ example: 1 })
  currentPage: number;

  @ApiProperty({ example: 10 })
  totalPages: number;
}
