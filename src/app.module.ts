import { Module } from '@nestjs/common';
import { MovieModule } from './movie/movie.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [MovieModule, AuthModule, MongooseModule.forRootAsync({
    useFactory: () => ({
      uri: process.env.MONGODB_URI
    }),
  }),
  ConfigModule.forRoot({isGlobal: true,})],
})
export class AppModule {}
