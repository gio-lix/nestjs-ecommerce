import {EntityRepository, Repository} from "typeorm";
import {Product} from "./entities/product.entity";
import {CreateProductDto} from "./dto/create-product.dto";
import {FilterProductDto} from "./dto/filter-product.dto";
import {UpdateProductDto} from "./dto/update-product.dto";
import {NotFoundException} from "@nestjs/common";

@EntityRepository(Product)
export class ProductRepository extends Repository<Product> {

    async createProduct(dto: CreateProductDto, id: number, categoryId: number): Promise<Product> {

        return await this.save({
            title: dto.title,
            description: dto.description,
            price: dto.price,
            user: {id: id},
            category: {id: categoryId}
        })
    }

    async allProducts(filterDto: FilterProductDto) {
        const {categoryId, title, search} = filterDto

        const cd = await this.createQueryBuilder('b')

        if (categoryId ) {
            cd.where("category = :categoryId ", { categoryId: categoryId})
        }

        if (title ) {
            cd.where("title like :title" , { title:`%${title}%` })
        }

        if (search ) {
            cd.where("title like :search" , { search:`%${search}%` })
            cd.orWhere('description like :searchDescription', { searchDescription: `%${search}%` })
        }

        return cd.getMany()
    }


    async deleteProductById(id: number): Promise<void> {

        const found = await this.findOne(id, { relations: ['order'] })

        if (found.order.length) {
            throw new NotFoundException(`This item "${found.title}" is listed in the order box.`)
        }
        const result = await this.delete(id)
    }


    async updateProduct(id: number, body: UpdateProductDto) {
        const found = await this.findOne(id)

        if (!found) {
            throw new NotFoundException("Not Found")
        }
        // @ts-ignore
        return await this.update(id, body)

    }
}