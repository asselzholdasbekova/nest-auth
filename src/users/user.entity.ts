import { Column, CreateDateColumn, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm"
import { ApiProperty } from "@nestjs/swagger";
import { Role } from "../roles/role.entity";
import { Post } from "../posts/post.entity";

@Entity('User')
export class User {
    
    @ApiProperty({ example: '1', description: 'Unique identificator' })
    @PrimaryGeneratedColumn()
    id: number

    @ApiProperty({ example: 'test@mail.com', description: 'Email address' })
    @Column({
        type: 'varchar',
        unique: true,
        nullable: false
    })
    email: string

    @ApiProperty({ example: 'testpass', description: 'Password' })
    @Column({
        type: 'varchar',
        nullable: false
    })
    password: string

    @ApiProperty({ example: 'false', description: 'Banned or not' })
    @Column({
        type: 'boolean',
        default: false
    })
    banned: boolean

    @ApiProperty({ example: 'For something', description: 'Reason for being banned' })
    @Column({
        name: 'ban_reason',
        type: 'varchar',
        nullable: true
    })
    banReason: string

    @ApiProperty({ example: '2022-09-01 10:41:46.736774', description: 'Date of user creation' })
    @CreateDateColumn({ 
        type: "timestamp", 
        default: () => "CURRENT_TIMESTAMP(6)", 
        name: 'created_at' 
    })
    public createdAt: Date;

    @ApiProperty({ example: '2022-09-01 10:41:46.736774', description: 'Date of user update' })
    @UpdateDateColumn({ 
        type: "timestamp", 
        default: () => "CURRENT_TIMESTAMP(6)", 
        onUpdate: "CURRENT_TIMESTAMP(6)", 
        name: 'updated_at' 
    })

    public updatedAt: Date;

    @ManyToMany(() => Role, role => role.users)
    @JoinTable({
        name: 'User_Role',
        joinColumn: {
            name: 'user_id',
        },
        inverseJoinColumn: {
            name: 'role_id',
        }
    })
    roles: Role[];

    @OneToMany(() => Post, (post) => post.author)
    posts: Post[];

}