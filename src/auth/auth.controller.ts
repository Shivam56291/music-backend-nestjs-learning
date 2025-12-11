import { Body, Controller, Post } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { CreateUserDto } from '../users/dto/create-user-dto';

@Controller('auth')
export class AuthController {
  constructor(private userService: UsersService) {}

  @Post('signup')
  async signup(@Body() userDto: CreateUserDto) {
    return this.userService.createUser(userDto);
  }
}
