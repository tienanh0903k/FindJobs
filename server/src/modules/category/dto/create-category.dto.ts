import { IsString } from "class-validator";

export class CreateCategoryDto {
    id?: string;
    @IsString()
    name: string;
}

