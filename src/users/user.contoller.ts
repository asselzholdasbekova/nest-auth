import { Body, CacheInterceptor, CacheTTL, Controller, Get, Param, Post, UseGuards, UseInterceptors } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { UserService } from "./user.service";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { User } from "./user.entity";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import { Roles } from "../auth/roles-auth.decorator";
import { RolesGuard } from "../auth/roles.guard";
import { BanUserDto } from "./dto/ban-user.dto";
import { AssignRoleDto } from "./dto/assign-role.dto";

@ApiTags('Users')
@Controller('/users')
export class UserController {

    constructor(private userService: UserService) {}

    @ApiOperation({ summary: 'Return all users' })
    @ApiResponse({ status: 200, type: [User] })
    @UseGuards(JwtAuthGuard)
    @Get()
    getAll() {
        return this.userService.getAll();
    }

    @ApiOperation({ summary: 'Returns user by id' })
    @ApiResponse({ status: 200, type: [User] })
    @CacheTTL(30)
    @Get(':id')
    getById(@Param('id') id: number) {
        return this.userService.getById(id);
    }

    @ApiOperation({ summary: 'Creates new user' })
    @ApiResponse({ status: 200, type: User })
    @Post()
    create(@Body() dto: CreateUserDto) {
        return this.userService.create(dto);
    }

    @ApiOperation({ summary: 'Assigns a role to the user' })
    @ApiResponse({ status: 200 })
    @Roles('ADMIN')
    @UseGuards(RolesGuard)
    @Post('/role')
    assignRole(@Body() dto: AssignRoleDto) {
        return this.userService.assignRole(dto);
    }

    @ApiOperation({ summary: 'Bans the user' })
    @ApiResponse({ status: 200 })
    @Roles('ADMIN')
    @UseGuards(RolesGuard)
    @Post('/ban')
    ban(@Body() dto: BanUserDto) {
        return this.userService.ban(dto);
    }

}