export {};
//Списки можливих статусів та пріорітетів для завдання
type Status = "todo" | "in_progress" | "done" | "cancelled";
type Priority = "low" | "medium" | "high" | "critical";
//Як має виглядати самі завдання
interface Task {
  id: number;
  title: string;
  description: string;
  status: Status;
  priority: Priority;
  assignee: string | null; // null, якщо задача не призначена
  createdAt: Date;
  dueDate: Date | null;
}

interface HasId {
  id: number;
}

interface Project extends HasId {
  name: string;
  description: string;
  tasks: Task[];
  ownerId: number;
}
//Функція для аналізу списку задач та збору статистики
function getTaskStats(tasks: Task[]) {
  const now = new Date();
  //Обєкт який накопичує результати
  const stats: {
    total: number;
    byStatus: Record<Status, number>;
    overdue: number;
  } = {
    //Загальна кількість задач які є
    total: tasks.length,
    byStatus: {
      todo: 0,
      in_progress: 0,
      done: 0,
      cancelled: 0,
    },
    overdue: 0,
  };
  //Спочатку перебирання кожної задачі
  for (const task of tasks) {
    //Збільшення лічильника для відповідного статусу
    stats.byStatus[task.status]++;
    //Логіка перевірки
    //Дедлайн минув, а задача не виконана і не скасована
    if (
      task.dueDate &&
      task.dueDate < now &&
      task.status !== "done" &&
      task.status !== "cancelled"
    ) {
      stats.overdue++;
    }
  }

  return stats;
}
//Функція для зручного виводу основної інформації про задачу
function formatTask(task: Task): string {
  return `[#${task.id}] ${task.title} (${task.priority}, ${task.status})`;
}
//Назва завдання
console.log("=== Завдання 1: Базові типи, інтерфейси та type aliases ===");
//Самі задачі та повністю інформація про них
const tasks: Task[] = [
  {
    id: 1,
    title: "Лабораторна робота ООП 19",
    description: "Виконати лабораторну роботу № 19 ",
    status: "in_progress",
    priority: "high",
    assignee: null,
    createdAt: new Date(),
    dueDate: new Date("2026-02-26"),
  },
  {
    id: 2,
    title: "Тести з англіської",
    description: "Виконати тест з англіської швидко",
    status: "todo",
    priority: "medium",
    assignee: null,
    createdAt: new Date(),
    dueDate: null,
  },
  {
    id: 3,
    title: "Таблиці для баз даних",
    description: "Побудувати таблиці та для них звязки",
    status: "done",
    priority: "critical",
    assignee: " Аліна",
    createdAt: new Date(),
    dueDate: new Date("2026-02-15"),
  },
  {
    id: 4,
    title: "Конспект",
    description: "Написати конспект із предмету",
    status: "cancelled",
    priority: "low",
    assignee: null,
    createdAt: new Date(),
    dueDate: new Date("2025-01-10"),
  },
  {
    id: 5,
    title: "ЛР 2",
    description: "Виконати лабораторну роботу №2",
    status: "todo",
    priority: "high",
    assignee: "Аліна",
    createdAt: new Date(),
    dueDate: new Date("2026-05-26"),
  },
];
//Вивід кожної задачі та статистика
console.log("Статистика:", getTaskStats(tasks));
tasks.forEach((t) => console.log(formatTask(t)));
