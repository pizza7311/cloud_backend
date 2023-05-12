import { Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginDTO } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/user.entity';
import { Repository } from 'typeorm';
import { encryptWithSHA512 } from 'src/utils/encrypt';

@Injectable()
export class AuthService {
  constructor(
    private jwt: JwtService,
    @InjectRepository(User)
    private user: Repository<User>,
  ) {}

  async login(
    userData: LoginDTO,
    res: Response,
  ): Promise<{ access_token: string }> {
    const { userid, password } = userData;
    const user = await this.user.findOne({
      where: [
        {
          email: userid,
          password: encryptWithSHA512(password),
        },
        {
          username: userid,
          password: encryptWithSHA512(password),
        },
      ],
    });
    if (!user) {
      throw new UnauthorizedException('Login failed');
    }

    const payload = {
      uid: user.uid,
      access_level: user.access_level,
    };

    const accessToken = await this.jwt.signAsync(payload, {
      issuer: 'cloud.pizza7311.me',
      expiresIn: '1h',
    });

    const refreshToken = await this.jwt.signAsync(payload, {
      issuer: 'cloud.pizza7311.me',
      expiresIn: '30d',
    });

    res.cookie('access_token', accessToken, {
      maxAge: 60 * 60 * 1000,
      httpOnly: true,
    });
    res.cookie('refresh_token', refreshToken, {
      maxAge: 30 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });

    return { access_token: accessToken };
  }

  logout(res: Response) {
    res.cookie('access_token', null);
    res.cookie('refresh_token', null);
    return;
  }
}
