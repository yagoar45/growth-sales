import {
  Body,
  Controller,
  Post,
  Get,
  Param,
  Put,
  Delete,
  ParseUUIDPipe,
  HttpCode,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDTO } from './DTOS/create-user.dto';
import { UpdateUserDTO } from './DTOS/update-user.dto';
import { AuthGuard } from '@nestjs/passport';

@UseGuards(AuthGuard('jwt'))
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('user')
  async createUser(@Body() data: CreateUserDTO) {
    return await this.userService.create(data);
  }

  @Get('users')
  async findAllUsers() {
    return await this.userService.findAll();
  }

  @Get(':id')
  async findUserById(@Param('id', new ParseUUIDPipe()) id: string) {
    return await this.userService.findById(id);
  }

  @Put(':id')
  async updateUser(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() data: UpdateUserDTO,
  ) {
    return await this.userService.update(id, data);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteUser(@Param('id', new ParseUUIDPipe()) id: string) {
    return await this.userService.delete(id);
  }
}
