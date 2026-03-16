import { create } from "zustand";
import type { Task } from "../types/task";
import { INITIAL_TASKS } from "../data/initialTasks";
//Структура стору
interface TasksStore {
  tasks: Task[];
  addTask: (task: Task) => void;
  deleteTask: (id: string) => void;
  updateTask: (task: Task) => void;
}
//Створення глобального стору за допомогаю Zustand
export const useTasksStore = create<TasksStore>((set) => ({
  tasks: INITIAL_TASKS,
  //Додавання нової задачі у кінець
  addTask: (task) =>
    set((state) => ({
      tasks: [...state.tasks, task],
    })),
  //Фільтрування задач окрім тієї що видалено
  deleteTask: (id) =>
    set((state) => ({
      tasks: state.tasks.filter((task) => task.id !== id),
    })),
  //Змінення задачі за пошуком по ID
  updateTask: (updatedTask) =>
    set((state) => ({
      tasks: state.tasks.map((task) =>
        task.id === updatedTask.id ? updatedTask : task,
      ),
    })),
}));
