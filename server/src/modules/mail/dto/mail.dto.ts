import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class SendMailDto {
  @IsEmail()
  to: string;

  @IsNotEmpty()
  @IsString()
  subject: string;

  @IsNotEmpty()
  @IsString()
  name: string; 
  @IsNotEmpty()
  @IsString()
  message: string; 
}
