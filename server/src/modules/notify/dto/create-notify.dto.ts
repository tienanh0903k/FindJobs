import { IsBoolean, IsDate, IsString } from 'class-validator';

export class NotifyDto {
  @IsString()
  userId: string;

  @IsString()
  applicationId: string;

  @IsString()
  message: string;

  @IsBoolean()
  isRead: boolean = false;

  @IsDate()
  createdAt: Date;

  @IsDate()
  updatedAt: Date;
}
