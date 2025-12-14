import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { Playlist } from 'src/playlists/playlist.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users')
export class User {
  @ApiProperty({
    example: 1,
    description: 'User ID',
  })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    example: 'John',
    description: 'User first name',
  })
  @Column()
  firstName: string;

  @ApiProperty({
    example: 'Doe',
    description: 'User last name',
  })
  @Column()
  lastName: string;

  @ApiProperty({
    example: 'john.doe@example.com',
    description: 'User email',
  })
  @Column({ unique: true })
  email: string;

  @ApiProperty({
    example: 'password123',
    description: 'User password',
  })
  @Column({ select: false })
  @Exclude()
  password: string;

  @ApiProperty({
    example: '2fa-secret',
    description: 'User 2FA secret',
  })
  @Column({ nullable: true, type: 'text' })
  twoFASecret: string;

  @ApiProperty({
    example: false,
    description: 'User 2FA enabled',
  })
  @Column({ default: false, type: 'boolean' })
  enable2FA: boolean;

  @ApiProperty({
    example: '57e7ed91-d5a5-45f2-a5ca-28318914b6a2',
    description: 'User API key',
  })
  @Column({ type: 'varchar', nullable: true, unique: true })
  apiKey: string | null;

  @ApiProperty({
    example: [],
    description: 'User playlists',
  })
  @ApiHideProperty()
  @OneToMany(() => Playlist, (playList) => playList.user)
  playLists: Playlist[];
}
