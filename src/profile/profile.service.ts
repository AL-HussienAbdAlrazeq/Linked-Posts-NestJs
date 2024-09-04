import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Profile } from 'src/entities/profile.entity';
import { Repository } from 'typeorm';
import { User } from 'src/entities/user.entity';

@Injectable()
export class ProfileService {
  constructor(
    @InjectRepository(Profile) private profileRepository: Repository<Profile>,
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async create(id: number, createProfileDto: CreateProfileDto) {
    let user = await this.userRepository.findOneBy({ id });
    if (!user) {
      throw new HttpException('Users Not Found', HttpStatus.NOT_FOUND);
    }
    const profile = this.profileRepository.create(createProfileDto);
    const savedProfile = await this.profileRepository.save(profile);
    user.profile = savedProfile;
    return { message: 'Success', savedProfile };
  }

  async findAll() {
    let profiles = await this.profileRepository.find({ relations: ['user'] });
    if (!profiles) {
      throw new HttpException('This Profile not found', HttpStatus.NOT_FOUND);
    }
    return { message: 'Success', profiles };
  }

  async findOne(id: number) {
    let profile = await this.profileRepository.findOne({
      where: { id },
      relations: ['user'],
    });
    if (!profile) {
      throw new HttpException('This Profile not found', HttpStatus.NOT_FOUND);
    }
    return { message: 'Success', profile };
  }

  async update(id: number, updateProfileDto: UpdateProfileDto) {
    let profile = await this.profileRepository.update(id, updateProfileDto);
    if (!profile) {
      throw new HttpException('This Profile not found', HttpStatus.NOT_FOUND);
    }
    return { message: 'Success', profile };
  }

  async remove(id: number) {
    let profile = await this.profileRepository.delete(id);
    if (!profile) {
      throw new HttpException('This Profile not found', HttpStatus.NOT_FOUND);
    }
    return { message: 'Success', profile };
  }
}
