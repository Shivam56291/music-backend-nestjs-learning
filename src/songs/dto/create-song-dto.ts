import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsDateString,
  IsMilitaryTime,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateSongDto {
  @ApiProperty({
    example: 'Song Title',
    description: 'Song title',
  })
  @IsString()
  @IsNotEmpty()
  readonly title: string;

  @ApiProperty({
    example: [1, 2, 3],
    description: 'Song artists',
  })
  @IsNotEmpty()
  @IsArray()
  @IsNumber({}, { each: true })
  readonly artists: number[];

  @ApiProperty({
    example: '2025-12-14',
    description: 'Song released date',
  })
  @IsDateString()
  @IsNotEmpty()
  readonly releasedDate: string;

  @ApiProperty({
    example: '01:02',
    description: 'Song duration',
  })
  @IsMilitaryTime()
  @IsNotEmpty()
  readonly duration: string;

  @ApiProperty({
    example: 'https://example.com/song.mp3',
    description: 'Song audio URL',
  })
  @IsString()
  @IsNotEmpty()
  readonly url: string;

  @ApiProperty({
    example: 'Lyrics of the song',
    description: 'Song lyrics',
  })
  @IsString()
  @IsOptional()
  readonly lyrics: string;
}
