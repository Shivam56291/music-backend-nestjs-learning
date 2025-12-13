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
import { UpdateResult } from 'typeorm/browser';
import { v4 as uuidv4 } from 'uuid';

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

    // 3. Generate API key
    const apiKey = uuidv4();

    // 4. Create user entity
    const user = this.userRepository.create({
      ...userDto,
      apiKey,
    });

    // 5. Save user
    const savedUser = await this.userRepository.save(user);

    // 6. Return safe user (exclude password)
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
      select: ['id', 'email', 'password', 'twoFASecret', 'enable2FA'], // add password here
    });
  }

  async findById(id: number): Promise<User | null> {
    return this.userRepository.findOne({ where: { id } });
  }

  async updateSecretKey(userId: number, secret: string): Promise<User> {
    const user = await this.findById(userId);
    if (!user) {
      throw new NotFoundException(`User with id ${userId} not found`);
    }
    user.twoFASecret = secret;
    user.enable2FA = true;

    return this.userRepository.save(user);
  }

  async disable2FA(userId: number): Promise<UpdateResult> {
    const user = await this.findById(userId);
    if (!user) {
      throw new NotFoundException(`User with id ${userId} not found`);
    }
    user.enable2FA = false;
    user.twoFASecret = '';

    return this.userRepository.update(user.id, user);
  }

  async findByApiKey(apiKey: string): Promise<User | null> {
    return this.userRepository.findOne({
      where: { apiKey },
      select: ['id', 'email', 'firstName', 'lastName', 'enable2FA'],
    });
  }
}
