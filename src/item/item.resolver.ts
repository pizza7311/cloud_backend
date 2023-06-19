import { Args, Query, Resolver } from '@nestjs/graphql';
import { ItemService } from './item.service';
import { AuthGuard } from 'src/auth/guard/auth.guard';
import { UseGuards } from '@nestjs/common';
import { User } from './decorators/User.decorator';

@Resolver('item')
export class ItemResolver {
  constructor(private itemService: ItemService) {}

  @Query('item')
  async directoryItems(@Args('folderId') folderID: string) {
    /*
        ※중요※ 
        실제 db에서는 폴더와 파일을 id로 구분하지 않으며 file 이라는 
        테이블안에 type 컬럼으로만 폴더인지 파일인지 구분함
        여기서 args로 받은 값은 folderId 지만 사실 file_id 컬럼으로 검색함
    */
    return this.itemService.getFolderFiles(folderID);
  }

  @Query('myDrive')
  @UseGuards(AuthGuard)
  async myDriveItems(@User('uid') uid: string) {
    //로그인한 유저 id 구하고 넘겨주기 필요

    return await this.itemService.getMyDriveItems(uid);
  }

  //   @Mutation()
  //   addFolder(): Promise<string> {}

  //   @Mutation()
  //   addFile(): Promise<string> {}

  //   @Mutation()
  //   getFileList(): Promise<[File]> {}
}
