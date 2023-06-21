import { Injectable } from '@nestjs/common';
import { CreateUserDTO } from './DTOS/create-user.dto';
import { PrismaService } from 'src/database/prisma.service';
import { HashingService } from 'src/utils/hashing.service';
import { UpdateUserDTO } from './DTOS/update-user.dto';
import { ReadUserDTO } from './DTOS/read-user.dto';
import { messagensHelper } from 'src/helpers/messagens.helper';

@Injectable()
export class UserService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly hashing: HashingService,
  ) {}

  async create(data: CreateUserDTO): Promise<ReadUserDTO> {
    const hashing = this.hashing.hashPassword(data.password);
    const userDTO = this.prisma.user.create({
      data: {
        ...data,
        password: hashing,
      },
    });

    return await userDTO;
  }

  async findAll(): Promise<ReadUserDTO[]> {
    return await this.prisma.user.findMany();
  }

  async UserIsInDb(id: string): Promise<boolean> {
    const user = await this.prisma.user.findUnique({
      where: {
        userId: id,
      },
    });

    return user ? true : false;
  }

  async findById(id: string): Promise<ReadUserDTO | string> {
    const user = await this.prisma.user.findUnique({
      where: {
        userId: id,
      },
    });
    try {
      return user;
    } catch (error) {
      console.log(error);
      throw new Error(messagensHelper.NOT_FOUND_USER);
    }
  }

  async findByEmail(email: string): Promise<ReadUserDTO> {
    const user = await this.prisma.user.findUnique({
      where: {
        email: email,
      },
    });
    return user;
  }

  async update(id: string, data: UpdateUserDTO): Promise<ReadUserDTO> {
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
    throw new Error(messagensHelper.NOT_FOUND_USER);
  }

  async delete(id: string): Promise<ReadUserDTO> {
    const user = this.findById(id);
    if (user) {
      return await this.prisma.user.delete({
        where: {
          userId: id,
        },
      });
    } else {
      throw new Error(messagensHelper.DELETE_USER);
    }
  }
}
