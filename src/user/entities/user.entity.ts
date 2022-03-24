import {Column, CreateDateColumn, Entity, ManyToMany, OneToMany, PrimaryGeneratedColumn} from 'typeorm'


@Entity('users')
export class UserEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    fullName: string

    @Column({
        unique: true
    })
    email: string

    @Column({nullable: true})
    password?: string

    @CreateDateColumn()
    createAt: Date

    @CreateDateColumn()
    updateAt: Date
}

