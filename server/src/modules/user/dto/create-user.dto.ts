import { IsEmail, IsString , IsOptional, IsArray, IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  userName: string;

  @IsEmail()
  @IsNotEmpty()
  email: string; 

  @IsString()
  @IsNotEmpty()
  password: string;

  
  @IsString()
  @IsNotEmpty()
  role: string;


  @IsString()
  @IsOptional()
  phone?: string;

  @IsString()
  @IsOptional()
  address?: string;

  @IsString()
  @IsOptional()
  avatar?: string;

  @IsArray()
  @IsOptional()
  education?: {
    institution: string;
    degree: string;
    startDate: Date;
    endDate: Date;
  }[];

  @IsArray()
  @IsOptional()
  workExperience?: {
    companyName: string;
    position: string;
    startDate: Date;
    endDate: Date;
  }[];

  @IsArray()
  @IsOptional()
  skills?: string[];

  @IsArray()
  @IsOptional()
  projects?: {
    title: string;
    description: string;
  }[];

  @IsArray()
  @IsOptional()
  certifications?: {
    name: string;
    issuedDate: Date;
  }[];

  @IsArray()
  @IsOptional()
  awards?: {
    title: string;
    description: string;
    awardedDate: Date;
  }[];


   @IsString()
   @IsNotEmpty()
   position: string; 
 
   @IsString()
   @IsNotEmpty()
   fullName: string;
   @IsString()
   @IsNotEmpty()
   introduction: string; 
}
