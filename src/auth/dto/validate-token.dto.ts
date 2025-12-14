import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class ValidateTokenDto {
  @ApiProperty({
    example: '123456',
    description: 'Token to validate',
  })
  @IsNotEmpty()
  @IsString()
  token: string;
}
