import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateRoleDto } from "./dto/create-role.dto";
import { Role } from "./role.entity";

@Injectable()
export class RoleService {

    constructor(@InjectRepository(Role) private roleRepository: Repository<Role>) {}

    async getByValue(value: string) {
        const role = await this.roleRepository.findOne({ where: { value } });

        return role;
    }

    async create(dto: CreateRoleDto) {
        const role = await this.roleRepository.save(dto);

        return role;
    }

}