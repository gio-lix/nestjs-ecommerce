import {Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {CategoryEnum} from "../category-enum";

@Entity('category')
export class CategoryEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    category: CategoryEnum;
}