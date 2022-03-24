import {BaseEntity, Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {UserEntity} from "../../user/entities/user.entity";
import {Product} from "../../products/entities/product.entity";
import {OrderStatusEnum} from "../dto/order-enum";

@Entity()
export class Order extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    quantity: number

    @Column({ name: 'price' })
    price: number

    @Column({ name: 'order_status' })
    status: OrderStatusEnum

    @CreateDateColumn()
    createAt: Date;

    @CreateDateColumn()
    updateAt: Date;

    @ManyToOne(type => Product )
    @JoinColumn({name: 'productId'})
    product: Product

    @ManyToOne(type => UserEntity )
    @JoinColumn({name: 'userId'})
    user: UserEntity


}
