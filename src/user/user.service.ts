import { Injectable } from '@nestjs/common';
import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ChangeUsernameArgs } from './dto/changeUsername.args';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private repo: Repository<User>,
  ) {}

  findOneById(uid: string, active = false): Promise<User | null> {
    return this.repo.findOneBy({ uid, active });
  }

  async deleteUser(uid: string): Promise<string> {
    //TODO: 사용자 삭제시 업로드한 파일들 처리하는 기능 필요
    try {
      await this.repo.update(
        { uid },
        { active: false, deleted_at: new Date() },
      );
    } catch (e) {
      throw e;
    }
    return uid;
  }

  async changeUsername(args: ChangeUsernameArgs): Promise<boolean> {
    await this.repo.update({ uid: args.uid }, { username: args.username });
    return true;
  }
}
