import {IsNumber, IsNumberString, IsOptional} from "class-validator";

export class FilterProductDto {
    @IsNumberString()
    @IsOptional()
    categoryId: number

    @IsOptional()
    title: string

    @IsOptional()
    search: string
}