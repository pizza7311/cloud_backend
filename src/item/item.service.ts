import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Item } from './item.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ItemService {
  constructor(
    @InjectRepository(Item)
    private repo: Repository<Item>,
  ) {}

  async getFolderFiles(folderId: string): Promise<Item[]> {
    const files = await this.repo.findBy({ parent: folderId });
    return files;
  }

  /**
   * 사용자의 myDrive 페이지 파일 목록
   * @param uid string
   * @returns Item[]
   */
  async getMyDriveItems(uid: string): Promise<Item[]> {
    return await this.repo.findBy({ owner: uid });
  }
}
