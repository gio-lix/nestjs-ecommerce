import {Controller, Get, Post, Body, Patch, Param, Delete, Query} from '@nestjs/common';
import {CategoryService} from './category.service';
import {CreateCategoryDto} from './dto/create-category.dto';
import {ProductCategoryValidationPipe} from "../products/validation/product-category-validation.pipe";

@Controller('category')
export class CategoryController {
    constructor(private readonly categoryService: CategoryService) {
    }

    @Get()
    findAll() {
        return this.categoryService.getAllCategory();
    }


    @Get('/:id')
    findOne(@Param('id') id: number) {
        return this.categoryService.findOne(id);
    }

    @Post()
    create(@Body('category', ProductCategoryValidationPipe) body: CreateCategoryDto) {
        const dto: any = {category: body}
        return this.categoryService.create(dto);
    }



// @Patch(':id')
// update(@Param('id') id: string, @Body() updateCategoryDto: UpdateCategoryDto) {
//   return this.categoryService.update(+id, updateCategoryDto);
// }
//
// @Delete(':id')
// remove(@Param('id') id: string) {
//   return this.categoryService.remove(+id);
// }
}
