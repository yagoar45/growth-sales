/* eslint-disable */
/* eslint-disable prettier/prettier */
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from '../auth.service';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { messagensHelper } from 'src/helpers/messagens.helper';

@Injectable()
export class localStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      usernameField: 'email',
    });
  }

  async validate(email: string, password: string) {
    const user = await this.authService.validateUser(email, password);

    if (!user) throw new UnauthorizedException(messagensHelper.EMAIL_OR_PASSWORD_INVALID);
    return user;
  }
}
