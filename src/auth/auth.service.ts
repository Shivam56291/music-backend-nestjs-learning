import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { LoginDTO } from './dto/login.dto';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { ArtistsService } from 'src/artists/artists.service';
import { PayloadType } from './types/payload.type';
import { Enable2FAType } from './types/enable2fa.type';
import * as speakeasy from 'speakeasy';
import { UpdateResult } from 'typeorm';
import { User } from 'src/users/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
    private readonly artistsService: ArtistsService,
  ) {}

  async login(
    loginDto: LoginDTO,
  ): Promise<
    { accessToken: string } | { validate2FA: string; message: string }
  > {
    const user = await this.userService.findByEmail(loginDto.email);

    if (!user) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const isPasswordValid = await bcrypt.compare(
      loginDto.password,
      user.password,
    );

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid email or password');
    }
    const payload: PayloadType = {
      email: user.email,
      userId: user.id,
    };

    console.log(user);

    const artist = await this.artistsService.findArtist(user.id);
    if (artist) {
      payload.artistId = artist.id;
    }

    if (user.enable2FA) {
      if (!user.twoFASecret) {
        throw new UnauthorizedException('2FA is enabled but no secret found');
      }

      return {
        validate2FA: 'http://localhost:3000/auth/validate-2fa',
        message:
          'Please send the one-time password/token from your authenticator app',
      };
    }

    return { accessToken: this.jwtService.sign(payload) };
  }

  async enable2FA(userId: number): Promise<Enable2FAType> {
    const user = await this.userService.findById(userId);

    if (!user) {
      throw new NotFoundException(`User with id ${userId} not found`);
    }
    if (user.enable2FA) {
      return { secret: user.twoFASecret };
    }
    const secret = speakeasy.generateSecret();
    console.log(secret);
    user.twoFASecret = secret.base32;
    await this.userService.updateSecretKey(user.id, user.twoFASecret);
    return { secret: user.twoFASecret };
  }

  async validate2FAToken(
    userId: number,
    token: string,
  ): Promise<{ accessToken?: string; verified: boolean }> {
    const user = await this.userService.findById(userId);
    if (!user) {
      throw new NotFoundException(`User with id ${userId} not found`);
    }

    const verified = speakeasy.totp.verify({
      secret: user.twoFASecret,
      encoding: 'base32',
      token,
      window: 1, // allows small time drift
    });

    if (!verified) {
      throw new UnauthorizedException('Invalid 2FA token');
    }

    // Fetch artist if exists
    const artist = await this.artistsService.findArtist(user.id);

    // Create JWT payload
    const payload: PayloadType = {
      email: user.email,
      userId: user.id,
      artistId: artist?.id,
    };

    return {
      verified: true,
      accessToken: this.jwtService.sign(payload),
    };
  }

  async disable2FA(userId: number): Promise<UpdateResult> {
    const user = await this.userService.findById(userId);
    if (!user) {
      throw new NotFoundException(`User with id ${userId} not found`);
    }
    return this.userService.disable2FA(user.id);
  }

  async validateUserByApiKey(apiKey: string): Promise<User | null> {
    return this.userService.findByApiKey(apiKey);
  }
}
