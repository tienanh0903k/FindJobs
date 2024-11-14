// src/roles/dto/create-role.dto.ts
import { IsString, IsArray, ArrayNotEmpty } from 'class-validator';

export class CreateRoleDto {
    @IsString()
    name: string

    @IsString()
    description: string

    @IsArray()
    @ArrayNotEmpty()
    permissions: string[]
}