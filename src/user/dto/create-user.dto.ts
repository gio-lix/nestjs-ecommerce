import {IsEmail, IsNotEmpty, IsString, Length, Min} from "class-validator";
import {UniqueOnDatabase} from "../../auth/validation/UniqueValidation";
import {UserEntity} from "../entities/user.entity";

export class CreateUserDto {
    @IsNotEmpty()
    @IsString()
    fullName: string

    @IsNotEmpty()
    @IsEmail()
    @UniqueOnDatabase(UserEntity)
    email: string

    @Length(4, 44)
    password?: string
}