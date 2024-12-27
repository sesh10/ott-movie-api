import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from './guards/roles.guard';
import { UsersModule } from 'src/users/users.module';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [UsersModule, JwtModule.register({
    global: true,
    secret: 'hellosecret',
    signOptions: { expiresIn: '1h' },
  })],
  providers: [AuthService, {
    provide: APP_GUARD,
    useClass: RolesGuard,
  },],
  controllers: [AuthController]
})
export class AuthModule {}
