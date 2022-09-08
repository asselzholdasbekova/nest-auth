import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, Length } from 'class-validator';

export class CreateUserDto {

    @ApiProperty({ example: 'test@mail.com', description: 'Email address' })
    @IsString({ message: 'Email should be a string!' })
    @IsEmail({ message: 'Incorrect email!' })
    readonly email: string;

    @ApiProperty({ example: 'testpassw', description: 'Password' })
    @IsString({ message: 'Password should be a string!' })
    @Length(4, 16, { message: 'Password length should be between 4 and 16!' })
    readonly password: string;
    
}