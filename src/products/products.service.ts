import {Injectable, NotFoundException} from '@nestjs/common';
import {CreateProductDto} from './dto/create-product.dto';
import {ProductRepository} from "./product.repository";
import {InjectRepository} from "@nestjs/typeorm";
import {Product} from "./entities/product.entity";
import {CategoryService} from "../category/category.service";
import {FilterProductDto} from "./dto/filter-product.dto";
import {UpdateProductDto} from "./dto/update-product.dto";

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
        return await this.productRepository.deleteProductById(id)
    }


    async updateProduct(id: number, body: UpdateProductDto)  {
        return await this.productRepository.updateProduct(id, body)
    }



}
