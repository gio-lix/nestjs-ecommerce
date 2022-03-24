import {Injectable, NotFoundException} from '@nestjs/common';
import {CreateCategoryDto} from './dto/create-category.dto';
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {CategoryEntity} from "./entities/category.entity";

@Injectable()
export class CategoryService {

    constructor(@InjectRepository(CategoryEntity) private repository: Repository<CategoryEntity>) {}

    async getAllCategory(){
        return await this.repository.find()
    }


    async getByName(dto: {category: string } ){
        const {category} = dto
        const categoryN: any = await this.repository.find({where:  { category: `${category.toUpperCase()}` }})
        return categoryN
    }


    async create(body: CreateCategoryDto) {
        const th: any = await this.repository.find({where:  { category: `${body.category}` }})

        if (th.length > 0) {
            throw new NotFoundException('already exist')
        }
        return await this.repository.save(body)
    }

    async findOne(id: number) {
      return this.repository.findOne(id);
    }



    //
    // update(id: number, updateCategoryDto: UpdateCategoryDto) {
    //   return `This action updates a #${id} category`;
    // }
    //
    // remove(id: number) {
    //   return `This action removes a #${id} category`;
    // }
}
