import { PartialType } from '@nestjs/mapped-types';
import { CreateProductDto } from './create-product.dto';
import {IsNumber, IsString} from "class-validator";

export class UpdateProductDto extends PartialType(CreateProductDto) {

    @IsString()
    title?: string

    @IsString()
    description?: string

    @IsNumber()
    price?: number
}
