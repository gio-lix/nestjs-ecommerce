import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    ParseIntPipe,
    UseGuards,
    Request,
    Query
} from '@nestjs/common';
import {ProductsService} from './products.service';
import {CreateProductDto} from './dto/create-product.dto';
import {Product} from "./entities/product.entity";
import {JwtAuthGuard} from "../auth/guards/jwt-auth.guard";
import {FilterProductDto} from "./dto/filter-product.dto";

@Controller('products')
export class ProductsController {
    constructor(private readonly productsService: ProductsService) {}

    @Get()
    async findAll(@Query() dtoFilter: FilterProductDto) {
        return this.productsService.getAll(dtoFilter)
    }

    @UseGuards(JwtAuthGuard)
    @Post()
    async create(@Request() req,
    @Body() dto: CreateProductDto): Promise<Product> {
        const id = req.user.id
        return await this.productsService.create(dto, id);
    }



    @Get('/:id')
    getProductById(@Param('id', ParseIntPipe) id: number): Promise<Product> {
        return this.productsService.getProductById(id)
    }

    @Delete('/:id')
    deleteProductById(@Param('id', ParseIntPipe) id: number): Promise<void> {
        return this.productsService.deleteProductById(id)
    }



    // // @UseGuards(JwtAuthGuard)
    // @Patch('/:id')
    // updateProduct(@Param('id' ) id: number, @Body() body: CreateProductDto){
    //     return this.productsService.updateProduct(id, body)
    // }


    // @Patch('/:id/category')
    // updateProductCategory(
    //     @Param('id', ParseIntPipe) id: number,
    //     @Body('category', ProductCategoryValidationPipe) category: CategoryEnum): Promise<Product> {
    //
    //     return this.productsService.updateProductCategory(id, category)
    // }


}
