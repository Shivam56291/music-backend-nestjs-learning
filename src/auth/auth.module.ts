import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from 'src/users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { authConstants } from 'src/common/constants/connection';
import { JWTStrategy } from './jwt.strategy';
import { ArtistsModule } from 'src/artists/artists.module';
import { ApiKeyStrategy } from './apiKey.strategy';

@Module({
  imports: [
    UsersModule,
    JwtModule.register({
      secret: authConstants.JWT_SECRET,
      signOptions: { expiresIn: '1d' },
    }),
    ArtistsModule,
  ],
  providers: [AuthService, JWTStrategy, ApiKeyStrategy],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
