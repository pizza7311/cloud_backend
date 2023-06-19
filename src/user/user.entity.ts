import { IsEmail } from 'class-validator';
import { Item } from 'src/item/item.entity';
import { encryptWithSHA512 } from 'src/utils/encrypt';
import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  @OneToMany(() => Item, (item) => item.owner)
  uid: string;

  @Column()
  @IsEmail()
  email: string;

  @Column()
  username: string;

  @Column()
  password: string;

  @CreateDateColumn()
  joined_at: Date;

  @Column({ default: 1 })
  access_level: number;

  @Column({ default: true })
  active: boolean;

  @Column({ nullable: true })
  deleted_at: Date;

  @BeforeInsert()
  encryptPassword() {
    this.password = encryptWithSHA512(this.password);
  }
}
