import {
  IsArray,
  IsDateString,
  IsMilitaryTime,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class UpdateSongDto {
  @IsString()
  @IsOptional()
  readonly title?: string;

  @IsOptional()
  @IsArray()
  @IsNumber()
  readonly artists?: number[];

  @IsOptional()
  @IsDateString()
  readonly releasedDate?: Date;

  @IsOptional()
  @IsMilitaryTime()
  readonly duration?: string;

  @IsOptional()
  @IsString()
  readonly lyrics?: string;
}
