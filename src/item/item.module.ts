import { Module } from '@nestjs/common';
import { ItemService } from './item.service';
import { ItemController } from './item.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Item } from './item.entity';
import { ItemResolver } from './item.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([Item])],
  providers: [ItemService, ItemResolver],
  controllers: [ItemController],
})
export class ItemModule {}
