import { IsString, IsNotEmpty, IsNumber, IsBoolean, IsArray, IsOptional, IsDate, IsInt, Min } from 'class-validator';
import { Transform } from 'class-transformer';

export class CreatePostDto {
    @IsString()
    @IsNotEmpty()
    position: string; 

    @IsString()
    @IsNotEmpty()
    description: string; 

    // @IsString()
    // requirements: string;

    @IsString()
    @IsNotEmpty()
    companyName: string;

    @IsString()
    @IsNotEmpty()
    location: string;

    @IsString()
    @IsNotEmpty()
    salary: string; 

    // @IsString()
    // workingHours: string; 

    @Transform(({ value }) => new Date(value)) 
    @IsDate()
    @IsNotEmpty()
    deadline: Date; 

    // @IsString()
    // @IsNotEmpty()
    // contactInfo: string; 

    @IsBoolean()
    status: boolean = true; 

    @Transform(({ value }) => new Date(value)) 
    @IsDate()
    postedDate: Date; 

    @IsString()
    experience: string;

    // @IsNumber()
    // @IsInt()
    // @Min(1)
    numberOfPositions: number;

    @IsArray()
    tags: string[]; 

    @IsOptional()
    @IsString()
    image?: string;

    @IsOptional() 
    @IsBoolean()
    isHot?: boolean;

    // @IsString()
    // @IsNotEmpty()
    // companyId: string;

    @IsString()
    @IsNotEmpty()
    userId: string;

    constructor() {
        this.postedDate = this.postedDate ?? new Date();
    }

}
