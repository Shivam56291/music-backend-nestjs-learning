import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { SeedService } from './seed/seed.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      skipMissingProperties: true,
    }),
  );
  /**
   *  You can use this to seed the database
   */
  // const seedService = app.get(SeedService);
  // await seedService.seed();

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
