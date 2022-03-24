import {EntityRepository, Repository} from "typeorm";
import {Product} from "./entities/product.entity";
import {CreateProductDto} from "./dto/create-product.dto";
import {FilterProductDto} from "./dto/filter-product.dto";

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


}