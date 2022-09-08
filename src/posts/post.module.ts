import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FileModule } from '../files/file.module';
import { User } from '../users/user.entity';
import { PostController } from './post.controller';
import { Post } from './post.entity';
import { PostService } from './post.service';

@Module({
  exports: [],
  providers: [PostService],
  controllers: [PostController],
  imports: [
    TypeOrmModule.forFeature([User, Post ]),
    FileModule
  ]
})
export class PostModule {}
