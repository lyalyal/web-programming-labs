import { Injectable, NotFoundException } from '@nestjs/common';
import { extname, join } from 'path';
import { writeFileSync, existsSync } from 'fs';
import { v4 as uuidv4 } from 'uuid';

export interface FileMetadata {
  name: string;
  originalName: string;
  size: number;
  mimetype: string;
  url: string;
}

@Injectable()
export class FilesService {
  private files: FileMetadata[] = [];
  saveFile(file: Express.Multer.File): FileMetadata {
    const extension = extname(file.originalname);
    const generatedName = `${uuidv4()}${extension}`;
    const uploadPath = join(process.cwd(), 'uploads', generatedName);
    writeFileSync(uploadPath, file.buffer);
    const metadata: FileMetadata = {
      name: generatedName,
      originalName: file.originalname,
      size: file.size,
      mimetype: file.mimetype,
      url: `http://localhost:3000/files/${generatedName}`,
    };
    this.files.push(metadata);
    return metadata;
  }
  getAllFiles(): FileMetadata[] {
    return this.files;
  }
  getFilePath(name: string): string {
    const filePath = join(process.cwd(), 'uploads', name);
    if (!existsSync(filePath)) {
      throw new NotFoundException('Файл не знайдено');
    }
    return filePath;
  }
  getFileMetadata(name: string): FileMetadata | undefined {
    return this.files.find((file) => file.name === name);
  }
}
