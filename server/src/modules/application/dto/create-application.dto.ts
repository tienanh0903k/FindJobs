// src/job-postings/dto/create-job-posting.dto.ts
import { IsString, IsNotEmpty, IsBoolean, IsOptional, IsEmail } from 'class-validator';
import { Transform } from 'class-transformer';

export class CreateApplocationDto {
    @IsString()
    @IsNotEmpty()
    userId: string;

    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsNotEmpty()
    jobId: string;

    @IsString()
    @IsNotEmpty()
    resume_url: string;

    @IsString()
    @IsOptional()
    coverLetter?: string;

    @IsString()
    @IsNotEmpty()
    status: string;

    @Transform(({ value }) => new Date(value)) 
    @IsNotEmpty()
    appliedAt: Date;

    @Transform(({ value }) => new Date(value))
    @IsNotEmpty()
    updatedAt: Date;

    @IsOptional()
    @IsBoolean()
    isSeen?: boolean;

}
