import {  PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
//ke thua
export class UpdateUserDto extends PartialType(CreateUserDto) {
}