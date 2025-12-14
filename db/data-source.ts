import { ConfigModule, ConfigService } from '@nestjs/config';
import {
  TypeOrmModuleAsyncOptions,
  TypeOrmModuleOptions,
} from '@nestjs/typeorm';
import { DataSource, DataSourceOptions } from 'typeorm';

// Async TypeORM config for NestJS runtime
export const typeOrmAsyncConfig: TypeOrmModuleAsyncOptions = {
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: async (configService: ConfigService): Promise<TypeOrmModuleOptions> => {
    const dbHost = configService.getOrThrow<string>('DB_HOST');
    const dbPort = Number(configService.getOrThrow('DB_PORT'));
    const dbUsername = configService.getOrThrow<string>('DB_USERNAME');
    const dbPassword = String(configService.getOrThrow('DB_PASSWORD'));
    const dbName = configService.getOrThrow<string>('DB_NAME');

    return {
      type: 'postgres',
      host: dbHost,
      port: dbPort,
      username: dbUsername,
      password: dbPassword,
      database: dbName,
      entities: ['dist/**/*.entity.js'],
      synchronize: false,
      migrations: ['dist/db/migrations/*.js'],
      logging: true, // optional: useful for debugging queries
    };
  },
};

// TypeORM DataSource config for CLI (migrations, seeds, etc.)
export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: process.env.DB_HOST ?? 'localhost',
  port: parseInt(process.env.DB_PORT ?? '5432', 10),
  username: process.env.DB_USERNAME ?? 'postgres',
  password: process.env.DB_PASSWORD ?? 'postgres',
  database: process.env.DB_NAME ?? 'spotifyclone',
  entities: ['dist/**/*.entity.js'],
  synchronize: false,
  migrations: ['dist/db/migrations/*.js'],
  logging: true,
};

// Export a single DataSource instance for CLI tools
const dataSource = new DataSource(dataSourceOptions);
export default dataSource;
