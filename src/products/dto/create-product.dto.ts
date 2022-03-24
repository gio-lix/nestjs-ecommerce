import {IsEnum, IsNumber, IsString} from "class-validator";

export class CreateProductDto {
    @IsString()
    title?: string

    @IsString()
    description?: string

    @IsNumber()
    price?: number

    @IsString()
    category: string

    // //check
    // @IsString()
    // order?: string

}