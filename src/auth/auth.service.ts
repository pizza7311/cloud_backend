import { Injectable } from '@nestjs/common';
import { LoginDTO } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';

@Injectable()
export class AuthService {
  constructor(private jwt: JwtService) {}

  async login(userData: LoginDTO): Promise<string[]> {
    //need user service
    const { userid, password } = userData;

    const payload = {};

    const accessToken = await this.jwt.signAsync(payload, {
      issuer: 'cloud.pizza7311.me',
      expiresIn: '1h',
    });

    const refreshToken = await this.jwt.signAsync(payload, {
      issuer: 'cloud.pizza7311.me',
      expiresIn: '1h',
    });

    return [accessToken, refreshToken];
  }

  logout(res: Response) {
    res.cookie('access_token', null);
    res.cookie('refresh_token', null);
    return;
  }
}
