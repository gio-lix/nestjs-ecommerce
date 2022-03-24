import {IsString} from "class-validator";

export class AuthDto {
    id: number
    @IsString()
    email: string
    @IsString()
    password: string
}