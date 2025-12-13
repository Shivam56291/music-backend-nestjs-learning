import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { CreateUserDto } from '../users/dto/create-user-dto';
import { AuthService } from './auth.service';
import { LoginDTO } from './dto/login.dto';
import { Enable2FAType } from './types/enable2fa.type';
import { JwtAuthGuard } from './jwt-guard';
import { ValidateTokenDto } from './dto/validate-token.dto';
import { UpdateResult } from 'typeorm';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private usersService: UsersService,
  ) {}

  @Post('signup')
  async signup(@Body() userDto: CreateUserDto) {
    return this.usersService.createUser(userDto);
  }

  @Post('login')
  login(@Body() loginDto: LoginDTO) {
    return this.authService.login(loginDto);
  }

  @Get('enable-2fa')
  @UseGuards(JwtAuthGuard)
  enable2FA(@Req() req): Promise<Enable2FAType> {
    return this.authService.enable2FA(req.user.userId);
  }

  @Post('validate-2fa')
  @UseGuards(JwtAuthGuard)
  validate2FA(
    @Req() req,
    @Body() ValidateTokenDto: ValidateTokenDto,
  ): Promise<{ verified: boolean }> {
    return this.authService.validate2FAToken(
      req.user.userId,
      ValidateTokenDto.token,
    );
  }

  @Get('disable-2fa')
  @UseGuards(JwtAuthGuard)
  disable2FA(@Req() req): Promise<UpdateResult> {
    return this.authService.disable2FA(req.user.userId);
  }

  @Get('profile')
  @UseGuards(AuthGuard('bearer'))
  getProfile(@Req() req) {
    return {
      message: 'authenticated with api key',
      user: req.user,
    };
  }
}
