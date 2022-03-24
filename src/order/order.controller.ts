import {Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request, Query} from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import {JwtAuthGuard} from "../auth/guards/jwt-auth.guard";
import {FilterOrderDto} from "./dto/filter-order.dto";

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Request() req,  @Body() createOrderDto: CreateOrderDto) {
    const userId = req.user.id
    return this.orderService.create(createOrderDto, userId);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll(@Request() req ) {
    const userId = req.user.id
    return this.orderService.findAll(userId);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.orderService.findOne(+id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOrderDto: UpdateOrderDto) {
    return this.orderService.update(+id, updateOrderDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.orderService.remove(+id);
  }
}
