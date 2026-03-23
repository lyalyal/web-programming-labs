import { useQuery } from "@tanstack/react-query";
import { todosApi } from "./api/todos";

export default function App() {
  const {
    data: todos,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["todos"],
    queryFn: todosApi.getAll,
  });

  if (isLoading) {
    return <p>Завантаження</p>;
  }

  if (isError) {
    return <p>Помилка</p>;
  }

  return (
    <div>
      <h2>Список задач</h2>

      {todos?.map((todo) => (
        <div key={todo.id}>
          <span
            style={{
              textDecoration: todo.completed ? "line-through" : "none",
            }}
          >
            {todo.title}
          </span>
        </div>
      ))}
    </div>
  );
}
