import {
  Controller,
  Get,
  Post,
  Delete,
  Body,
  Param,
  Query,
} from '@nestjs/common';

import type { Task } from './entities/task.entity';
import { CreateTaskDto } from './dto/create-task.dto';

@Controller('tasks')
export class TasksController {
  private tasks: Task[] = [
    {
      id: '1',
      title: 'Зробити лабораторну',
      description: 'Nest.js API',
      status: 'pending',
      priority: 'high',
      createdAt: new Date().toISOString(),
    },
    {
      id: '2',
      title: 'Виконати тести',
      description: 'Коли буду вільна',
      status: 'in-progress',
      priority: 'medium',
      createdAt: new Date().toISOString(),
    },
    {
      id: '3',
      title: 'Відпочити',
      description: 'Після занять',
      status: 'done',
      priority: 'low',
      createdAt: new Date().toISOString(),
    },
  ];
  // Повертає весь масив задач
  @Get()
  findAll(): Task[] {
    return this.tasks;
  }
  // Якщо параметр status не передано — повертає всі задачі
  // Якщо передано — фільтрує масив за полем status
  // Важливо: цей маршрут має бути оголошений до @Get(':id')
  @Get('search')
  findByStatus(@Query('status') status?: string): Task[] {
    if (!status) {
      return this.tasks;
    }

    return this.tasks.filter((task) => task.status === status);
  }
  // Якщо задачу не знайдено — повернути об'єкт { message: '...' }
  @Get(':id')
  findOne(@Param('id') id: string): Task | { message: string } {
    const task = this.tasks.find((task) => task.id === id);

    if (!task) {
      return { message: 'Task not found' };
    }

    return task;
  }
  // Створює нову задачу зі статусом 'pending' та поточним часом
  // id генерується як Date.now().toString()
  @Post()
  create(@Body() dto: CreateTaskDto): Task {
    const newTask: Task = {
      id: Date.now().toString(),
      title: dto.title,
      description: dto.description ?? '',
      priority: dto.priority,
      status: 'pending',
      createdAt: new Date().toISOString(),
    };

    this.tasks.push(newTask);

    return newTask;
  }
  // Якщо задачу не знайдено — повернути об'єкт { message: '...' }
  // Якщо знайдено — видалити та повернути підтвердження
  @Delete(':id')
  remove(@Param('id') id: string): { message: string } {
    const index = this.tasks.findIndex((task) => task.id === id);

    if (index === -1) {
      return { message: 'Task not found' };
    }

    this.tasks.splice(index, 1);

    return { message: 'Task deleted successfully' };
  }
}
