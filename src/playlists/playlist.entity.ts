import { Song } from 'src/songs/song.entity';
import { User } from 'src/users/user.entity';
import {
  Column,
  Entity,
  ManyToOne,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
@Entity('playlists')
export class Playlist {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name: string;
  /**
   * Each Playlist will have multiple songs
   */
  @ManyToMany(() => Song, (song) => song.playLists)
  songs: Song[];
  /**
   * Many Playlist can belong to a single unique user
   */
  @ManyToOne(() => User, (user) => user.playLists)
  user: User;
}
