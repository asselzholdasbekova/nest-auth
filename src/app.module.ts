import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "./users/user.entity";
import { UserModule } from "./users/user.module";
import { Role } from "./roles/role.entity";
import { RoleModule } from "./roles/role.module";
// import { UserRole } from "./roles/user-role.entity";
import { AuthModule } from './auth/auth.module';
import { PostModule } from './posts/post.module';
import { Post} from './posts/post.entity';
import { FileModule } from './files/file.module';

@Module({
    exports: [],
    providers: [],
    controllers: [],
    imports: [
        ConfigModule.forRoot({
            envFilePath: `.${process.env.NODE_ENV}.env`
        }),
        TypeOrmModule.forRoot({
            type: 'postgres',
            host: process.env.POSTGRES_HOST,
            port: Number(process.env.POSTGRES_PORT),
            username: process.env.POSTGRES_USER,
            password: process.env.POSTGRES_PASSWORD,
            database: process.env.POSTGRES_DB,
            entities: [User, Role, Post],
            synchronize: true,
            autoLoadEntities: true
        }),
        UserModule,
        RoleModule,
        AuthModule,
        PostModule,
        FileModule
    ],
})
export class AppModule {}