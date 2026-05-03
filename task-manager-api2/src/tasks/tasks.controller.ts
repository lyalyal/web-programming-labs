import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
  Query,
  NotFoundException,
  HttpCode,
  ParseIntPipe,
} from '@nestjs/common';

import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Controller('tasks')
export class TasksController {
  //Залежність сервісу через конструктор
  constructor(private readonly tasksService: TasksService) {}
  //Обробка апиту для отримання усіх задач
  @Get()
  findAll() {
    return this.tasksService.findAll();
  }

  @Get('search')
  findByStatus(@Query('status') status?: string) {
    return this.tasksService.findByStatus(status);
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const task = await this.tasksService.findOne(id);

    if (!task) throw new NotFoundException(`Task ${id} not found`);

    return task;
  }
  //Створення нової задачі
  @Post()
  create(@Body() dto: CreateTaskDto) {
    return this.tasksService.create(dto);
  }
  //Часткове оновлення задачу через її номер
  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateTaskDto,
  ) {
    const updated = await this.tasksService.update(id, dto);
    //Перевірка чи є в наявності задача
    if (!updated) throw new NotFoundException(`Завдання #${id} не знайдено`);

    return updated;
  }

  @Delete(':id')
  //Статус 204 якщо все успішно видалилось
  @HttpCode(204)
  async remove(@Param('id') id: number) {
    const removed = await this.tasksService.remove(id);
    if (!removed) throw new NotFoundException(`Завдання #${id} не знайдено`);
  }
}
