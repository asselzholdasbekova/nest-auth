import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm"
import {ApiProperty} from "@nestjs/swagger";
import { User } from "../users/user.entity";

@Entity('Role')
export class Role {
    
    @ApiProperty({ example: '1', description: 'Unique identificator' })
    @PrimaryGeneratedColumn()
    id: number

    @ApiProperty({ example: 'ADMIN', description: 'Role value' })
    @Column({
        type: 'varchar',
        unique: true,
        nullable: false
    })
    value: string

    @ApiProperty({ example: 'administrator', description: 'Role description' })
    @Column({
        type: 'varchar',
        nullable: false
    })
    description: string

    @ManyToMany(() => User, user => user.roles)
    @JoinTable({
        name: 'User_Role',
        joinColumn: {
            name: 'role_id',
        },
        inverseJoinColumn: {
            name: 'user_id',
        }
    })
    users: User[];

}