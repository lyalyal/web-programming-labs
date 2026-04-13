import { Injectable } from '@nestjs/common';
import { Task } from './types/task.type';

@Injectable()
export class TasksService {
  private tasks: Task[] = [
    {
      id: '1',
      title: 'Закінчити лр',
      description: 'написати звіт',
      status: 'pending',
      priority: 'high',
      createdAt: new Date().toISOString(),
    },
    {
      id: '2',
      title: 'Практика',
      description: 'почати робити практику',
      status: 'in-progress',
      priority: 'medium',
      createdAt: new Date().toISOString(),
    },
    {
      id: '3',
      title: 'Оформити звіт',
      description: 'Практика + звіт',
      status: 'done',
      priority: 'low',
      createdAt: new Date().toISOString(),
    },
  ];
  //Отримання списку задач
  findAll(): Task[] {
    return this.tasks;
  }
  //Пошук задач за статусом
  findByStatus(status?: string): Task[] {
    //Якщо сатусу немає - задаі повертаються
    if (!status) return this.tasks;
    return this.tasks.filter((t) => t.status === status);
  }
  //Пошук однієї задачі за її айди
  findOne(id: string): Task | null {
    //Повернення обєкту, не викидаючи HTTP
    return this.tasks.find((t) => t.id === id) ?? null;
  }
  //Створення нової задачі
  create(data): Task {
    const task: Task = {
      id: Date.now().toString(),
      title: data.title,
      description: data.description,
      priority: data.priority,
      status: 'pending',
      createdAt: new Date().toISOString(),
    };
    this.tasks.push(task);
    return task;
  }
  //Оновлення задачі яка вже існує
  update(id: string, data): Task | null {
    const task = this.findOne(id);
    if (!task) return null;
    Object.assign(task, data);
    return task;
  }
  //Видалення задачі за айді
  remove(id: string): boolean {
    const index = this.tasks.findIndex((t) => t.id === id);
    if (index === -1) return false;
    this.tasks.splice(index, 1);
    return true;
  }
}
