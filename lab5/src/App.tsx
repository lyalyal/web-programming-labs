import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { todosApi } from "./api/todos";

export default function App() {
  //Стан зберігання
  const [title, setTitle] = useState("");
  //Доступ для керування кешом
  const queryClient = useQueryClient();
  //Отримання даних
  const {
    data: todos,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["todos"],
    queryFn: todosApi.getAll,
  });
  //Створення запитів
  const createTodo = useMutation({
    mutationFn: () =>
      todosApi.create({
        title,
        completed: false,
      }),
    //Оновлення спискі після успішного виконання
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["todos"],
      });

      setTitle("");
    },
  });
  //Оновлення запиту
  const updateTodo = useMutation({
    mutationFn: ({ id, completed }: { id: number; completed: boolean }) =>
      todosApi.update(id, { completed }),
    //Оновлення даних щоб побачити зміни
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: ["todos"],
      }),
  });
  //Видалення завдання
  const deleteTodo = useMutation({
    mutationFn: (id: number) => todosApi.remove(id),
    //Повністю видалення задачі із кешу
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: ["todos"],
      }),
  });

  if (isLoading) return <p>Завантаження</p>;

  if (isError) return <p>Помилка</p>;

  return (
    <div>
      <h2>Список задач</h2>

      <input value={title} onChange={(e) => setTitle(e.target.value)} />

      <button
        onClick={() => createTodo.mutate()}
        disabled={createTodo.isPending}
      >
        Додати
      </button>

      {todos?.map((todo) => (
        <div key={todo.id}>
          <input
            type="checkbox"
            checked={todo.completed}
            onChange={(e) =>
              updateTodo.mutate({
                id: todo.id,
                completed: e.target.checked,
              })
            }
          />

          <span
            style={{
              textDecoration: todo.completed ? "line-through" : "none",
            }}
          >
            {todo.title}
          </span>

          <button onClick={() => deleteTodo.mutate(todo.id)}>Видалити</button>
        </div>
      ))}
    </div>
  );
}
