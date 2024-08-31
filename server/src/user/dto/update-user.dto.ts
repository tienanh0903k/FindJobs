import { OmitType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
//ke thua
export class UpdateUserDto extends OmitType(CreateUserDto, ['password'] as const) {
    _id: string
}
