import { Module } from '@nestjs/common';
import { MovieModule } from './movie/movie.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersService } from './users/users.service';
import { UsersModule } from './users/users.module';

@Module({
  imports: [MovieModule, AuthModule, MongooseModule.forRootAsync({
    useFactory: () => ({
      uri: process.env.MONGODB_URI
    }),
  }),
  ConfigModule.forRoot({isGlobal: true,}),
  UsersModule],
  providers: [UsersService],
})
export class AppModule {}
