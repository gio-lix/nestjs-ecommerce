import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {ProductRepository} from "./product.repository";
import {CategoryModule} from "../category/category.module";

@Module({
  imports: [TypeOrmModule.forFeature([ProductRepository]), CategoryModule],
  controllers: [ProductsController],
  providers: [ProductsService]
})
export class ProductsModule {}
