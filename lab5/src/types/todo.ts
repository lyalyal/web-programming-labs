export interface Todo {
  id: number;
  title: string;
  completed: boolean;
}
//Створення
export type CreateTodoDto = {
  title: string;
  completed: boolean;
};
//Оновлення всіх полів
export type UpdateTodoDto = Partial<Omit<Todo, "id">>;
