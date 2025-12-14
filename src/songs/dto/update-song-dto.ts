import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsDateString,
  IsMilitaryTime,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class UpdateSongDto {
  @ApiProperty({
    example: 'Song Title',
    description: 'Song title',
  })
  @IsString()
  @IsOptional()
  readonly title?: string;

  @ApiProperty({
    example: [1, 2, 3],
    description: 'Song artists',
  })
  @IsOptional()
  @IsArray()
  @IsNumber()
  readonly artists?: number[];

  @ApiProperty({
    example: '2025-12-14',
    description: 'Song released date',
  })
  @IsOptional()
  @IsDateString()
  readonly releasedDate?: Date;

  @ApiProperty({
    example: '01:02',
    description: 'Song duration',
  })
  @IsOptional()
  @IsMilitaryTime()
  readonly duration?: string;

  @ApiProperty({
    example: 'Lyrics of the song',
    description: 'Song lyrics',
  })
  @IsOptional()
  @IsString()
  readonly lyrics?: string;
}
