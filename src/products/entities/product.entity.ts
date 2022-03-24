import {BaseEntity, Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {CategoryEnum} from "../../category/category-enum";
import {UserEntity} from "../../user/entities/user.entity";
import {CategoryEntity} from "../../category/entities/category.entity";
import {Order} from "../../order/entities/order.entity";

@Entity()
export class Product extends BaseEntity{
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    title: string

    @Column()
    description: string

    @Column()
    price: number

    @CreateDateColumn()
    createAt: Date;

    @CreateDateColumn()
    updateAt: Date;

    @ManyToOne(type => UserEntity )
    @JoinColumn({name: 'userId'})
    user: UserEntity

    @ManyToOne(type => CategoryEntity )
    @JoinColumn({name: 'category'})
    category: CategoryEntity

    // @ManyToOne(type => Order )
    // @JoinColumn({name: 'order'})
    // order: Order

}
