import { forwardRef, Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Post } from "../posts/post.entity";
import { AuthModule } from "../auth/auth.module";
import { Role } from "../roles/role.entity";
import { RoleModule } from "../roles/role.module";
// import { UserRole } from "../roles/user-role.entity";
import { UserController } from "./user.contoller";
import { User } from "./user.entity";
import { UserService } from "./user.service";

@Module({
    exports: [UserService],
    providers: [UserService],
    controllers: [UserController],
    imports: [
        TypeOrmModule.forFeature([User, Role, Post]),
        RoleModule,
        forwardRef(() => AuthModule)
    ],
})
export class UserModule {}