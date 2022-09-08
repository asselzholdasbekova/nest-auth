import { Body, Controller, Get, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreatePostDto } from './dto/create-post.dto'
import { PostService } from './post.service';

@ApiTags('Posts')
@Controller('/posts')
export class PostController {

    constructor(private postService: PostService) {}

    @ApiOperation({ summary: 'Return all users' })
    @ApiResponse({ status: 200})
    @Post()
    @UseInterceptors(FileInterceptor('image'))
    create(@Body() dto: CreatePostDto, @UploadedFile() image) {
        return this.postService.create(dto, image);
    }

}
