import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsNumber, IsString } from 'class-validator';
export class CreatePlayListDto {
  @ApiProperty({
    example: 'Playlist Name',
    description: 'Playlist name',
  })
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @ApiProperty({
    example: [1, 2, 3],
    description: 'Playlist songs',
  })
  @IsNotEmpty()
  @IsArray()
  @IsNumber({}, { each: true })
  readonly songs: number[];

  @ApiProperty({
    example: 1,
    description: 'Playlist user',
  })
  @IsNumber()
  @IsNotEmpty()
  readonly user: number;
}
