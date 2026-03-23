import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { todosApi } from "./api/todos";

export default function App() {
  const [title, setTitle] = useState("");
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
  const createTodo = useMutation({
    mutationFn: () => todosApi.create({ title, completed: false }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
      setTitle("");
    },
  });

  //Оноволення завдання
  const updateTodo = useMutation({
    mutationFn: ({ id, completed }: { id: number; completed: boolean }) =>
      todosApi.update(id, { completed }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["todos"] }),
  });

  const deleteTodo = useMutation({
    mutationFn: (id: number) => todosApi.remove(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["todos"] }),
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
            onChange={() =>
              updateTodo.mutate({ id: todo.id, completed: !todo.completed })
            }
          />

          <span
            style={{ textDecoration: todo.completed ? "line-through" : "none" }}
          >
            {todo.title}
          </span>

          <button onClick={() => deleteTodo.mutate(todo.id)}>Видалити</button>
        </div>
      ))}
    </div>
  );
}
