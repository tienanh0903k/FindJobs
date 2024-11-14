import {IsMongoId, IsNotEmpty, IsString } from 'class-validator';

export class CreateMessageDto {
  @IsString()
  @IsNotEmpty()
  @IsMongoId()
  sender_id: string;

  @IsString()
  @IsNotEmpty()
  @IsMongoId()

  receive_id: string;

  @IsString()
  @IsNotEmpty()
  message: string;
}
