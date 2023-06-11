import { User } from 'src/user/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class File {
  @PrimaryGeneratedColumn('uuid')
  file_id: string;

  @Column({ length: 200 })
  file_name: string;

  @Column({ length: 50 })
  file_extension: string;

  @CreateDateColumn()
  uploaded_at: Date;

  @Column({ nullable: true })
  modified_at: Date;

  //url이 그냥 fileId로 사용가능(구글 드라이브도 같음)
  //   @Column()
  //   @Generated('uuid')
  //   file_url:string

  @Column({ type: 'int', default: 0 })
  size: number;

  /*
    사실 동영상 파일의 경우에만 별도의 썸네일 필요
    이미지의 경우 그냥 이미지 자체를 보여주면되니까
  */
  @Column({ nullable: true })
  thumbnail_url: string;

  @Column()
  @ManyToOne(() => User, (user) => user.uid)
  owner: string;
}
