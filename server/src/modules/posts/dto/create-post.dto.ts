// src/job-postings/dto/create-job-posting.dto.ts
import { IsString, IsNotEmpty, IsNumber, IsBoolean, IsArray, IsOptional, IsDate } from 'class-validator';
import { Transform } from 'class-transformer';

export class CreatePostDto {
    @IsString()
    @IsNotEmpty()
    position: string; // Tên vị trí

    @IsString()
    @IsNotEmpty()
    description: string; // Mô tả công việc

    @IsString()
    @IsNotEmpty()
    requirements: string; // Các yêu cầu

    @IsString()
    @IsNotEmpty()
    companyName: string; // Tên công ty

    @IsString()
    @IsNotEmpty()
    location: string; // Địa điểm

    @IsString()
    @IsNotEmpty()
    salary: string; // Mức lương

    @IsString()
    @IsNotEmpty()
    workingHours: string; // Giờ làm việc

    @Transform(({ value }) => new Date(value)) // Chuyển đổi từ chuỗi sang Date
    @IsDate()
    @IsNotEmpty()
    deadline: Date; // Ngày hết hạn

    @IsString()
    @IsNotEmpty()
    contactInfo: string; // Thông tin liên hệ

    @IsString()
    @IsNotEmpty()
    status: string; // Trạng thái

    @Transform(({ value }) => new Date(value)) // Chuyển đổi từ chuỗi sang Date
    @IsDate()
    @IsNotEmpty()
    postedDate: Date; // Ngày đăng

    @IsString()
    @IsNotEmpty()
    experience: string; // Kinh nghiệm

    @IsNumber()
    @IsNotEmpty()
    numberOfPositions: number; // Số lượng vị trí

    @IsArray()
    @IsNotEmpty()
    tags: string[]; // Tag liên quan đến công việc

    @IsOptional()
    @IsString()
    image?: string; // Hình ảnh (tuỳ chọn)

    @IsOptional()
    @IsBoolean()
    isHot?: boolean; // Trường để đánh dấu tin tuyển dụng nổi bật

    @IsString()
    @IsNotEmpty()
    companyId: string;

    @IsString()
    @IsNotEmpty()
    userId: string;

}
