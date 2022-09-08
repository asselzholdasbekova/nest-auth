import { Injectable} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FileService } from '../files/file.service';
import { Repository } from 'typeorm';
import { CreatePostDto } from './dto/create-post.dto';
import { Post } from './post.entity';

@Injectable()
export class PostService {

    constructor(@InjectRepository(Post) private postRepository: Repository<Post>,
                private fileService: FileService) {}

    async create(dto: CreatePostDto, image: any) {
        const fileName = await this.fileService.create(image);
        const post = await this.postRepository.create({ ...dto, image: fileName });
        await this.postRepository.save(post);

        //code that save the post to the user

        return post;
    }

}
