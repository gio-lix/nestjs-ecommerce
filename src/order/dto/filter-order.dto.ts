import {IsNumberString, IsOptional} from "class-validator";

export class FilterOrderDto {
    @IsNumberString()
    @IsOptional()
    userId: number
}