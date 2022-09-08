import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FileService } from './file.service';

@Module({
    exports: [FileService],
    providers: [FileService],
    controllers: [],
    imports: []
})
export class FileModule {}
