import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../users/user.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { User } from '../users/user.entity';

@Injectable()
export class AuthService {

    constructor(private userService: UserService, 
                private jwtService: JwtService) {}

    async login(dto: CreateUserDto) {
        const user = await this.validateUser(dto);

        return this.generateToken(user);
    }

    async register(dto: CreateUserDto) {
        const candidate = await this.userService.getByEmail(dto.email);
        if(candidate) {
            throw new HttpException('User with such email already exists!', HttpStatus.BAD_REQUEST);
        }
        const hashPassword = await bcrypt.hash(dto.password, 5);
        const user = await this.userService.create({...dto, password: hashPassword});

        return this.generateToken(user);
    }

    private async generateToken(user: User) {
        const payload = { email: user.email, id: user.id, roles: user.roles }
        return {
            token: this.jwtService.sign(payload)
        }
    }

    private async validateUser(dto: CreateUserDto) {
        const user = await this.userService.getByEmail(dto.email);
        const passwordEquals = await bcrypt.compare(dto.password, user.password);
        if(user && passwordEquals) {
            return user;
        }
        throw new UnauthorizedException({ message: 'Incorrect email or password!' });
    }

}
