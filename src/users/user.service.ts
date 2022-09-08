import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { RoleService } from "../roles/role.service";
import { Repository } from "typeorm";
import { CreateUserDto } from "./dto/create-user.dto";
import { User } from "./user.entity";
import { debugPort } from "process";
import { AssignRoleDto } from "./dto/assign-role.dto";
import { BanUserDto } from "./dto/ban-user.dto";

@Injectable()
export class UserService {

    constructor(@InjectRepository(User) private userRepository: Repository<User>,
        private roleService: RoleService) {}

    async getById(id: number) {
        const user = this.userRepository.findOne({ where: { id }, relations: { roles: true, posts: true } })

        return user;
    }

    async getByEmail(email: string) {
        const user = this.userRepository.findOne({ where: { email }, relations: { roles: true } });

        return user;
    }

    async getAll() {
        const users = this.userRepository.find({ relations: { roles: true } });

        return users;
    }

    async create(dto: CreateUserDto) {
        const user = await this.userRepository.create(dto);
        const role = await this.roleService.getByValue('USER');
        user.roles = [];
        user.roles.push(role);
        await this.userRepository.save(user);

        return user;
    }

    async update() {}

    async delete() {}

    async assignRole(dto: AssignRoleDto) {
        const user = await this.userRepository.findOne({ where: { id: dto.userId }, relations: {roles: true} })
        const role = await this.roleService.getByValue(dto.value);
        if(user && role) {
            user.roles.push(role);
            await this.userRepository.save(user);

            return dto;
        }
        throw new HttpException('User or role not found!', HttpStatus.NOT_FOUND);
    }

    async ban(dto: BanUserDto) {
        const user = await this.userRepository.findOne({ where: { id: dto.userId } })
        if(!user) {
            throw new HttpException('User not found!', HttpStatus.NOT_FOUND);
        }
        user.banned = true;
        user.banReason = dto.banReason;
        await this.userRepository.save(user);
        
        return user;
    }

}