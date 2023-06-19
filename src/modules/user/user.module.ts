import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { PrismaService } from 'src/database/prisma.service';
import { HashingService } from 'src/utils/hashing.service';

@Module({
  controllers: [UserController],
  providers: [UserService, PrismaService, HashingService],
})
export class UserModule {}
