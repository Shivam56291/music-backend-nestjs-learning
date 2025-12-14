import { ApiProperty } from '@nestjs/swagger';

export class SongResponseDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  title: string;

  @ApiProperty()
  artist: string;
}
