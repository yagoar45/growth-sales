import {
  Body,
  Controller,
  Post,
  Get,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UserDTO } from './user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('user')
  async createUser(@Body() data: UserDTO) {
    return await this.userService.create(data);
  }

  @Get('users')
  async findAllUsers() {
    return await this.userService.findAll();
  }

  @Get(':id')
  async findUserById(@Param('id') id: string) {
    try {
      return await this.userService.findById(id);
    } catch {
      throw new Error('user doesnt exists');
    }
  }

  @Put(':id')
  async updateUser(@Param('id') id: string, @Body() data: UserDTO) {
    return await this.userService.update(id, data);
  }

  @Delete(':id')
  async deleteUser(@Param('id') id: string) {
    return await this.userService.delete(id);
  }
}
