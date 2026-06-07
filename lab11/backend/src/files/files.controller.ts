import {
  Controller,
  Get,
  Param,
  Post,
  Res,
  UploadedFile,
  UseInterceptors,
  ParseFilePipe,
  MaxFileSizeValidator,
  FileTypeValidator,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { memoryStorage } from 'multer';
import type { Response } from 'express';
import { FilesService } from './files.service';

@Controller('files')
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

  @Post()
  @UseInterceptors(
    FileInterceptor('file', {
      storage: memoryStorage(),
      limits: {
        fileSize: 5 * 1024 * 1024,
      },
    }),
  )
  uploadFile(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 5 * 1024 * 1024 }),
          new FileTypeValidator({
            fileType: /(image\/jpeg|image\/png|image\/webp)/,
          }),
        ],
      }),
    )
    file: Express.Multer.File,
  ) {
    return this.filesService.saveFile(file);
  }

  @Get()
  getFiles() {
    return this.filesService.getAllFiles();
  }

  @Get(':name')
  getFile(@Param('name') name: string, @Res() res: Response) {
    const filePath = this.filesService.getFilePath(name);
    const metadata = this.filesService.getFileMetadata(name);

    if (metadata) {
      res.type(metadata.mimetype);
    }

    return res.sendFile(filePath);
  }
}
