/* eslint-disable prettier/prettier */
import {
  IsEmail,
  IsNotEmpty,
  MinLength,
  MaxLength,
  IsStrongPassword,
} from 'class-validator';
export class CreateUserDTO {
  @IsNotEmpty()
  @MinLength(4, { message: 'username must be at least four characters long' })
  @MaxLength(80, { message: 'username cannot be longer than 80 characters' })
  name: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsStrongPassword()
  password: string;
}
