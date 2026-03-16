import type { Task } from "../types/task";

export const INITIAL_TASKS: Task[] = [
  {
    id: "1",
    title: "Перевірити роботу програми",
    description:
      "Перевірити чи правильно працюють обробники помилок та сама програма",
    status: "todo",
    priority: "high",
    createdAt: new Date("2025-03-16"),
  },
  {
    id: "2",
    title: "Перевірити форму додавання задач",
    description: "Правильність написання, додавання самих задач,відображення",
    status: "in-progress",
    priority: "medium",
    createdAt: new Date("2025-03-03"),
  },
  {
    id: "3",
    title: "Переконатися чи працює додаток лр",
    description: "Переконатись що основні умови, кнопки, інтерфейс працюють",
    status: "done",
    priority: "low",
    createdAt: new Date("2025-03-10"),
  },
  {
    id: "4",
    title: "Тестування API отримання задач",
    description: "Перевірити response status та структуру JSON",
    status: "todo",
    priority: "high",
    createdAt: new Date("2025-03-07"),
  },
];
