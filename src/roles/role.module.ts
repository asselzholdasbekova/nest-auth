import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "../users/user.entity";
import { RoleController } from "./role.controller";
import { Role } from "./role.entity";
import { RoleService } from "./role.service";
// import { UserRole } from "./user-role.entity";

@Module({
    exports: [RoleService],
    providers: [RoleService],
    controllers: [RoleController],
    imports: [
        TypeOrmModule.forFeature([Role, User, ]),
    ],
})
export class RoleModule {}