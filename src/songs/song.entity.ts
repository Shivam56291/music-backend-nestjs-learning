import { Artist } from 'src/artists/artist.entity';
import { Playlist } from 'src/playlists/playlist.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('songs')
export class Song {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @ManyToMany(() => Artist, (artist) => artist.songs, { cascade: true })
  @JoinTable({ name: 'songs_artists' })
  artists: Artist[];

  @Column({ type: 'date' })
  releasedDate: string;

  @Column({ type: 'time' })
  duration: string;

  @Column({ type: 'text' })
  lyrics: string;

  @Column({ type: 'text' })
  url: string;

  @Column({ type: 'int', default: 0 })
  playCount: number;

  @ManyToMany(() => Playlist, (playList) => playList.songs, { cascade: true })
  @JoinTable({ name: 'songs_playlists' })
  playLists: Playlist[];
}
