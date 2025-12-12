import { Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginDTO } from './dto/login.dto';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcryptjs';
import { User } from 'src/users/user.entity';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UsersService) {}

  async login(loginDto: LoginDTO): Promise<Omit<User, 'password'>> {
    // 1. Find user by unique identifier
    const user = await this.userService.findByEmail(loginDto.email);

    if (!user) {
      throw new UnauthorizedException('Invalid email or password');
    }

    // 2. Compare password
    const isPasswordValid = await bcrypt.compare(
      loginDto.password,
      user.password,
    );

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid email or password');
    }

    // 3. Return sanitized user object (not the entity)
    const { password, ...safeUser } = user;
    return safeUser;
  }
}
