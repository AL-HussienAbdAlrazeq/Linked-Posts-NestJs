import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Profile } from 'src/entities/profile.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}
  async createUser(createUserDto: CreateUserDto): Promise<User> {
    let user = await this.userRepository.findOneBy({
      email: createUserDto.email,
    });
    if (user) {
      throw new HttpException('User already exist', HttpStatus.CONFLICT);
    }
    const hashPassword = bcrypt.hashSync(createUserDto.password, 10);
    let newUser = this.userRepository.create({
      ...createUserDto,
      createdAt: new Date(),
      password: hashPassword,
    });
    return this.userRepository.save(newUser);
  }

  async findAll() {
    let users = await this.userRepository.find({ relations: ['profile'] });
    if (!users) {
      throw new HttpException('Users Not Found', HttpStatus.NOT_FOUND);
    }
    return { message: 'Success', users };
  }

  async findOne(id: number) {
    let user = await this.userRepository.findOne({
      where: { id },
      relations: ['profile'],
    });
    if (!user) {
      throw new HttpException('This User not found', HttpStatus.NOT_FOUND);
    }
    return { message: 'Success', user };
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    let user = await this.userRepository.update({ id }, { ...updateUserDto });
    if (!user) {
      throw new HttpException('This User not found', HttpStatus.NOT_FOUND);
    }
    return { message: 'Success', user };
  }

  async remove(id: number) {
    let deleteUser = await this.userRepository.delete(id);
    if (!deleteUser) {
      throw new HttpException('This User not found', HttpStatus.NOT_FOUND);
    }
    return { message: 'Deleted Successfully', deleteUser };
  }
}
