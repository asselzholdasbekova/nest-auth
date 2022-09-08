import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm"
import { ApiProperty } from "@nestjs/swagger";
import { User } from "../users/user.entity";

@Entity('Post')
export class Post {
    
    @ApiProperty({ example: '1', description: 'Unique identificator' })
    @PrimaryGeneratedColumn()
    id: number

    @ApiProperty({ example: 'Daily routine', description: 'Post title' })
    @Column({
        type: 'varchar',
        nullable: false
    })
    title: string

    @ApiProperty({ example: 'This is my breakfast for today', description: 'Post content' })
    @Column({
        type: 'varchar',
        nullable: false
    })
    content: string

    @ApiProperty({ example: '', description: 'Link to the image' })
    @Column({
        type: 'varchar',
    })
    image: string

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

    @ManyToOne(() => User, (user) => user.posts)
    author: User;

}