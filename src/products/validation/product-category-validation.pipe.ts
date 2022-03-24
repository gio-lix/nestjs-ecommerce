import {BadRequestException, PipeTransform} from "@nestjs/common";
import {CategoryEnum} from "../../category/category-enum";

export class ProductCategoryValidationPipe implements PipeTransform {
    readonly allowedCategories = [
        CategoryEnum.ALL,
        CategoryEnum.CLOTHES,
        CategoryEnum.JEWELRY,
        CategoryEnum.TECH
    ]

    transform(value: any) {
        value = value.toUpperCase()

        if (!this.isCategoryValid(value)){
            throw new BadRequestException(`${value} is not invalid`)
        }
        return value
    }
    private isCategoryValid(category: any) {
       const idx = this.allowedCategories.indexOf(category)
       return idx !== -1
    }
}