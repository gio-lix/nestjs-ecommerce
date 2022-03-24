import {ForbiddenException, Injectable} from '@nestjs/common';
import {UserService} from "../user/user.service";
import {JwtService} from "@nestjs/jwt";
import {UserEntity} from "../user/entities/user.entity";
import {CreateUserDto} from "../user/dto/create-user.dto";
import {comparePasswords, encodePassword} from "../utils/bcrypt";
import {LoginUserDto} from "../user/dto/login-user.dto";

@Injectable()
export class AuthService {
    constructor(
        private usersService: UserService,
        private jwtService: JwtService) {
    }

    async validateUser(email: string, password: string): Promise<any> {
        const user = await this.usersService.findByCond({email, password});
        if (user && user.password === password) {
            const {password, ...result} = user;
            return result;
        }
        return null;
    }

    generateJwtToken(data: { id: number, email: string }) {
        const payload = {email: data.email, sub: data.id};
        return this.jwtService.sign(payload)
    }


    async Register(dto: CreateUserDto) {

        let password = encodePassword(dto.password)
        try {
            const newUser = await this.usersService.create({...dto, password})
            return {
                ...newUser,
                token: this.generateJwtToken(newUser)
            };
        } catch (err) {
            throw new ForbiddenException("something went wrong")
        }


    }


    async login( body: LoginUserDto) {
        const {email} = body
        const me = await this.usersService.findByCond({email});

        const match = comparePasswords(body.password ,me.password )
        const {password, ...userData} = me

        if (match) {
            return {
                ...userData,
                token: this.generateJwtToken(userData)
            };
        } else {
            return "Password Not Match"
        }
    }
}
