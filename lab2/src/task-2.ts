import { VARIANT } from "./config";

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

const tasks: Task[] = [
  {
    id: 1 + VARIANT,
    title: "Розробити API",
    description: "Реалізувати REST API для управління задачами",
    status: "in_progress",
    priority: "high",
    assignee: "Іван Петренко",
    createdAt: new Date("2025-01-10"),
    dueDate: new Date("2025-02-01"),
  },
  {
    id: 2 + VARIANT,
    title: "Написати тести",
    description: "Покрити unit-тестами основну логіку",
    status: "todo",
    priority: "medium",
    assignee: null,
    createdAt: new Date("2025-01-12"),
    dueDate: new Date("2025-02-15"),
  },
  {
    id: 3 + VARIANT,
    title: "Налаштувати БД",
    description: "Підключити PostgreSQL, виконати міграції",
    status: "done",
    priority: "critical",
    assignee: "Олена Коваль",
    createdAt: new Date("2025-01-05"),
    dueDate: new Date("2025-01-20"),
  },
  {
    id: 4 + VARIANT,
    title: "Оновити документацію",
    description: "Описати API у Swagger",
    status: "todo",
    priority: "low",
    assignee: null,
    createdAt: new Date("2025-01-15"),
    dueDate: null,
  },
  {
    id: 5 + VARIANT,
    title: "Code review",
    description: "Перевірити pull request від команди",
    status: "cancelled",
    priority: "medium",
    assignee: "Андрій Лисенко",
    createdAt: new Date("2025-01-18"),
    dueDate: new Date("2025-01-25"),
  },
];
//Інтерфейс для відповідей сервера
interface ApiResponse<T> {
  //Т параметр який може підставити любу структуру даних
  data: T;
  status: number;
  message: string;
  timestamp: Date;
}
//Створення успішної відповіді
function createSuccessResponse<T>(data: T): ApiResponse<T> {
  return {
    data,
    status: 200,
    message: "Success",
    timestamp: new Date(),
  };
}
//Створення відповіді про помилку
function createErrorResponse<T>(message: string): ApiResponse<T | null> {
  return {
    data: null,
    status: 500,
    message,
    timestamp: new Date(),
  };
}
//Створення нової задачі також використоння Omit для видалення номеру та іншого
type CreateTaskDto = Omit<Task, "id" | "createdAt">;
//Оновлення задач також використання Partial щоб зробити поля необовязковими
type UpdateTaskDto = Partial<Omit<Task, "id" | "createdAt">>;

//Фільтрація яка працює будь яким ключем
function filterTasks<K extends keyof Task>(
  tasks: Task[],
  key: K,
  value: Task[K],
): Task[] {
  return tasks.filter((task) => task[key] === value);
}

console.log("=== Завдання 2: Generics та Utility Types ===");
console.log("Варіант:", VARIANT);
//Успішна відповідь від масивів задач
console.log(createSuccessResponse(tasks));
//Відповідь про помилки якщо вони є
console.log(createErrorResponse<Task[]>("Помилка сервера"));
//Фільтрація
console.log("Фільтр списку завдань:", filterTasks(tasks, "status", "todo"));
