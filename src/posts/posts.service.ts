import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import { Post } from 'src/entities/posts.entity';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Post) private postRepository: Repository<Post>,
  ) {}

  async create(id: number, createPostDto: CreatePostDto) {
    let user = await this.userRepository.findOneBy({ id });
    if (!user) {
      throw new HttpException('Users Not Found', HttpStatus.NOT_FOUND);
    }
    let post = this.postRepository.create({
      ...createPostDto,
      user,
    });
    let savedPost = await this.postRepository.save(post);
    return { message: 'Success', savedPost };
  }

  findAll() {
    return this.postRepository.find({ relations: ['user'] });
  }

  findOne(id: number) {
    return this.postRepository.findOne({ where: { id }, relations: ['user'] });
  }

  async update(id: number, updatePostDto: UpdatePostDto) {
    await this.postRepository.update(id, updatePostDto);
    return this.findOne(id);
  }

  async remove(id: number) {
    let post = await this.postRepository.delete(id);
    return { message: 'Success', post };
  }
}
