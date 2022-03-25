import {EntityRepository, Repository} from "typeorm";
import {Order} from "./entities/order.entity";
import {CreateOrderDto} from "./dto/create-order.dto";
import {UpdateOrderDto} from "./dto/update-order.dto";

@EntityRepository(Order)
export class OrderRepository extends Repository<Order> {
    async createOrder(createOrderDto: CreateOrderDto, id: number) {

        const {status,quantity,price,productId} = createOrderDto


        return await this.save({
            quantity: quantity,
            status: status,
            price: price,
            product: {id: productId},
            user: {id: id}
        })
    }

    async getAllOrders( userId: number) {
        return await this.find({where : {user: userId}})
    }

    async getById(id: number) {
        const find = await this.findOne({id})
        if (find) {
            return find
        } else {
            return "Not Found"
        }
    }

    async updateOrder(id: number, updateOrderDto: UpdateOrderDto) {
        const found =  await this.getById(id)
        if (found) {
            return await this.update(id, updateOrderDto)
        } else {
            return "Not Found"
        }
    }

    async removeItem(id: number) {
        return await this.delete(id)
    }
}