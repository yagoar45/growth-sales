import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from 'src/modules/user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { localStrategy } from './strategies/local.strategy';
import { PrismaService } from 'src/database/prisma.service';
import { HashingService } from 'src/utils/hashing.service';
import { UserService } from 'src/modules/user/user.service';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
  imports: [
    UserModule,
    PassportModule,
    ConfigModule.forRoot(),
    JwtModule.register({
      privateKey: process.env.SECRET_KEY,
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    localStrategy,
    PrismaService,
    HashingService,
    UserService,
    JwtStrategy,
  ],
})
export class AuthModule {}
