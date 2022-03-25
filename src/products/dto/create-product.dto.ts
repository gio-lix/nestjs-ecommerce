import {IsEnum, IsNumber, IsOptional, IsString} from "class-validator";

export class CreateProductDto {
    @IsString()
    title?: string

    @IsString()
    description?: string

    @IsNumber()
    price?: number

    @IsString()
    category: string

    @IsOptional()
    @IsString()
    order?: string

}