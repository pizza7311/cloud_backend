import { IsEmail } from 'class-validator';
import { encryptWithSHA512 } from 'src/utils/encrypt';
import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
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

  @Column({ default: true })
  active: boolean;

  @BeforeInsert()
  encryptPassword = () => {
    this.password = encryptWithSHA512(this.password);
  };
}
