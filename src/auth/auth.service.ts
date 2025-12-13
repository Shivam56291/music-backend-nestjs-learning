import { Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginDTO } from './dto/login.dto';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { ArtistsService } from 'src/artists/artists.service';
import { PayloadType } from './types/payload.type';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
    private readonly artistsService: ArtistsService,
  ) {}

  async login(loginDto: LoginDTO): Promise<{ accessToken: string }> {
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

    const artist = await this.artistsService.findArtist(user.id);
    if(artist){
      payload.artistId = artist.id;
    }

    return { accessToken: this.jwtService.sign(payload) };
  }
}
