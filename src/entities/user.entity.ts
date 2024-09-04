import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Profile } from './profile.entity';
import { Post } from './posts.entity';

@Entity()
export class User {
  
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column()
  username: string;
  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column()
  createdAt: Date;

  @Column({ nullable: true })
  authStrategy: string;



  @OneToOne(()=>Profile , {cascade:true})
  @JoinColumn({ name: 'profileId' })
  profile:Profile


  
  @OneToMany(()=>Post , (post)=>post.user)
  posts:Post[]
}
