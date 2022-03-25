import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import {InjectRepository} from "@nestjs/typeorm";
import {OrderRepository} from "./order.repository";

@Injectable()
export class OrderService {

  constructor(@InjectRepository(OrderRepository) private orderRepository: OrderRepository) {}

  async create(createOrderDto: CreateOrderDto, userId: number) {
    return await this.orderRepository.createOrder(createOrderDto, userId)
  }

  async findAll( userId: number ) {
    return await this.orderRepository.getAllOrders(userId);
  }

  async findOne(id: number) {
    return await this.orderRepository.getById(id)
  }



  async update(id: number, updateOrderDto: UpdateOrderDto) {
    return await this.orderRepository.updateOrder(id, updateOrderDto);
  }

  async remove(id: number) {
    return await this.orderRepository.removeItem(id)
  }
}
