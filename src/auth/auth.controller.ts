import {Body, Controller, Post} from '@nestjs/common';
import {AuthService} from './auth.service';
import {CreateUserDto} from "../user/dto/create-user.dto";
import {LoginUserDto} from "../user/dto/login-user.dto";

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    // @UseGuards(LocalAuthGuard)
    @Post('login')
    async login(@Body() body: LoginUserDto) {
        return this.authService.login(body);
    }

    @Post('register')
    async Register(@Body() dto: CreateUserDto) {
        return this.authService.Register(dto)
    }


}
