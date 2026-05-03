import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { Task } from './task.entity';
import { Tag } from '../tags/tag.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private readonly tasksRepository: Repository<Task>,

    @InjectRepository(Tag)
    private readonly tagsRepository: Repository<Tag>,
  ) {}

  findAll(): Promise<Task[]> {
    return this.tasksRepository.find({
      relations: { tags: true },
    });
  }

  findByStatus(status?: string): Promise<Task[]> {
    if (!status) {
      return this.findAll();
    }

    return this.tasksRepository.find({
      where: { status: status as 'pending' | 'in-progress' | 'done' },
      relations: { tags: true },
    });
  }

  findOne(id: number): Promise<Task | null> {
    return this.tasksRepository.findOne({
      where: { id },
      relations: { tags: true },
    });
  }

  async create(data: CreateTaskDto): Promise<Task> {
    const task = this.tasksRepository.create({
      title: data.title,
      description: data.description ?? null,
      priority: data.priority,
      status: 'pending',
    });

    if (data.tagIds?.length) {
      task.tags = await this.tagsRepository.find({
        where: { id: In(data.tagIds) },
      });
    }

    return this.tasksRepository.save(task);
  }

  async update(id: number, data: UpdateTaskDto): Promise<Task | null> {
    const task = await this.findOne(id);

    if (!task) return null;

    Object.assign(task, data);

    return this.tasksRepository.save(task);
  }

  async remove(id: number): Promise<boolean> {
    const result = await this.tasksRepository.delete(id);
    return result.affected !== 0;
  }
}
