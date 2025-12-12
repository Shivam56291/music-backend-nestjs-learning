import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user-dto';
import * as bcryptjs from 'bcryptjs';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async createUser(userDto: CreateUserDto): Promise<Omit<User, 'password'>> {
    // 1. Check email exists
    const existing = await this.userRepository.findOne({
      where: { email: userDto.email },
    });

    if (existing) {
      throw new BadRequestException('Email already exists');
    }

    // 2. Hash password
    const salt = await bcryptjs.genSalt(10);
    userDto.password = await bcryptjs.hash(userDto.password, salt);

    // 3. Save user
    const user = this.userRepository.create(userDto);
    const savedUser = await this.userRepository.save(user);

    // 4. Return safe user
    const { password, ...safeUser } = savedUser;
    return safeUser;
  }

  async findOne(data: Partial<User>): Promise<User> {
    const user = await this.userRepository.findOneBy({ email: data.email });
    if (!user) {
      throw new UnauthorizedException('Could not find user');
    }
    return user;
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.userRepository.findOne({
      where: { email },
      select: ['id', 'email', 'password'], // add password here
    });
  }
}
