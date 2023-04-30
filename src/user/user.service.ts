import { Injectable } from '@nestjs/common';
import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private repo: Repository<User>,
  ) {}

  findOneById(uid: string): Promise<User | null> {
    return this.repo.findOneBy({ uid });
  }
}
