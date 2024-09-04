import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { Profile } from 'src/entities/profile.entity';
import { Post } from 'src/entities/posts.entity';

@Module({
  imports:[TypeOrmModule.forFeature([User , Profile , Post])],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
