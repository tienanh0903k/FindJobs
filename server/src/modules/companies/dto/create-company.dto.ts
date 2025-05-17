import { Type } from 'class-transformer';
import { IsString, IsOptional, IsNumber } from 'class-validator';

export class CreateCompanyDto {
  @IsString()
  name: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @IsOptional()
  address?: string;

  @IsString()
  @IsOptional()
  image?: string;

  @IsString()
  @IsOptional()
  coordinates?: string;

  @IsOptional()
  followers?: number;

  @IsOptional()
  rating?: number;

  @IsOptional()
  total_employee?: number;

  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  status?: number;
}
