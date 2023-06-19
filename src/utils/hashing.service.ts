/* eslint-disable */
/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class HashingService {
  private readonly saltRounds = 10;

  hashPassword(password: string): string {
    const salt = bcrypt.genSaltSync(this.saltRounds);
    const hashedPassword = bcrypt.hashSync(password, salt);
    return hashedPassword;
  }
}
