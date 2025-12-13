import { DataSource, EntityManager } from 'typeorm';
import { User } from 'src/users/user.entity';
import { Artist } from 'src/artists/artist.entity';
import { Playlist } from 'src/playlists/playlist.entity';
import { Song } from 'src/songs/song.entity';
import * as bcrypt from 'bcryptjs';
import { faker } from '@faker-js/faker';
import { v4 as uuid4 } from 'uuid';
import dataSource from '../data-source';

export const seedData = async (manager: EntityManager) => {
  const users: User[] = [];
  for (let i = 0; i < 5; i++) {
    const salt = await bcrypt.genSalt();
    const password = await bcrypt.hash('123456', salt);

    const user = manager.create(User, {
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      email: faker.internet.email(),
      password,
      phone: String(faker.phone.number({ style: 'national' })),
      apiKey: uuid4(),
    });

    users.push(await manager.save(user));
  }

  const artists: Artist[] = [];
  for (const user of users) {
    const artist = manager.create(Artist, { user });
    artists.push(await manager.save(artist));
  }

  const playlists: Playlist[] = [];
  for (const user of users) {
    const playlist = manager.create(Playlist, {
      name: faker.music.genre(),
      user,
    });
    playlists.push(await manager.save(playlist));
  }

  for (let i = 0; i < 10; i++) {
    const song = manager.create(Song, {
      title: faker.music.songName(),
      releasedDate: faker.date.past({ years: 5 }).toISOString().split('T')[0],
      duration: `${String(faker.number.int({ min: 0, max: 0 })).padStart(2, '0')}:${String(faker.number.int({ min: 1, max: 5 })).padStart(2, '0')}:${String(faker.number.int({ min: 0, max: 59 })).padStart(2, '0')}`,
      lyrics: faker.lorem.paragraphs(2),
      playList: faker.helpers.arrayElement(playlists),
      artists: faker.helpers.arrayElements(
        artists,
        faker.number.int({ min: 1, max: 2 }),
      ),
    });

    await manager.save(song);
  }

  console.log('✅ Database seeding complete!');
};

// Run directly
if (require.main === module) {
  dataSource
    .initialize()
    .then(async (ds: DataSource) => {
      await seedData(ds.manager);
      await ds.destroy();
    })
    .catch(console.error);
}
