import {OrderStatusEnum} from "./order-enum";
import {IsEnum, IsNumber, IsNumberString, IsOptional, IsString, NotEquals} from "class-validator";

export class CreateOrderDto {

    @IsEnum(OrderStatusEnum)
    status: OrderStatusEnum = OrderStatusEnum.UNPAID

    @IsNumber()
    price: number

    @IsNumber()
    quantity: number

    @IsNumber()
    productId: number

    @IsNumberString()
    @IsOptional()
    userId: number
}
