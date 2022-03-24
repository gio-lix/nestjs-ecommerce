import {Injectable, NotFoundException} from '@nestjs/common';
import {CreateProductDto} from './dto/create-product.dto';
import {ProductRepository} from "./product.repository";
import {InjectRepository} from "@nestjs/typeorm";
import {Product} from "./entities/product.entity";
import {CategoryService} from "../category/category.service";
import {FilterProductDto} from "./dto/filter-product.dto";

@Injectable()
export class ProductsService {

    constructor(
        @InjectRepository(ProductRepository)
        private productRepository: ProductRepository,
        private categoryService: CategoryService ) {
    }

    async getAll(filterDto: FilterProductDto) {
        return this.productRepository.allProducts(filterDto)
    }


    async create(dto: CreateProductDto, id: number): Promise<Product> {

        const {category} = dto
        const exist = await this.categoryService.getByName({category: category})
        let categoryId = Number(exist.map(e => e.id))

        if (!categoryId) {
            throw new NotFoundException(`Category Not match`)
        }
        return await this.productRepository.createProduct(dto, id, categoryId)
    }


    async getProductById(id: number): Promise<Product> {
        const found = await this.productRepository.findOne(id)

        if (!found) {
            throw new NotFoundException(`Task with ID ${id} not found`)
        }

        return found
    }

    async deleteProductById(id: number): Promise<void> {
        // const result = await this.productRepository.delete(id)

        //this.postsRepository.find({ relations: ['author'] });
        const found = await this.productRepository.findOne(id, { relations: ['user'] })


        console.log("here", found.user.id)


        // if (result.affected === 0) {
        //     throw new NotFoundException(`Task with ID ${id} not found`)
        // }
    }

    // updateProduct(id: number, body: CreateProductDto){
    //     return this.productRepository.updateProduct(id, body)
    // }
    //
    // async updateProductCategory(id: number, category: CategoryEnum): Promise<Product> {
    //
    //     const product = await this.getProductById(id)
    //     product.category = category
    //
    //     await product.save()
    //     return product
    // }


}
