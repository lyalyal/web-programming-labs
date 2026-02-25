export {};

type Status = "todo" | "in_progress" | "done" | "cancelled";
type Priority = "low" | "medium" | "high" | "critical";

interface Task {
  id: number;
  title: string;
  description: string;
  status: Status;
  priority: Priority;
  assignee: string | null;
  createdAt: Date;
  dueDate: Date | null;
}
//Клас для керуванням задачами
class TaskManager {
  //створення приватних полів
  #tasks: Task[] = [];
  #nextId: number = 1;

  constructor(initialTasks: Task[] = []) {
    this.#tasks = [...initialTasks];
    this.#nextId =
      initialTasks.length > 0
        ? Math.max(...initialTasks.map((t) => t.id)) + 1
        : 1;
  }
  //Додавання нової задачі
  public addTask(dto: Omit<Task, "id" | "createdAt">): Task {
    const newTask: Task = {
      ...dto,
      id: this.#nextId++,
      createdAt: new Date(),
    };

    this.#tasks.push(newTask);
    return newTask;
  }
  //Оновлення полів задач за її номером
  public updateTask(
    id: number,
    updates: Partial<Omit<Task, "id" | "createdAt">>,
  ): Task | null {
    const task = this.#tasks.find((t) => t.id === id);
    if (!task) return null;

    Object.assign(task, updates);
    return task;
  }
  //Видалення задачі із списку
  public deleteTask(id: number): boolean {
    const index = this.#tasks.findIndex((t) => t.id === id);
    if (index === -1) return false;

    this.#tasks.splice(index, 1);
    return true;
  }
  //Гетер для копії масиву задач
  public get tasks(): Task[] {
    return [...this.#tasks];
  }
  //Гетер для загальної кількості задач
  public get count(): number {
    return this.#tasks.length;
  }

  public getById(id: number): Task | undefined {
    return this.#tasks.find((t) => t.id === id);
  }
}
//Наслідування класу для додавання функцій фільтрації
class FilteredTaskManager extends TaskManager {
  //Фільтрація за статусом
  public getByStatus(status: Status): Task[] {
    return this.tasks.filter((t) => t.status === status);
  }
  //Фільтрація за пріоритетом
  public getByPriority(priority: Priority): Task[] {
    return this.tasks.filter((t) => t.priority === priority);
  }
  //Пошук виконавця задачі
  public getByAssignee(assignee: string): Task[] {
    return this.tasks.filter((t) => t.assignee === assignee);
  }
  //Визначення скільки зхадач не виконано
  public getOverdue(): Task[] {
    const now = new Date();
    return this.tasks.filter(
      (t) =>
        t.dueDate &&
        t.dueDate < now &&
        t.status !== "done" &&
        t.status !== "cancelled",
    );
  }
}

console.log("=== Завдання 3: Класи та модифікатори доступу ===");

const manager = new FilteredTaskManager();

const t1 = manager.addTask({
  title: "Лабораторна робота ООП 19",
  description: "Виконати лабораторну роботу № 19 ",
  status: "in_progress",
  priority: "high",
  assignee: null,
  dueDate: new Date("2026-02-26"),
});

manager.addTask({
  title: "Тести з англіської",
  description: "Виконати тест з англіської швидко",
  status: "todo",
  priority: "medium",
  assignee: null,
  dueDate: null,
});

manager.addTask({
  title: "Таблиці для баз даних",
  description: "Побудувати таблиці та для них звязки",
  status: "done",
  priority: "critical",
  assignee: "Аліна",
  dueDate: new Date("2026-02-15"),
});

manager.addTask({
  title: "Конспект",
  description: "Написати конспект із предмету",
  status: "cancelled",
  priority: "low",
  assignee: null,
  dueDate: new Date("2025-01-10"),
});
//Вивід всіх можливостей програми
console.log("Додано:", manager.count);
console.log("Кількість задач:", manager.count);
console.log("Кількість у нотатках:", manager.getByStatus("todo"));
console.log("Кількість високого пріоритету:", manager.getByPriority("high"));
console.log("Виконавиця Аліна:", manager.getByAssignee("Аліна"));
console.log("Не виконано:", manager.getOverdue());

manager.updateTask(t1.id, { status: "done" });
console.log("Після оновлення:", manager.getById(t1.id));

manager.deleteTask(t1.id);
console.log("Після видалення кількість:", manager.count);
