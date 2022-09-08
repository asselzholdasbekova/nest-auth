import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateRoleDto } from './dto/create-role.dto';
import { RoleService } from './role.service';

@ApiTags('Roles')
@Controller('/roles')
export class RoleController {

    constructor(private roleService: RoleService) {}

    @Get('/:value')
    getByValue(@Param('value') value: string){
        return this.roleService.getByValue(value);
    }

    @Post()
    create(@Body() dto: CreateRoleDto){
        return this.roleService.create(dto);
    }

}
