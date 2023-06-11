import { IsEmail } from 'class-validator';
import { File } from 'src/file/file.entity';
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
  @OneToMany(() => File, (file) => file.owner)
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
