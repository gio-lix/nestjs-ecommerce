import { Injectable } from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm'
import {CreateUserDto} from "./dto/create-user.dto";
import {UserEntity} from "./entities/user.entity";
import { Repository} from "typeorm";
import {LoginUserDto} from "./dto/login-user.dto";

@Injectable()
export class UserService {

    constructor(@InjectRepository(UserEntity) private repository: Repository<UserEntity>) {}

    findAll(){
        return this.repository.find()
    }

    findById(id: number){
        return this.repository.findOne(id)
    }

    findByCond(cond: LoginUserDto){
        return this.repository.findOne(cond)
    }

    create(body: CreateUserDto) {
        return this.repository.save(body)
    }

    update(id: number, body: any) {
        return this.repository.update(id, body)
    }
}
