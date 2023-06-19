import { Injectable } from '@nestjs/common';
import { UserDTO } from './user.dto';
import { PrismaService } from 'src/database/prisma.service';
import { HashingService } from 'src/utils/hashing.service';

@Injectable()
export class UserService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly hashing: HashingService,
  ) {}

  async create(data: UserDTO) {
    const hashing = this.hashing.hashPassword(data.password);
    const user = this.prisma.user.create({
      data: {
        ...data,
        password: hashing,
      },
    });

    return await user;
  }

  async findAll(): Promise<UserDTO[]> {
    try {
      return await this.prisma.user.findMany();
    } catch {
      throw new Error('no user found');
    }
  }

  async UserIsInDb(id: string): Promise<boolean> {
    const user = this.prisma.user.findUnique({
      where: {
        userId: id,
      },
    });

    return user ? true : false;
  }

  async findById(id: string): Promise<UserDTO | string> {
    const user = this.prisma.user.findUnique({
      where: {
        userId: id,
      },
    });

    return user;
  }

  async update(id: string, data: UserDTO) {
    if (this.UserIsInDb(id)) {
      const hashing = this.hashing.hashPassword(data.password);
      return await this.prisma.user.update({
        data: {
          ...data,
          password: hashing,
        },
        where: {
          userId: id,
        },
      });
    }
    throw new Error('user doesnt exits');
  }

  async delete(id: string) {
    const user = this.findById(id);
    if (user) {
      return await this.prisma.user.delete({
        where: {
          userId: id,
        },
      });
    }
  }
}
