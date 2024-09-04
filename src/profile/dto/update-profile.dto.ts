import { PartialType } from '@nestjs/mapped-types';
import { CreateProfileDto } from './create-profile.dto';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class UpdateProfileDto extends PartialType(CreateProfileDto) {
    @IsString()
    @IsNotEmpty()
    firstName?: string;
  
    @IsString()
    @IsNotEmpty()
    lastName?: string;
  
    @IsNumber()
    @IsNotEmpty()
    age?: number;
  
    @IsString()
    @IsNotEmpty()
    bio?: string;
  
    userId?:number
}
