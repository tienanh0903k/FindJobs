import { IsString, IsNotEmpty, IsBoolean, IsArray, IsOptional, IsDate } from 'class-validator';
import { Transform } from 'class-transformer';

export class CreatePostDto {
  @IsString()
  @IsNotEmpty()
  position: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  @IsNotEmpty()
  location: string;

  @IsString()
  @IsNotEmpty()
  salary: string;

  @Transform(({ value }) => new Date(value))
  @IsDate()
  @IsNotEmpty()
  deadline: Date;

  @IsBoolean()
  status: boolean = true;


  @IsString()
  experience: string;

  // @IsNumber()
  // @IsInt()
  // @Min(1)
  numberOfPositions: number;

  @IsArray()
  tags: string[];

  @IsOptional()
  @IsBoolean()
  isHot?: boolean;

  @IsOptional()
  @IsBoolean()
  isUrgent?: boolean = false;

  // @IsString()
  // @IsNotEmpty()
  // companyId: string;

  @IsString()
  @IsNotEmpty()
  userId: string;}
