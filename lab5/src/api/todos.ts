import axios from "axios";
import type { Todo, CreateTodoDto, UpdateTodoDto } from "../types/todo";
//Базова конфігурація
const api = axios.create({
  baseURL: "http://localhost:3001",
});

export const todosApi = {
  //Отримання всього списку завдань
  getAll: async (): Promise<Todo[]> => {
    const res = await api.get("/todos");
    return res.data;
  },
  //Створення нвоого завдання та повернення його
  create: async (data: CreateTodoDto): Promise<Todo> => {
    const res = await api.post("/todos", data);
    return res.data;
  },
  //Часткове оновлення завдання
  update: async (id: number, data: UpdateTodoDto): Promise<Todo> => {
    //Шаблоний рядок для використання айди
    const res = await api.patch(`/todos/${id}`, data);
    return res.data;
  },
  //Видалення завдання
  remove: async (id: number): Promise<void> => {
    await api.delete(`/todos/${id}`);
  },
};
