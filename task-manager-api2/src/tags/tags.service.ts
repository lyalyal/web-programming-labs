import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Tag } from './tag.entity';
import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';

@Injectable()
export class TagsService {
  constructor(
    @InjectRepository(Tag)
    private readonly tagsRepository: Repository<Tag>,
  ) {}

  findAll(): Promise<Tag[]> {
    return this.tagsRepository.find();
  }

  create(dto: CreateTagDto): Promise<Tag> {
    const tag = this.tagsRepository.create(dto);
    return this.tagsRepository.save(tag);
  }

  async update(id: number, dto: UpdateTagDto): Promise<Tag | null> {
    const tag = await this.tagsRepository.findOne({ where: { id } });
    if (!tag) return null;

    Object.assign(tag, dto);
    return this.tagsRepository.save(tag);
  }

  async remove(id: number): Promise<boolean> {
    const result = await this.tagsRepository.delete(id);
    return result.affected !== 0;
  }
}
