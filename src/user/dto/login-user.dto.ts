import {IsEmail, IsNumberString, IsOptional, Length} from "class-validator";

export class LoginUserDto {


    @IsEmail()
    email: string

    @Length(3, 44)
    password?: string
}