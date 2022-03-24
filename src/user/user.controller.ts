import {Body, Controller, Get, Param, Patch, Post, Request, UseGuards} from '@nestjs/common';
import {CreateUserDto} from "./dto/create-user.dto";
import {UserService} from "./user.service";
import {LocalAuthGuard} from "../auth/guards/local-auth.guard";
import {JwtAuthGuard} from "../auth/guards/jwt-auth.guard";

@Controller('user')
export class UserController {

    constructor(private usersService: UserService) {}

    @Get()
    findAllUsers(){
        return this.usersService.findAll()
    }

    @UseGuards(JwtAuthGuard)
    @Get('profile')
    getProfile(@Request() req) {
        return req.user;
    }

    @Get('/:id')
    findOne(@Param('id') id: number ) {
        return this.usersService.findById(id)
    }

    @UseGuards(JwtAuthGuard)
    @Patch('profile')
    updateUser( @Request() req, @Body() body: any  ){
        return this.usersService.update(req.user.id, body)
    }

}
