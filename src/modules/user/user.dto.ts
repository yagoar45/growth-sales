/* eslint-disable prettier/prettier */
import { IsEmail, IsNotEmpty, Equals} from "class-validator";
export class UserDTO  {
  userId: string;

  @IsNotEmpty()
  name: string;
  
  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;

  createdAt: Date;

  updatedAt: Date | null;
};

