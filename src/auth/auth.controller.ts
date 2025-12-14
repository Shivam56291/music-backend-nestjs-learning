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
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private usersService: UsersService,
  ) {}

  @ApiOperation({ summary: 'Register new user' })
  @ApiResponse({ status: 201, description: 'It returns the created user' })
  @ApiResponse({ status: 400, description: 'User already exists' })
  @Post('signup')
  async signup(@Body() userDto: CreateUserDto) {
    return this.usersService.createUser(userDto);
  }

  @ApiOperation({ summary: 'Login user' })
  @ApiResponse({ status: 200, description: 'It returns the user' })
  @ApiResponse({ status: 401, description: 'Invalid credentials' })
  @Post('login')
  login(@Body() loginDto: LoginDTO) {
    return this.authService.login(loginDto);
  }

  @ApiOperation({ summary: 'Enable 2FA' })
  @ApiResponse({ status: 200, description: 'It returns the user' })
  @ApiResponse({ status: 401, description: 'Invalid credentials' })
  @Get('enable-2fa')
  @UseGuards(JwtAuthGuard)
  enable2FA(@Req() req): Promise<Enable2FAType> {
    return this.authService.enable2FA(req.user.userId);
  }

  @ApiOperation({ summary: 'Validate 2FA' })
  @ApiResponse({ status: 200, description: 'It returns the user' })
  @ApiResponse({ status: 401, description: 'Invalid credentials' })
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

  @ApiOperation({ summary: 'Disable 2FA' })
  @ApiResponse({ status: 200, description: 'It returns the user' })
  @ApiResponse({ status: 401, description: 'Invalid credentials' })
  @Get('disable-2fa')
  @UseGuards(JwtAuthGuard)
  disable2FA(@Req() req): Promise<UpdateResult> {
    return this.authService.disable2FA(req.user.userId);
  }

  @ApiOperation({ summary: 'Get profile' })
  @ApiResponse({ status: 200, description: 'It returns the user' })
  @ApiResponse({ status: 401, description: 'Invalid credentials' })
  @Get('profile')
  @UseGuards(AuthGuard('bearer'))
  getProfile(@Req() req) {
    return {
      message: 'authenticated with api key',
      user: req.user,
    };
  }
}
